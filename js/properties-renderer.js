/**
 * BRIXSTREET REALTORS - PROPERTIES RENDERER
 * Dynamically populates and ranks property cards across the home and listings page.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Global click tracker function
    window.trackPropertyClick = (id) => {
        let clicks = JSON.parse(localStorage.getItem('brixstreet_clicks') || '{}');
        clicks[id] = (clicks[id] || 0) + 1;
        localStorage.setItem('brixstreet_clicks', JSON.stringify(clicks));
        console.log(`Click tracked for ${id}: ${clicks[id]}`);
    };

    // Helper to get total clicks (default + tracked)
    const getPropertyClicks = (id) => {
        let clicks = JSON.parse(localStorage.getItem('brixstreet_clicks') || '{}');
        const property = PROPERTIES_DATA.find(p => p.id === id);
        const defaultVal = property ? property.defaultClicks : 0;
        return clicks[id] !== undefined ? (defaultVal + clicks[id]) : defaultVal;
    };

    // 1. Render all properties on properties.html
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = ''; // clear grid
        
        PROPERTIES_DATA.forEach(p => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col-lg-4 col-md-6 property-item animate-slide-up';
            cardCol.setAttribute('data-category', p.category);
            cardCol.style.transition = 'all 0.3s ease';
            
            const metaHTML = p.meta.map(m => `
                <span class="property-meta-item"><i class="fas ${m.icon}" aria-hidden="true"></i> ${m.text}</span>
            `).join('');

            cardCol.innerHTML = `
                <article class="property-card">
                    <span class="property-badge ${p.category === 'luxury' ? 'luxury-badge' : ''}">${p.badge}</span>
                    <div class="property-img-wrap">
                        <img src="${p.image}" alt="${p.imageAlt}" loading="lazy">
                    </div>
                    <div class="property-content">
                        <span class="property-type">${p.type}</span>
                        <h3 class="property-title"><a href="contact.html" onclick="trackPropertyClick('${p.id}')">${p.title}</a></h3>
                        <div class="property-price">${p.price}</div>
                        <p class="text-muted" style="font-size: 0.85rem;">${p.location}</p>
                        <div class="property-meta">
                            ${metaHTML}
                        </div>
                    </div>
                </article>
            `;
            propertiesGrid.appendChild(cardCol);
        });

        // Trigger animations for dynamically added elements
        triggerDynamicAnimations('#propertiesGrid .animate-slide-up');
    }

    // 2. Render top 3 properties on index.html based on popularity
    const featuredPropertiesGrid = document.getElementById('featuredPropertiesGrid');
    if (featuredPropertiesGrid) {
        featuredPropertiesGrid.innerHTML = ''; // clear grid

        // Sort properties by click counts descending
        const rankedProperties = [...PROPERTIES_DATA].sort((a, b) => {
            return getPropertyClicks(b.id) - getPropertyClicks(a.id);
        });

        // Pick top 3
        const topThree = rankedProperties.slice(0, 3);

        topThree.forEach((p, index) => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col-lg-4 col-md-6 animate-slide-up';
            if (index > 0) {
                cardCol.style.transitionDelay = `${index * 0.1}s`;
            }

            const metaHTML = p.meta.map(m => `
                <span class="property-meta-item"><i class="fas ${m.icon}" aria-hidden="true"></i> ${m.text}</span>
            `).join('');

            cardCol.innerHTML = `
                <article class="property-card">
                    <span class="property-badge ${p.category === 'luxury' ? 'luxury-badge' : ''}">${p.badge}</span>
                    <div class="property-img-wrap">
                        <img src="${p.image}" alt="${p.imageAlt}" loading="lazy">
                    </div>
                    <div class="property-content">
                        <span class="property-type">${p.type}</span>
                        <h3 class="property-title"><a href="contact.html" onclick="trackPropertyClick('${p.id}')">${p.title}</a></h3>
                        <div class="property-price">${p.price}</div>
                        <p class="text-muted" style="font-size: 0.85rem;">${p.location}</p>
                        <div class="property-meta">
                            ${metaHTML}
                        </div>
                    </div>
                </article>
            `;
            featuredPropertiesGrid.appendChild(cardCol);
        });

        // Trigger animations for dynamically added elements
        triggerDynamicAnimations('#featuredPropertiesGrid .animate-slide-up');
    }

    // Helper to register dynamic cards with the animation observer
    function triggerDynamicAnimations(selector) {
        if (window.animationObserver) {
            document.querySelectorAll(selector).forEach(el => {
                window.animationObserver.observe(el);
            });
        } else {
            // Fallback if observer is not loaded yet
            setTimeout(() => {
                if (window.animationObserver) {
                    document.querySelectorAll(selector).forEach(el => {
                        window.animationObserver.observe(el);
                    });
                } else {
                    // Force reveal if observer fails
                    document.querySelectorAll(selector).forEach(el => {
                        el.classList.add('animated');
                    });
                }
            }, 100);
        }
    }
});
