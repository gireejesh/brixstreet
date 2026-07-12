/**
 * BRIXSTREET REALTORS - INTERACTIVITY & ANIMATIONS
 * Author: Antigravity Code Assistant
 * JavaScript for responsive interactions, filtering, animations, and counters.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // ==========================================
    // CONFIGURATION: Web3Forms Access Key
    // Get a free key instantly at https://web3forms.com (no signup/domain activation required).
    // Paste your key below to enable instant, verification-free submissions!
    // ==========================================
    const WEB3FORMS_ACCESS_KEY = 'e9a643bf-a07e-47aa-8ff0-e138e779bdc7';
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
            
            // Get key value
            let activeKey = WEB3FORMS_ACCESS_KEY.trim();
            if (!activeKey || activeKey === 'YOUR_ACCESS_KEY_HERE') {
                console.warn('Web3Forms Access Key is not configured. Using sandbox key.');
                activeKey = '00000000-0000-0000-0000-000000000000';
            }
            
            // Check protocol. If running from local file explorer (file://),
            // submit normally via standard HTML form post to bypass CORS restrictions.
            if (window.location.protocol === 'file:') {
                form.setAttribute('action', 'https://api.web3forms.com/submit');
                form.setAttribute('method', 'POST');
                
                // Add access_key hidden field if not already present
                let keyInput = form.querySelector('input[name="access_key"]');
                if (!keyInput) {
                    keyInput = document.createElement('input');
                    keyInput.type = 'hidden';
                    keyInput.name = 'access_key';
                    form.appendChild(keyInput);
                }
                keyInput.value = activeKey;
                
                // Remove redirect field on file:// to let Web3Forms handle success redirection natively
                let redirectInput = form.querySelector('input[name="redirect"]');
                if (redirectInput) {
                    redirectInput.remove();
                }
                
                // Allow form to submit and page to redirect naturally
                return;
            }
            
            // If running on a web server, use premium AJAX submission
            e.preventDefault();
            
            // Show loading visual state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Advisory Request';
            if (submitBtn) {
                submitBtn.style.pointerEvents = 'none';
                submitBtn.style.opacity = '0.7';
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            }
            
            // Create FormData object
            const formData = new FormData(form);
            formData.append('access_key', activeKey);
            
            // Send AJAX request to Web3Forms using FormData
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || `HTTP error! Status: ${response.status}`);
                    }).catch(() => {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Sent Successfully';
                        submitBtn.style.backgroundColor = '#28a745';
                        submitBtn.style.color = '#FFFFFF';
                        submitBtn.style.borderColor = '#28a745';
                    }
                    
                    // Create success message element
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success mt-4 rounded-0 border-0 bg-navy text-white animate-fade-in';
                    alertDiv.style.borderLeft = '4px solid #D4AF37';
                    alertDiv.innerHTML = `
                        <h5 class="font-heading text-gold mb-1">Message Received</h5>
                        <p class="mb-0 text-white" style="font-size: 0.85rem;">${data.message || 'Thank you! Your advisory request has been sent. An executive advisor will reach out within 24 hours.'}</p>
                    `;
                    form.appendChild(alertDiv);
                    form.reset();
                    
                    // Reset button after 6 seconds
                    setTimeout(() => {
                        alertDiv.remove();
                        if (submitBtn) {
                            submitBtn.style.pointerEvents = 'auto';
                            submitBtn.style.opacity = '1';
                            submitBtn.innerHTML = originalText;
                            submitBtn.className = 'btn btn-gold w-100';
                            submitBtn.style = '';
                        }
                    }, 6000);
                } else {
                    throw new Error(data.message || 'Web3Forms error');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Failed to Send';
                    submitBtn.style.backgroundColor = '#dc3545';
                    submitBtn.style.color = '#FFFFFF';
                    submitBtn.style.borderColor = '#dc3545';
                }
                
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger mt-4 rounded-0 border-0 bg-danger text-white animate-fade-in';
                errorDiv.innerHTML = `
                    <p class="mb-1 fw-bold" style="font-size: 0.85rem;">Submission failed:</p>
                    <p class="mb-0 text-white-50" style="font-size: 0.8rem;">${error.message || 'Please check your connection and try again, or email us at brixstreetrealtors@gmail.com.'}</p>
                `;
                form.appendChild(errorDiv);
                
                setTimeout(() => {
                    errorDiv.remove();
                    if (submitBtn) {
                        submitBtn.style.pointerEvents = 'auto';
                        submitBtn.style.opacity = '1';
                        submitBtn.innerHTML = originalText;
                        submitBtn.className = 'btn btn-gold w-100';
                        submitBtn.style = '';
                    }
                }, 8000);
            });
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
