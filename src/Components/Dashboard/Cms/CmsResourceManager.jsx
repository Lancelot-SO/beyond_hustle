import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Plus, Pencil, Trash2, X, Loader2, AlertCircle, ImagePlus,
    Eye, EyeOff, CheckCircle2, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { cmsList, cmsCreate, cmsUpdate, cmsDelete, storageUrl } from '../../../lib/cmsClient';

/**
 * Generic CRUD manager for a CMS resource.
 *
 * fields config drives the add/edit modal:
 *   { name, label, type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'checkbox',
 *     required?, options?: [{value,label}], placeholder?, hint? }
 *
 * columns config drives the table:
 *   { key, label, render?: (item) => node, hideOnMobile? }
 */
const CmsResourceManager = ({ resource, title, description, fields, columns, tabs, itemName, viewPath }) => {
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(tabs ? tabs.options[0].value : null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState(null);
    const [toast, setToast] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const showToast = (text) => {
        setToast(text);
        setTimeout(() => setToast(null), 3000);
    };

    const load = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            setItems(await cmsList(token, resource));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token, resource]);

    useEffect(() => { load(); }, [load]);

    const visibleItems = tabs
        ? items.filter((item) => item[tabs.field] === activeTab)
        : items;

    const openCreate = () => {
        const defaults = {};
        fields.forEach((field) => {
            if (field.type === 'checkbox') defaults[field.name] = true;
            else if (field.type === 'select') defaults[field.name] = field.options[0].value;
            else defaults[field.name] = '';
        });
        if (tabs) defaults[tabs.field] = activeTab;
        setFormValues(defaults);
        setImageFile(null);
        setEditingItem(null);
        setFormError(null);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        const values = {};
        fields.forEach((field) => {
            if (field.type === 'image') return;
            if (field.type === 'checkbox') values[field.name] = Boolean(item[field.name]);
            else values[field.name] = item[field.name] ?? '';
        });
        setFormValues(values);
        setImageFile(null);
        setEditingItem(item);
        setFormError(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) return;
        setModalOpen(false);
        setEditingItem(null);
        setImageFile(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setFormError(null);
        try {
            const payload = { ...formValues };
            // Empty optional text fields are omitted rather than sent as ''.
            Object.keys(payload).forEach((key) => {
                if (payload[key] === '') delete payload[key];
            });
            if (imageFile) payload.image = imageFile;

            if (editingItem) {
                const updated = await cmsUpdate(token, resource, editingItem.id, payload);
                setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
                showToast(`${itemName} updated`);
            } else {
                const created = await cmsCreate(token, resource, payload);
                setItems((prev) => [...prev, created]);
                showToast(`${itemName} created`);
            }
            closeModal();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (item) => {
        if (!window.confirm(`Delete "${item.title}"? This will remove it from the live website and cannot be undone.`)) return;
        try {
            await cmsDelete(token, resource, item.id);
            setItems((prev) => prev.filter((it) => it.id !== item.id));
            showToast(`${itemName} deleted`);
        } catch (err) {
            alert(`Error deleting: ${err.message}`);
        }
    };

    const togglePublished = async (item) => {
        setTogglingId(item.id);
        try {
            const updated = await cmsUpdate(token, resource, item.id, { is_published: !item.is_published });
            setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
        } catch (err) {
            alert(`Error updating: ${err.message}`);
        } finally {
            setTogglingId(null);
        }
    };

    const imageField = fields.find((field) => field.type === 'image');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">{description}</p>
                    {viewPath && (
                        <a
                            href={viewPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-[#D95B24] hover:underline"
                        >
                            <ExternalLink size={14} />
                            View this section on the website
                        </a>
                    )}
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-[#D95B24] text-white rounded-lg hover:bg-[#c04b1f] transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add {itemName}
                </button>
            </div>

            {/* Toast */}
            {toast && (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
                    <CheckCircle2 size={16} />
                    {toast}
                </div>
            )}

            {/* Tabs */}
            {tabs && (
                <div className="flex gap-2">
                    {tabs.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setActiveTab(option.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === option.value
                                ? 'bg-[#D95B24] text-white shadow-sm'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {option.label}
                            <span className="ml-2 text-xs opacity-75">
                                {items.filter((item) => item[tabs.field] === option.value).length}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Body */}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-100">
                    <Loader2 className="h-10 w-10 text-[#D95B24] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-50 rounded-xl p-8 border border-red-100">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load</h3>
                    <p className="text-red-600 text-center max-w-md mb-6">{error}</p>
                    <button
                        onClick={load}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                                    {imageField && <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold">Image</th>}
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className={`px-3 sm:px-6 py-3 sm:py-4 font-semibold ${column.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">Visible</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visibleItems.length > 0 ? (
                                    visibleItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            {imageField && (
                                                <td className="px-3 sm:px-6 py-3">
                                                    {item.image_path ? (
                                                        <img
                                                            src={storageUrl(item.image_path)}
                                                            alt={item.title}
                                                            className="w-14 h-14 object-cover rounded-lg border border-gray-100"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300">
                                                            <ImagePlus size={20} />
                                                        </div>
                                                    )}
                                                </td>
                                            )}
                                            {columns.map((column) => (
                                                <td
                                                    key={column.key}
                                                    className={`px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-700 ${column.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                                                >
                                                    {column.render ? column.render(item) : (item[column.key] ?? '—')}
                                                </td>
                                            ))}
                                            <td className="px-3 sm:px-6 py-3 text-center">
                                                <button
                                                    onClick={() => togglePublished(item)}
                                                    disabled={togglingId === item.id}
                                                    title={item.is_published ? 'Visible on website — click to hide' : 'Hidden — click to publish'}
                                                    className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${item.is_published
                                                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {togglingId === item.id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : item.is_published ? (
                                                        <Eye size={16} />
                                                    ) : (
                                                        <EyeOff size={16} />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => openEdit(item)}
                                                        className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#D95B24] hover:text-white transition-all duration-200"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length + (imageField ? 3 : 2)}
                                            className="px-6 py-10 text-center text-gray-500 font-medium"
                                        >
                                            Nothing here yet. Click “Add {itemName}” to create the first one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
                    <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-xl max-h-[92vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingItem ? `Edit ${itemName}` : `Add ${itemName}`}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    {field.type !== 'checkbox' && (
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            {field.label}
                                            {field.required && <span className="text-red-500 ml-0.5">*</span>}
                                        </label>
                                    )}

                                    {field.type === 'text' && (
                                        <input
                                            type="text"
                                            required={field.required}
                                            value={formValues[field.name] ?? ''}
                                            placeholder={field.placeholder}
                                            onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent text-sm"
                                        />
                                    )}

                                    {field.type === 'number' && (
                                        <input
                                            type="number"
                                            value={formValues[field.name] ?? ''}
                                            onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent text-sm"
                                        />
                                    )}

                                    {field.type === 'textarea' && (
                                        <textarea
                                            rows={4}
                                            required={field.required}
                                            value={formValues[field.name] ?? ''}
                                            placeholder={field.placeholder}
                                            onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent text-sm"
                                        />
                                    )}

                                    {field.type === 'select' && (
                                        <select
                                            value={formValues[field.name] ?? field.options[0].value}
                                            onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent text-sm bg-white"
                                        >
                                            {field.options.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    )}

                                    {field.type === 'checkbox' && (
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={Boolean(formValues[field.name])}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.checked }))}
                                                className="w-4 h-4 accent-[#D95B24]"
                                            />
                                            {field.label}
                                        </label>
                                    )}

                                    {field.type === 'image' && (
                                        <div className="flex items-center gap-4">
                                            {(imageFile || editingItem?.image_path) && (
                                                <img
                                                    src={imageFile ? URL.createObjectURL(imageFile) : storageUrl(editingItem.image_path)}
                                                    alt="Preview"
                                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                                />
                                            )}
                                            <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 cursor-pointer hover:border-[#D95B24] hover:text-[#D95B24] transition-colors">
                                                <ImagePlus size={16} />
                                                {imageFile ? imageFile.name : (editingItem?.image_path ? 'Replace image' : 'Choose image')}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                                />
                                            </label>
                                        </div>
                                    )}

                                    {field.hint && (
                                        <p className="text-xs text-gray-400 mt-1">{field.hint}</p>
                                    )}
                                </div>
                            ))}

                            {formError && (
                                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                    <AlertCircle size={16} className="shrink-0" />
                                    {formError}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#D95B24] text-white font-bold rounded-xl hover:bg-[#c04b1f] transition-colors disabled:opacity-60"
                                >
                                    {saving && <Loader2 size={16} className="animate-spin" />}
                                    {editingItem ? 'Save Changes' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

CmsResourceManager.propTypes = {
    resource: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    tabs: PropTypes.shape({
        field: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
    viewPath: PropTypes.string,
};

export default CmsResourceManager;
