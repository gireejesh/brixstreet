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
    const subFilterButtons = document.querySelectorAll('.sub-filter-btn');
    const propertyCards = document.querySelectorAll('.property-item');
    const residentialSubFilters = document.getElementById('residentialSubFilters');
    
    const applyFilters = () => {
        const activeMainBtn = document.querySelector('.filter-tab-btn.active');
        const activeSubBtn = document.querySelector('.sub-filter-btn.active');
        
        if (!activeMainBtn) return;
        
        const mainFilter = activeMainBtn.getAttribute('data-filter');
        const subFilter = activeSubBtn ? activeSubBtn.getAttribute('data-subfilter') : 'all';
        
        // Show/hide sub-filters panel
        if (residentialSubFilters) {
            if (mainFilter === 'residential') {
                residentialSubFilters.classList.remove('d-none');
            } else {
                residentialSubFilters.classList.add('d-none');
            }
        }
        
        propertyCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const subtype = card.getAttribute('data-subtype');
            
            let showCard = false;
            
            if (mainFilter === 'all') {
                showCard = true;
            } else if (mainFilter === 'residential') {
                if (category === 'residential') {
                    if (subFilter === 'all' || subtype === subFilter) {
                        showCard = true;
                    }
                }
            } else {
                if (category === mainFilter) {
                    showCard = true;
                }
            }
            
            if (showCard) {
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
    };
    
    if (filterButtons.length > 0 && propertyCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Reset sub-filters to "All" when changing main category
                if (subFilterButtons.length > 0) {
                    subFilterButtons.forEach(btn => {
                        if (btn.getAttribute('data-subfilter') === 'all') {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }
                
                applyFilters();
            });
        });
        
        if (subFilterButtons.length > 0) {
            subFilterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    subFilterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    applyFilters();
                });
            });
        }
        
        // Initial run to check query parameters (e.g. ?type=residential or ?type=residential-apartments)
        const urlParams = new URLSearchParams(window.location.search);
        let typeParam = urlParams.get('type');
        if (typeParam) {
            let subTypeParam = null;
            if (typeParam.startsWith('residential-')) {
                subTypeParam = typeParam.replace('residential-', '');
                typeParam = 'residential';
            }
            
            const matchingBtn = document.querySelector(`.filter-tab-btn[data-filter="${typeParam}"]`);
            if (matchingBtn) {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                matchingBtn.classList.add('active');
            }
            
            if (subTypeParam && subFilterButtons.length > 0) {
                const matchingSubBtn = document.querySelector(`.sub-filter-btn[data-subfilter="${subTypeParam}"]`);
                if (matchingSubBtn) {
                    subFilterButtons.forEach(btn => btn.classList.remove('active'));
                    matchingSubBtn.classList.add('active');
                }
            }
        }
        applyFilters();
    }

    // Set dynamic redirection URL for Web3Forms if not on file:// protocol
    const nextInput = document.getElementById('nextUrlInput');
    if (nextInput) {
        if (window.location.protocol !== 'file:') {
            nextInput.value = window.location.origin + window.location.pathname + '?status=success';
        } else {
            // Remove redirect input on file:// so that Web3Forms handles the redirection to its clean confirmation page
            nextInput.remove();
        }
    }

    // Show success message if redirected back from Web3Forms
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

    // Allow Enter key to validate and submit the form from any input field
    contactForms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.click(); // Triggers form submit event and validation
                    }
                }
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
