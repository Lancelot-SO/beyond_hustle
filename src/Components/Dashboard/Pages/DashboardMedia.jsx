import { useState } from 'react';
import { Images, MonitorPlay } from 'lucide-react';
import CmsResourceManager from '../Cms/CmsResourceManager';

const DashboardMedia = () => {
    const [tab, setTab] = useState('gallery');

    return (
        <div className="space-y-6">
            <div className="flex gap-2">
                <button
                    onClick={() => setTab('gallery')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'gallery'
                        ? 'bg-[#1C2237] text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Images size={16} />
                    Gallery
                </button>
                <button
                    onClick={() => setTab('webinars')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'webinars'
                        ? 'bg-[#1C2237] text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <MonitorPlay size={16} />
                    Webinars
                </button>
            </div>

            {tab === 'gallery' ? (
                <CmsResourceManager
                    key="gallery"
                    resource="gallery-items"
                    title="Media Gallery"
                    description="Manage the tiles shown on the public Gallery page."
                    itemName="Gallery Tile"
                    viewPath="/gallery#gallery-grid"
                    fields={[
                        { name: 'title', label: 'Title', type: 'text', required: true },
                        {
                            name: 'link',
                            label: 'Links To',
                            type: 'text',
                            placeholder: '/launch, /events, /podcastphotos ...',
                            hint: 'The page this tile opens when clicked.',
                        },
                        { name: 'image', label: 'Tile Image', type: 'image' },
                        { name: 'is_wide', label: 'Wide tile (spans two columns)', type: 'checkbox' },
                        { name: 'sort_order', label: 'Display Order', type: 'number', hint: 'Lower numbers appear first.' },
                        { name: 'is_published', label: 'Visible on website', type: 'checkbox' },
                    ]}
                    columns={[
                        { key: 'title', label: 'Title' },
                        { key: 'link', label: 'Links To', hideOnMobile: true },
                        { key: 'sort_order', label: 'Order', hideOnMobile: true },
                    ]}
                />
            ) : (
                <CmsResourceManager
                    key="webinars"
                    resource="webinars"
                    title="Webinars & Courses"
                    description="Manage the Upcoming Sessions cards on the public Webinars page."
                    itemName="Webinar"
                    viewPath="/webinars#upcoming-sessions"
                    fields={[
                        { name: 'title', label: 'Title', type: 'text', required: true },
                        {
                            name: 'register_link',
                            label: 'Register Link',
                            type: 'text',
                            placeholder: '/webinar-register or https://...',
                            hint: 'Where the Register button sends visitors.',
                        },
                        { name: 'is_wide', label: 'Wide card', type: 'checkbox' },
                        { name: 'sort_order', label: 'Display Order', type: 'number', hint: 'Lower numbers appear first.' },
                        { name: 'is_published', label: 'Visible on website', type: 'checkbox' },
                    ]}
                    columns={[
                        { key: 'title', label: 'Title' },
                        { key: 'register_link', label: 'Register Link', hideOnMobile: true },
                        { key: 'sort_order', label: 'Order', hideOnMobile: true },
                    ]}
                />
            )}
        </div>
    );
};

export default DashboardMedia;
