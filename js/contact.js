// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Form validation and handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add input validation
        const validateInput = (input) => {
            const value = input.value.trim();
            const isValid = input.checkValidity();
            
            input.classList.toggle('invalid', !isValid);
            return isValid;
        };

        // Add validation styles
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
            });
        });

        // Form submission handling
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all inputs
            let isValid = true;
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Collect form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';

                // Send data to Flask endpoint
                fetch('/send_email', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(result => {
                    alert('Thank you for your message. We will contact you soon!');
                    contactForm.reset();
                })
                .catch(error => {
                    alert('An error occurred. Please try again.');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                });
            }
        });
    }

    // Add animation to contact info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
});