/**
 * Echoes of Joy School - Main JavaScript
 * Premium interactive features and functionality
 */

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initCounterAnimation();
    initTestimonialCarousel();
    initFormValidation();
    initSmoothScroll();
    initBackToTop();
    initLightbox();
    initWhatsAppIntegration();
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Form submissions
    setupFormSubmissions();
});

/**
 * Animated counters for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter h2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Testimonial carousel configuration
 */
function initTestimonialCarousel() {
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        // Bootstrap carousel is already initialized via data attributes
        // Add custom indicators if needed
    }
}

/**
 * Form validation for contact and admission forms
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showFormError(this, 'Please fill in all required fields correctly.');
            } else {
                // For demo purposes, show success message
                e.preventDefault();
                showFormSuccess(this, 'Thank you! Your message has been submitted successfully.');
                this.reset();
            }
        });
    });
    
    // File upload validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateFileUpload(this);
        });
    });
}

/**
 * Validate individual form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
            
            // Email validation
            if (field.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                }
            }
            
            // Phone validation (Kenyan format)
            if (field.type === 'tel') {
                const phonePattern = /^[0-9\s\-\+\(\)]{10,}$/;
                if (!phonePattern.test(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                }
            }
        }
    });
    
    return isValid;
}

/**
 * Validate file upload
 */
function validateFileUpload(input) {
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (input.files.length > 0) {
        const file = input.files[0];
        
        if (!allowedTypes.includes(file.type)) {
            showFormError(input.closest('form'), 'Please upload only PDF or Word documents.');
            input.value = '';
        } else if (file.size > maxSize) {
            showFormError(input.closest('form'), 'File size must be less than 5MB.');
            input.value = '';
        }
    }
}

/**
 * Show form error message
 */
function showFormError(form, message) {
    // Remove existing alerts
    const existingAlert = form.querySelector('.alert');
    if (existingAlert) existingAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show mt-3';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    form.appendChild(alert);
}

/**
 * Show form success message
 */
function showFormSuccess(form, message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    form.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(href);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Lightbox initialization for gallery
 */
function initLightbox() {
    // Lightbox is already initialized via data attributes
    // Additional customizations can be added here
}

/**
 * WhatsApp integration for direct chat
 */
function initWhatsAppIntegration() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // In production, this would open WhatsApp directly
            // For demo, show a message
            if (!confirm('This would open WhatsApp to chat with our admissions team. Continue?')) {
                e.preventDefault();
            }
        });
    });
}

/**
 * Navbar scroll effect
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active section based on scroll
    updateActiveSection();
}

/**
 * Update active section for navigation
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink('#' + sectionId);
        }
    });
}

/**
 * Setup form submissions with EmailJS (placeholder)
 */
function setupFormSubmissions() {
    // Initialize EmailJS with your public key
    // emailjs.init("YOUR_PUBLIC_KEY");
    
    // Form submission handlers would go here
    // In production, this would connect to EmailJS or Formspree
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add fade-in animations on scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
initScrollAnimations();

// Export functions for potential CMS integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCounterAnimation,
        initFormValidation,
        initSmoothScroll
    };
}
