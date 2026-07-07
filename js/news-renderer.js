/**
 * BRIXSTREET REALTORS - NEWS RENDERER
 * Generates relative date stamps and renders real-time infrastructure & regulatory feed items.
 */

document.addEventListener('DOMContentLoaded', () => {
    const newsFeedContainer = document.getElementById('newsFeedContainer');
    
    if (newsFeedContainer) {
        newsFeedContainer.innerHTML = ''; // clear initial content

        // Take top 5 news articles
        const topFiveNews = NEWS_DATA.slice(0, 5);

        topFiveNews.forEach((art, index) => {
            // Calculate relative dates dynamically so the feed always feels fresh
            const today = new Date();
            const articleDate = new Date(today);
            articleDate.setDate(today.getDate() - art.daysOffset);

            let formattedDate = "";
            if (art.daysOffset === 0) {
                formattedDate = "Today";
            } else if (art.daysOffset === 1) {
                formattedDate = "Yesterday";
            } else {
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                formattedDate = articleDate.toLocaleDateString('en-IN', options);
            }

            const newsCol = document.createElement('div');
            newsCol.className = 'col-12 animate-slide-up';
            if (index > 0) {
                newsCol.style.transitionDelay = `${index * 0.1}s`;
            }

            newsCol.innerHTML = `
                <article class="news-card card border-0 rounded-0 shadow-sm p-4 mb-4" style="border-left: 4px solid var(--color-gold) !important;">
                    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <span class="news-category-badge">${art.category}</span>
                        <span class="news-sentiment-badge ${art.sentimentClass}">${art.sentiment}</span>
                    </div>
                    <h3 class="news-title font-heading mb-3" style="font-weight: 400; font-size: 1.4rem; line-height: 1.4;"><a href="#" class="text-navy text-decoration-none">${art.title}</a></h3>
                    <p class="text-muted mb-3" style="font-size: 0.92rem; line-height: 1.7;">${art.description}</p>
                    <div class="d-flex justify-content-between align-items-center border-top pt-3 flex-wrap gap-2" style="font-size: 0.78rem; color: var(--color-primary-light);">
                        <span><i class="far fa-newspaper text-gold me-2"></i>Source: <strong>${art.source}</strong></span>
                        <span><i class="far fa-calendar-alt text-gold me-2"></i>Published: <strong>${formattedDate}</strong></span>
                    </div>
                </article>
            `;
            newsFeedContainer.appendChild(newsCol);
        });

        // Trigger dynamic animations for newly loaded items
        if (window.animationObserver) {
            document.querySelectorAll('#newsFeedContainer .animate-slide-up').forEach(el => {
                window.animationObserver.observe(el);
            });
        } else {
            setTimeout(() => {
                if (window.animationObserver) {
                    document.querySelectorAll('#newsFeedContainer .animate-slide-up').forEach(el => {
                        window.animationObserver.observe(el);
                    });
                } else {
                    document.querySelectorAll('#newsFeedContainer .animate-slide-up').forEach(el => {
                        el.classList.add('animated');
                    });
                }
            }, 100);
        }
    }
});
