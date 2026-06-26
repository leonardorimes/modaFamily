document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const icon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // --- Advanced Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal standardly
    const revealElements = document.querySelectorAll('.section-title, .subtitle, .services-description, .about-content > p, .sf-cta-area, .contact-info, .areas-footer, .gallery-categories');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Elements to stagger reveal (Grids)
    const grids = ['.features-grid', '.sf-grid', '.services-grid', '.trust-grid', '.process-grid', '.gallery-masonry', '.areas-grid'];
    grids.forEach(gridSelector => {
        const grid = document.querySelectorAll(gridSelector);
        grid.forEach(container => {
            Array.from(container.children).forEach((child, index) => {
                child.classList.add('reveal');
                // Calculate delay index 1 to 6
                let delayIndex = (index % 6) + 1;
                child.classList.add(`reveal-delay-${delayIndex}`);
                observer.observe(child);
            });
        });
    });

    // Elements to reveal with scale
    const scaleElements = document.querySelectorAll('.about-image-wrapper img, .areas-map img');
    scaleElements.forEach(el => {
        el.classList.add('reveal-scale');
        observer.observe(el);
    });
});
