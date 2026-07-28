import { useEffect } from 'react';

/**
 * Scrolls the element with the given id into view when the page is opened
 * with a matching #hash (e.g. /podcast#episodes).
 *
 * The site sets `html { scroll-behavior: smooth }`, which makes programmatic
 * scrolls animate — and the page's mount animations cancel those animations
 * before they move at all. So the scroll here temporarily forces instant
 * behavior. It also retries, because images loading in shift the layout.
 */
export function useScrollToHash(id) {
    useEffect(() => {
        if (window.location.hash !== `#${id}`) return;

        const scroll = () => {
            const el = document.getElementById(id);
            if (!el) return;
            const html = document.documentElement;
            const previous = html.style.scrollBehavior;
            html.style.scrollBehavior = 'auto';
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
            html.style.scrollBehavior = previous;
        };

        const timers = [
            setTimeout(scroll, 300),
            setTimeout(scroll, 900),
            setTimeout(scroll, 1800),
        ];
        return () => timers.forEach(clearTimeout);
    }, [id]);
}
