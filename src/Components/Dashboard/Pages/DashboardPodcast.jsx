import CmsResourceManager from '../Cms/CmsResourceManager';

const DashboardPodcast = () => (
    <CmsResourceManager
        resource="podcast-episodes"
        title="Podcast Episodes"
        description="Manage the episodes shown on the public Podcast page."
        itemName="Episode"
        viewPath="/podcast#episodes"
        fields={[
            { name: 'title', label: 'Episode Title', type: 'text', required: true },
            {
                name: 'spotify_embed_url',
                label: 'Spotify Embed URL',
                type: 'text',
                required: true,
                placeholder: 'https://open.spotify.com/embed/episode/...',
                hint: 'In Spotify: Share → Embed episode → copy the src URL from the embed code.',
            },
            { name: 'image', label: 'Thumbnail Image', type: 'image' },
            { name: 'sort_order', label: 'Display Order', type: 'number', hint: 'Lower numbers appear first.' },
            { name: 'is_published', label: 'Visible on website', type: 'checkbox' },
        ]}
        columns={[
            { key: 'title', label: 'Title' },
            { key: 'sort_order', label: 'Order', hideOnMobile: true },
        ]}
    />
);

export default DashboardPodcast;
