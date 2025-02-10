// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', () => {
            // Create mobile menu
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('nav');
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = mainNav.innerHTML;
                
                // Style mobile menu
                Object.assign(mobileNav.style, {
                    position: 'fixed',
                    top: '60px', // Height of header
                    left: '0',
                    right: '0',
                    background: 'white',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: '40',
                });

                // Style mobile menu links
                mobileNav.querySelectorAll('a').forEach(link => {
                    Object.assign(link.style, {
                        padding: '0.5rem',
                        textDecoration: 'none',
                        color: 'inherit',
                    });
                });

                document.body.appendChild(mobileNav);
            } else {
                document.querySelector('.mobile-nav').remove();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav && !menuButton.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.remove();
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav) {
                    mobileNav.remove();
                }
            }
        });
    });
});