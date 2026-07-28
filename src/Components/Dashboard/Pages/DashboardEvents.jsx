import CmsResourceManager from '../Cms/CmsResourceManager';

const DashboardEvents = () => (
    <CmsResourceManager
        resource="events"
        title="Talks & Events"
        description="Manage the Signature Talks & Workshops shown on the public Events page."
        itemName="Talk"
        viewPath="/events#signature-talks"
        fields={[
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'type', label: 'Session Type', type: 'text', placeholder: 'e.g. Keynote / Workshop' },
            { name: 'blurb', label: 'Description', type: 'textarea' },
            { name: 'booking_link', label: 'Booking Link', type: 'text', placeholder: '/contact or https://...' },
            { name: 'image', label: 'Banner Image', type: 'image' },
            { name: 'sort_order', label: 'Display Order', type: 'number', hint: 'Lower numbers appear first.' },
            { name: 'is_published', label: 'Visible on website', type: 'checkbox' },
        ]}
        columns={[
            { key: 'title', label: 'Title' },
            { key: 'type', label: 'Type', hideOnMobile: true },
            { key: 'sort_order', label: 'Order', hideOnMobile: true },
        ]}
    />
);

export default DashboardEvents;
