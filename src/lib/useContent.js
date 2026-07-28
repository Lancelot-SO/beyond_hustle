import { useState, useEffect } from 'react';
import { fetchContent } from './cmsClient';

/**
 * Loads CMS content from the public API. Returns `fallback` until the API
 * responds; keeps `fallback` permanently if the request fails or returns
 * nothing, so the live site never renders blank because of a backend issue.
 */
export function useContent(path, fallback = null) {
    const [data, setData] = useState(fallback);

    useEffect(() => {
        let cancelled = false;
        fetchContent(path)
            .then((result) => {
                if (cancelled) return;
                const hasContent = Array.isArray(result) ? result.length > 0 : Boolean(result);
                if (hasContent) setData(result);
            })
            .catch(() => {
                // Keep the static fallback content.
            });
        return () => { cancelled = true; };
    }, [path]);

    return data;
}
