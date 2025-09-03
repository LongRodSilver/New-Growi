// Enhanced Main JavaScript with Section Slide-Over Effect
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Lenis with Enhanced Settings
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Section Slide-Over Effect Implementation
    function initSectionSlideOver() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index > 0) { // Skip first section
                section.style.position = 'sticky';
                section.style.top = '0';
                section.style.zIndex = sections.length - index;
            }
        });
    }
    
    initSectionSlideOver();

    // Enhanced Animation Triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger staggered animations for specific sections
                if (entry.target.classList.contains('services-section')) {
                    staggerServiceCards();
                }
                
                if (entry.target.classList.contains('hero-section')) {
                    animateHeroFeatures();
                }
            }
        });
    }, observerOptions);

    // Observe sections and animation elements
    document.querySelectorAll('section, .fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Staggered Service Card Animation
    function staggerServiceCards() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        });
    }

    // Hero Features Animation
    function animateHeroFeatures() {
        const features = document.querySelectorAll('.feature-item');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('visible');
            }, (index + 1) * 200);
        });
    }

    // Enhanced FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.setAttribute('aria-expanded', 'false');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ item with enhanced animation
            const newState = !isExpanded;
            faqItem.setAttribute('aria-expanded', newState.toString());
            this.setAttribute('aria-expanded', newState.toString());
            
            // Add smooth height transition
            const answer = faqItem.querySelector('.faq-answer');
            if (newState) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Enhanced Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navbarNav = document.getElementById('navbar-nav');

    if (hamburger && navbarNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbarNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbarNav.classList.remove('active');
            });
        });
    }

    // Enhanced Testimonials Carousel
    const carousel = document.getElementById('testimonials-carousel');
    let isScrolling = false;
    let scrollTimeout;

    function autoScroll() {
        if (!isScrolling && carousel) {
            const scrollLeft = carousel.scrollLeft;
            const cardWidth = 420; // card width + gap
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            if (scrollLeft >= maxScroll) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    }

    // Auto-scroll every 5 seconds
    let autoScrollInterval = setInterval(autoScroll, 5000);

    // Pause auto-scroll when user is interacting
    if (carousel) {
        carousel.addEventListener('scroll', function() {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            clearInterval(autoScrollInterval);
            
            scrollTimeout = setTimeout(function() {
                isScrolling = false;
                autoScrollInterval = setInterval(autoScroll, 5000);
            }, 3000);
        });

        // Touch/mouse interaction detection
        carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        carousel.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(autoScroll, 5000);
        });
    }

    // Enhanced Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (lenis) {
                    lenis.scrollTo(target, {
                        offset: -100,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Performance Optimization: Enhanced Lazy Loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }

    // Enhanced CTA Button Effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }, 100);
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar when scrolling down, show when scrolling up
            scrollTimeout = setTimeout(() => {
                const currentScroll = window.scrollY;
                if (currentScroll > 200) {
                    if (currentScroll > this.lastScroll) {
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        navbar.style.transform = 'translateY(0)';
                    }
                }
                this.lastScroll = currentScroll;
            }, 100);
        });
    }

    // Enhanced Service Card Hover Effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-strong)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Error Handling and Analytics
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // Track user interactions for analytics
    function trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);
        // Add your analytics tracking code here
    }

    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });

    console.log('Enhanced Growi website initialized successfully! 🚀');
});
