document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       NAVBAR — scroll state
    ========================================================= */
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    const TOPBAR_H = 38;

    function handleNavScroll() {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > TOPBAR_H);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    /* =========================================================
       MEGA-MENU — JS driven (no CSS hover gap issue)
    ========================================================= */
    let megaTimer = null;

    document.querySelectorAll('.nav-item-dropdown').forEach(item => {
        const menu = item.querySelector('.mega-menu');
        if (!menu) return;

        function openMenu()  { clearTimeout(megaTimer); menu.classList.add('open'); }
        function closeMenu() { megaTimer = setTimeout(() => menu.classList.remove('open'), 180); }

        item.addEventListener('mouseenter', openMenu);
        item.addEventListener('mouseleave', closeMenu);
        menu.addEventListener('mouseenter', openMenu);
        menu.addEventListener('mouseleave', closeMenu);
    });

    /* =========================================================
       GALLERY PAGINATION (gallery.html)
    ========================================================= */
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryPag  = document.getElementById('galleryPagination');
    const IMAGES_PER_PAGE = 9;

    const galleryData = [
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.20.jpeg', alt: 'Authentic Training' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.25.png', alt: 'Brejesh S. Gurukkal' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.26.jpeg', alt: 'Kalari Session' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.27.jpeg', alt: 'Martial Arts Practice' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.28.jpeg', alt: 'Traditional Healing' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.29.jpeg', alt: 'Kalari Wisdom' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.30.jpeg', alt: 'Dedication' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.25 (1).jpeg', alt: 'Guru Brejesh' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.26 (1).jpeg', alt: 'Technique' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.27 (1).jpeg', alt: 'Strength' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.28 (1).jpeg', alt: 'Tradition' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.29 (1).jpeg', alt: 'Practice' },
        { src: 'images/WhatsApp Image 2026-03-31 at 19.47.30 (1).jpeg', alt: 'Discipline' },
        { src: 'images/hero1.jpg', alt: 'Kalari Action' },
        { src: 'images/hero2.jpg', alt: 'Training Session' },
        { src: 'images/kalari1.jpg', alt: 'Traditional Pose' }
    ];

    let currentGallPage = 1;

    function renderGallery(page) {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        const start = (page - 1) * IMAGES_PER_PAGE;
        const end   = start + IMAGES_PER_PAGE;
        const items = galleryData.slice(start, end);

        items.forEach(img => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${img.src}" alt="${img.alt}"><div class="gallery-overlay"><i class="fas fa-expand" style="color:#fff;font-size:1.8rem;"></i></div>`;
            div.onclick = () => openLightbox(img.src);
            galleryGrid.appendChild(div);
        });

        renderPagination();
        window.scrollTo({ top: 400, behavior: 'smooth' });
    }

    function renderPagination() {
        if (!galleryPag) return;
        galleryPag.innerHTML = '';
        const totalPages = Math.ceil(galleryData.length / IMAGES_PER_PAGE);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `btn ${i === currentGallPage ? 'btn-solid' : ''}`;
            btn.style.margin = '0 5px';
            btn.style.padding = '0.5rem 1rem';
            btn.textContent = i;
            btn.onclick = () => {
                currentGallPage = i;
                renderGallery(i);
            };
            galleryPag.appendChild(btn);
        }
    }

    if (galleryGrid) renderGallery(1);

    /* =========================================================
       LIGHTBOX (Gallery Pop-up)
    ========================================================= */
    window.openLightbox = function(src) {
        const lbImg = document.getElementById('lightboxImg');
        const lb    = document.getElementById('lightbox');
        if (!lb || !lbImg) return;
        lbImg.src = src;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background
    };

    const lightbox       = document.getElementById('lightbox');
    const lightboxImg    = document.getElementById('lightboxImg');
    const lightboxClose  = document.getElementById('lightboxClose');

    if (lightboxClose) {
        lightboxClose.onclick = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        };
    }

    if (lightbox) {
        lightbox.onclick = (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('open');
                document.body.style.overflow = '';
            }
        };
    }

    /* =========================================================
       MOBILE TOGGLE
    ========================================================= */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu   = document.getElementById('mobileMenu');
    const toggleIcon   = document.getElementById('toggleIcon');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            if (toggleIcon) {
                toggleIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                if (toggleIcon) toggleIcon.className = 'fas fa-bars';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                if (toggleIcon) toggleIcon.className = 'fas fa-bars';
            }
        });
    }

    /* =========================================================
       HERO SLIDER + DOTS
    ========================================================= */
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots   = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;

    function goToSlide(idx) {
        heroSlides[currentSlide].classList.remove('active');
        heroDots[currentSlide]?.classList.remove('active');
        currentSlide = (idx + heroSlides.length) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
        heroDots[currentSlide]?.classList.add('active');
    }

    if (heroSlides.length > 1) {
        // Dot clicks
        heroDots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
        // Auto advance
        setInterval(() => goToSlide(currentSlide + 1), 5500);
    }

    /* =========================================================
       REREUSABLE CAROUSEL SYSTEM
    ========================================================= */
    function initCarousel(id, prevId, nextId, auto = false) {
        const track    = document.getElementById(id);
        const prevBtn  = document.getElementById(prevId);
        const nextBtn  = document.getElementById(nextId);
        if (!track || !prevBtn || !nextBtn) return;

        const slides   = track.querySelectorAll('.carousel-slide');
        let carouselIdx = 0;

        function getVisible() { return window.innerWidth <= 768 ? 1 : 2.5; }

        function updateCarousel() {
            const vis = getVisible();
            const gap = 24;
            const containerW = track.parentElement.offsetWidth;
            const slideW = (containerW - gap * (Math.floor(vis) - 1)) / vis;
            
            slides.forEach(s => { 
                s.style.flex = `0 0 ${slideW}px`; 
                // Set height based on content type
                if (id === 'testiTrack') s.style.height = 'auto';
                else s.style.height = window.innerWidth <= 768 ? '260px' : '360px';
            });

            const max = Math.max(0, slides.length - Math.floor(vis));
            if (carouselIdx > max) carouselIdx = max;
            track.style.transform = `translateX(-${carouselIdx * (slideW + gap)}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const vis = Math.floor(getVisible());
            carouselIdx = carouselIdx < (slides.length - vis) ? carouselIdx + 1 : 0;
            updateCarousel();
        });
        prevBtn.addEventListener('click', () => {
            const vis = Math.floor(getVisible());
            carouselIdx = carouselIdx > 0 ? carouselIdx - 1 : Math.max(0, slides.length - vis);
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel, { passive: true });
        updateCarousel();
        if (auto) setInterval(() => nextBtn.click(), 6000);
    }

    // Initialize both carousels
    initCarousel('carouselTrack', 'carouselPrev', 'carouselNext', true);
    initCarousel('testiTrack', 'testiPrev', 'testiNext', false);

    /* =========================================================
       SCROLL-TO-TOP + PROGRESS RING
    ========================================================= */
    const scrollTopBtn   = document.getElementById('scrollTop');
    const progressCircle = document.querySelector('.progress-circle circle');

    if (progressCircle) {
        const r  = progressCircle.r.baseVal.value;
        const C  = 2 * Math.PI * r;
        progressCircle.style.strokeDasharray  = C;
        progressCircle.style.strokeDashoffset = C;

        window.addEventListener('scroll', () => {
            const pct    = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            progressCircle.style.strokeDashoffset = C - pct * C;
            if (scrollTopBtn) scrollTopBtn.classList.toggle('active', window.scrollY > 400);
        }, { passive: true });
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* =========================================================
       COUNTER ANIMATION
    ========================================================= */
    function animateCounter(el, target, duration = 1800, suffix = '') {
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    const counterEls = document.querySelectorAll('[data-count]');
    if (counterEls.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    const target  = parseInt(entry.target.dataset.count);
                    const suffix  = entry.target.dataset.suffix || '';
                    animateCounter(entry.target, target, 2000, suffix);
                }
            });
        }, { threshold: 0.5 });

        counterEls.forEach(el => counterObserver.observe(el));
    }

    /* =========================================================
       REVEAL ON SCROLL (class "in-view")
    ========================================================= */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

});
