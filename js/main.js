/**
 * BRIXSTREET REALTORS - INTERACTIVITY & ANIMATIONS
 * Author: Antigravity Code Assistant
 * JavaScript for responsive interactions, filtering, animations, and counters.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CONFIGURATION: FormSubmit Destination Token or Email
    // Paste your FormSubmit Random Token here to bypass CORS/domain activation issues.
    // ==========================================
    const FORMSUBMIT_DESTINATION = 'https://formsubmit.co/el/cituho';
    // 1. Sticky Navigation Scroll Effect
    // ==========================================
    const navbar = document.querySelector('.navbar-custom');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    
    // Run on load and on scroll
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Auto-close bootstrap mobile menu on link click
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // ==========================================
    // 2. Scroll Animation Trigger (Intersection Observer)
    // ==========================================
    const animationElements = document.querySelectorAll(
        '.animate-fade-in, .animate-slide-up, .animate-slide-in-left, .animate-slide-in-right'
    );
    
    window.animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });
    
    animationElements.forEach(el => {
        animationObserver.observe(el);
    });

    // ==========================================
    // 3. Stats Counter Animation
    // ==========================================
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statsSection && statNumbers.length > 0) {
        let countStarted = false;
        
        const startCounting = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const prefix = stat.getAttribute('data-prefix') || '';
                const suffix = stat.getAttribute('data-suffix') || '';
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = Math.ceil(target / (duration / 16)); // ~60fps
                
                const updateCount = () => {
                    count += increment;
                    if (count >= target) {
                        stat.innerText = prefix + target + suffix;
                    } else {
                        stat.innerText = prefix + count + suffix;
                        requestAnimationFrame(updateCount);
                    }
                };
                
                updateCount();
            });
        };
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countStarted) {
                    countStarted = true;
                    startCounting();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // ==========================================
    // 4. Property Filtering System (Properties Page)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-tab-btn');
    const propertyCards = document.querySelectorAll('.property-item');
    
    if (filterButtons.length > 0 && propertyCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to current button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                propertyCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        // Fade in and show
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Fade out and hide
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Set dynamic redirection URL for FormSubmit if not on file:// protocol
    const nextInput = document.getElementById('nextUrlInput');
    if (nextInput) {
        if (window.location.protocol !== 'file:') {
            nextInput.value = window.location.origin + window.location.pathname + '?status=success';
        } else {
            // Remove _next on file:// so that FormSubmit uses its default success page
            nextInput.remove();
        }
    }

    // Show success message if redirected back from FormSubmit
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-4 rounded-0 border-0 bg-navy text-white animate-fade-in';
            alertDiv.style.borderLeft = '4px solid #D4AF37';
            alertDiv.innerHTML = `
                <h5 class="font-heading text-gold mb-1">Message Received</h5>
                <p class="mb-0 text-white" style="font-size: 0.85rem;">Thank you! Your advisory request has been sent successfully. An executive advisor will reach out within 24 hours.</p>
            `;
            contactForm.appendChild(alertDiv);
            
            // Clean up the URL parameter without page reload
            if (window.history && window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }

    // ==========================================
    // 5. Contact Form Handler (Contact Page & Home Teaser)
    // ==========================================
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                return;
            }
            
            // Show loading visual state without setting disabled=true (disabling button cancels submit on mobile browsers)
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.style.pointerEvents = 'none';
                submitBtn.style.opacity = '0.7';
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            }
            
            // Allow form to submit and page to redirect naturally
        });
    });

    // ==========================================
    // 6. Home Search Bar Handler
    // ==========================================
    const heroSearchForm = document.getElementById('heroSearchForm');
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const location = document.getElementById('search-location').value;
            const propType = document.getElementById('search-type').value;
            const price = document.getElementById('search-price').value;
            
            // Redirect to properties.html with search params (simulated)
            const queryParams = new URLSearchParams({
                location: location,
                type: propType,
                price: price
            });
            window.location.href = `properties.html?${queryParams.toString()}`;
        });
    }
});
