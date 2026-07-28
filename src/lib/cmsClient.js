import { API_BASE, API_ORIGIN } from './apiConfig';

// Resolves a stored relative image path (e.g. "cms/podcasts/abc.png")
// to a full URL served from Laravel's public storage disk.
export const storageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_ORIGIN}/storage/${path}`;
};

const authHeaders = (token) => ({
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
});

const parseOrThrow = async (response, fallbackMessage) => {
    const data = await response.json().catch(() => null);
    if (!response.ok) {
        const message =
            data?.message ||
            (data?.errors && Object.values(data.errors).flat().join(' ')) ||
            fallbackMessage;
        throw new Error(message);
    }
    return data;
};

// Values are sent as multipart FormData so image uploads work uniformly.
const buildFormData = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (typeof value === 'boolean') {
            formData.append(key, value ? '1' : '0');
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

export const cmsList = async (token, resource) => {
    const response = await fetch(`${API_BASE}/dashboard/${resource}`, {
        headers: authHeaders(token),
    });
    const data = await parseOrThrow(response, `Failed to load ${resource}`);
    return data.data || [];
};

export const cmsCreate = async (token, resource, values) => {
    const response = await fetch(`${API_BASE}/dashboard/${resource}`, {
        method: 'POST',
        headers: authHeaders(token),
        body: buildFormData(values),
    });
    const data = await parseOrThrow(response, 'Failed to create item');
    return data.data;
};

export const cmsUpdate = async (token, resource, id, values) => {
    const response = await fetch(`${API_BASE}/dashboard/${resource}/${id}`, {
        method: 'POST', // POST (multipart) update route
        headers: authHeaders(token),
        body: buildFormData(values),
    });
    const data = await parseOrThrow(response, 'Failed to update item');
    return data.data;
};

export const cmsDelete = async (token, resource, id) => {
    const response = await fetch(`${API_BASE}/dashboard/${resource}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });
    await parseOrThrow(response, 'Failed to delete item');
};

export const cmsGetCoaching = async (token) => {
    const response = await fetch(`${API_BASE}/dashboard/coaching`, {
        headers: authHeaders(token),
    });
    const data = await parseOrThrow(response, 'Failed to load coaching settings');
    return data.data;
};

export const cmsUpdateCoaching = async (token, values) => {
    const response = await fetch(`${API_BASE}/dashboard/coaching`, {
        method: 'PUT',
        headers: {
            ...authHeaders(token),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    const data = await parseOrThrow(response, 'Failed to update coaching settings');
    return data.data;
};

// Public content endpoints (used by the public site with static fallbacks).
export const fetchContent = async (path) => {
    const response = await fetch(`${API_BASE}/content/${path}`, {
        headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to load content: ${path}`);
    const data = await response.json();
    return data.data;
};
