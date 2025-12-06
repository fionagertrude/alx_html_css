/**
 * Hamburger Menu Implementation
 * Toggles mobile navigation menu
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Check if elements exist
    if (!hamburger || !navMenu) {
        console.error('Hamburger or navigation menu not found');
        return;
    }
    
    /**
     * Toggle the mobile menu
     */
    function toggleMenu() {
        // Toggle active class on hamburger and menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    /**
     * Close the mobile menu
     */
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
    
    /**
     * Handle click outside menu to close it
     */
    function handleClickOutside(event) {
        if (
            navMenu.classList.contains('active') &&
            !hamburger.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            closeMenu();
        }
    }
    
    /**
     * Handle window resize
     */
    function handleResize() {
        if (window.innerWidth > 768) {
            // On desktop, ensure menu is closed and body scroll is normal
            closeMenu();
        }
    }
    
    /**
     * Handle Escape key press
     */
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
    
    /**
     * Initialize animations for service items
     */
    function initAnimations() {
        const animatedItems = document.querySelectorAll('.service-item, .result-item');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated-visible');
                }
            });
        }, observerOptions);
        
        animatedItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    /**
     * Initialize form validation
     */
    function initFormValidation() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        
        // Name validation
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                const value = this.value.trim();
                if (value.length < 2) {
                    nameError.textContent = 'Name must be at least 2 characters';
                    this.classList.add('error');
                } else if (value.length > 50) {
                    nameError.textContent = 'Name cannot exceed 50 characters';
                    this.classList.add('error');
                } else {
                    nameError.textContent = '';
                    this.classList.remove('error');
                }
            });
        }
        
        // Email validation
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const value = this.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailRegex.test(value)) {
                    emailError.textContent = 'Please enter a valid email address';
                    this.classList.add('error');
                } else {
                    emailError.textContent = '';
                    this.classList.remove('error');
                }
            });
        }
        
        // Message validation
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                const value = this.value.trim();
                if (value.length < 10) {
                    messageError.textContent = 'Message must be at least 10 characters';
                    this.classList.add('error');
                } else if (value.length > 500) {
                    messageError.textContent = 'Message cannot exceed 500 characters';
                    this.classList.add('error');
                } else {
                    messageError.textContent = '';
                    this.classList.remove('error');
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            
            // Check name
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameInput.classList.add('error');
                isValid = false;
            }
            
            // Check email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.classList.add('error');
                isValid = false;
            }
            
            // Check message
            if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageInput.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('.form-button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Clear errors
                    if (nameError) nameError.textContent = '';
                    if (emailError) emailError.textContent = '';
                    if (messageError) messageError.textContent = '';
                    if (nameInput) nameInput.classList.remove('error');
                    if (emailInput) emailInput.classList.remove('error');
                    if (messageInput) messageInput.classList.remove('error');
                }, 1500);
            }
        });
    }
    
    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', handleClickOutside);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle Escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Initialize animations
    initAnimations();
    
    // Initialize form validation
    initFormValidation();
    
    // Log initialization
    console.log('Hamburger menu initialized successfully');
});