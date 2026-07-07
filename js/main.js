/**
 * BRIXSTREET REALTORS - INTERACTIVITY & ANIMATIONS
 * Author: Antigravity Code Assistant
 * JavaScript for responsive interactions, filtering, animations, and counters.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
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

    // ==========================================
    // 5. Contact Form Handler (Contact Page & Home Teaser)
    // ==========================================
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
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
            
            if (isValid) {
                // Show floating luxury overlay/alert for success
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
                
                // Simulate server request
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Sent Successfully';
                    submitBtn.classList.remove('btn-gold');
                    submitBtn.style.backgroundColor = '#28a745';
                    submitBtn.style.color = '#FFFFFF';
                    submitBtn.style.borderColor = '#28a745';
                    
                    // Create success message element
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success mt-4 rounded-0 border-0 bg-navy text-white animate-fade-in';
                    alertDiv.style.borderLeft = '4px solid #D4AF37';
                    alertDiv.innerHTML = `
                        <h5 class="font-heading text-gold mb-1">Message Received</h5>
                        <p class="mb-0 text-white" style="font-size: 0.85rem;">Thank you for contacting BrixStreet Realtors. An executive advisor will reach out to you within 24 hours.</p>
                    `;
                    form.appendChild(alertDiv);
                    
                    form.reset();
                    
                    // Reset button after 5 seconds
                    setTimeout(() => {
                        alertDiv.remove();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.className = 'btn btn-gold w-100';
                        submitBtn.style = '';
                    }, 6000);
                    
                }, 1800);
            }
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
