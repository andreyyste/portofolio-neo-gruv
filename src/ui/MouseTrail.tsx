import { useEffect } from 'react';

/**
 * MouseTrail Component
 * Adds a trailing particle effect behind the user's cursor.
 * 
 * Key Features:
 * 1. Frame-rate Limiting: Particle instantiation is throttled using a random check to prevent browser lag.
 * 2. Visual Randomization: Randomizes size, colors, and border-radius (producing squares and circles).
 * 3. Garbage Collection / Memory Management:
 *    - Removes each particle element from the DOM after 800ms animation duration.
 *    - Removes global event listener on component unmount to prevent memory leaks.
 */
export const MouseTrail: React.FC = () => {
    useEffect(() => {
        const colors = ['#d79921', '#9d0006', '#458588', '#b8bb26'];
        
        const handleMouseMove = (e: MouseEvent) => {
            // Ngebatesin frame rate pembuatan partikel sedikit biar ga lag (throttling)
            if (Math.random() > 0.6) return;

            const particle = document.createElement('div');
            particle.className = 'mouse-trail-particle';
            
            // Randomize ukuran (antara 10px hingga 30px)
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Randomize warna dari preset palette Gruvbox
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            
            // Randomize bentuk (50% kotak, 50% lingkaran bulat)
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // Posisikan persis di titik tengah kursor (menggunakan offset size/2)
            particle.style.left = `${e.clientX - size / 2}px`;
            particle.style.top = `${e.clientY - size / 2}px`;
            
            document.body.appendChild(particle);
            
            // Clean up: Hapus elemen partikel dari DOM setelah animasi selesai (800ms)
            // Hal ini krusial untuk mencegah penumpukan elemen DOM tak terbatas.
            setTimeout(() => {
                particle.remove();
            }, 800);
        };

        // Pasang event listener pas komponen dimuat
        document.addEventListener('mousemove', handleMouseMove);

        // Bersihin event listener pas komponen di-unmount (biar ga memory leak)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null; 
};