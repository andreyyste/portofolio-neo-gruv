import { useEffect } from 'react';

export const useReveal = () => {
    useEffect(() => {
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

        document.querySelectorAll('.reveal-section').forEach(section => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);
};
