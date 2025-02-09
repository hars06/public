// About page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll animation for the about list items
    const aboutList = document.querySelector('.about-list');
    if (aboutList) {
        aboutList.querySelectorAll('li').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Stagger the animation of list items
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Add parallax effect to about image
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            aboutImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
});