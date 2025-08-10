// Masonry interactions
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gridItems = document.querySelectorAll('.grid-item');
    let currentFilter = 'all';

    // Filter button interactions
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter value
            currentFilter = button.textContent.toLowerCase();
            
            // Animate grid items
            gridItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    // Show all items if filter is 'all', otherwise filter by category
                    if (currentFilter === 'all' || item.dataset.category === currentFilter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Grid item hover effects
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add glow effect
            item.style.boxShadow = `0 8px 25px rgba(14, 165, 233, 0.2)`;
            
            // Scale up content
            const content = item.querySelector('.item-content');
            content.style.transform = 'scale(1.05)';
            content.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
            const content = item.querySelector('.item-content');
            content.style.transform = 'scale(1)';
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe grid items
    gridItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Add dynamic background effect
    const createBackgroundEffect = () => {
        const effect = document.createElement('div');
        effect.className = 'background-effect';
        document.body.appendChild(effect);

        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;

        // Remove after animation
        effect.addEventListener('animationend', () => effect.remove());
    };

    // Add background effect style
    const style = document.createElement('style');
    style.textContent = `
        .background-effect {
            position: fixed;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            animation: pulse 3s ease-out;
            z-index: -1;
        }

        @keyframes pulse {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create background effects periodically
    setInterval(createBackgroundEffect, 3000);
}); 