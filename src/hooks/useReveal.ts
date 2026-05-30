import { useEffect } from 'react';

/**
 * Hook to trigger reveal animations when elements enter the viewport.
 * Uses IntersectionObserver for optimal performance compared to scroll listeners.
 * 
 * @param ready - Boolean flag to control when the observer should start (e.g. wait for data to load). Defaults to true.
 */
export const useReveal = (ready: boolean = true) => {
    useEffect(() => {
        if (!ready) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-section, .reveal-left, .reveal-right, .reveal-bottom, .reveal-top, .reveal-bounce').forEach(section => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, [ready]);
};
