document.addEventListener('DOMContentLoaded', () => {
    
    // ═══════════ NAVIGATION SCROLL EFFECT ═══════════
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ═══════════ MOBILE MENU TOGGLE ═══════════
    const burger = document.querySelector('.nav__burger');
    const navLinks = document.querySelector('.nav__links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const links = document.querySelectorAll('.nav__link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ═══════════ STATS COUNTER ANIMATION ═══════════
    const stats = document.querySelectorAll('.hero__stat-num');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            
            const timer = setInterval(() => {
                current += Math.ceil(target / 50);
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, stepTime);
        });
        
        hasAnimated = true;
    }

    // Intersection Observer for stats
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
            }
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.hero__stats'));
    }

    // ═══════════ GROUPS DIRECTORY FILTER & SEARCH ═══════════
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const groupCards = document.querySelectorAll('.dir-card');

    if (searchInput && filterBtns.length > 0 && groupCards.length > 0) {
        
        // Filter function
        function filterGroups() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const activeFilter = document.querySelector('.filter-btn--active').getAttribute('data-filter');

            groupCards.forEach(card => {
                const cardName = card.getAttribute('data-name').toLowerCase();
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                const matchesSearch = cardName.includes(searchTerm);
                const matchesFilter = activeFilter === 'all' || cardCategories.includes(activeFilter);

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Search Input Event
        searchInput.addEventListener('input', filterGroups);

        // Filter Buttons Event
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
                // Add active class to clicked
                e.target.classList.add('filter-btn--active');
                // Run filter
                filterGroups();
            });
        });
        
        // Check for URL hash to pre-filter (e.g. groups.html#featured)
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const btn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
            if (btn) {
                btn.click();
            }
        }
    }
});
