import { useEffect } from 'react';

export const MouseTrail: React.FC = () => {
    useEffect(() => {
        const colors = ['#d79921', '#9d0006', '#458588', '#b8bb26'];
        
        const handleMouseMove = (e: MouseEvent) => {
            // Ngebatesin frame rate pembuatan partikel sedikit biar ga lag
            if (Math.random() > 0.6) return;

            const particle = document.createElement('div');
            particle.className = 'mouse-trail-particle';
            
            // Randomize ukuran
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Randomize warna
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            
            // Randomize bentuk (50% kotak, 50% lingkaran bulat)
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // Posisikan persis di titik kursor
            particle.style.left = `${e.clientX - size / 2}px`;
            particle.style.top = `${e.clientY - size / 2}px`;
            
            document.body.appendChild(particle);
            
            // Clean up: Hapus elemen partikel dari memori setelah 800ms
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