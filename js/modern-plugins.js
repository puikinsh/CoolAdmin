/**
 * Modern Plugin Replacements
 * Vanilla JS alternatives to jQuery plugins
 */

// Initialize modern plugins when DOM is ready
ready(() => {
    
    // Choices.js - Replace Select2
    try {
        const selectElements = $$('.js-select2');
        selectElements.forEach(element => {
            const choices = new Choices(element, {
                searchEnabled: true,
                itemSelectText: '',
                removeItemButton: true,
                shouldSort: false
            });
        });
        console.log('Choices.js initialized for select elements');
    } catch (error) {
        console.log('Choices.js initialization error:', error);
    }

    // AOS - Replace WOW.js
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
            console.log('AOS initialized successfully');
        }
    } catch (error) {
        console.log('AOS initialization error:', error);
    }

    // Initialize Swiper - Replace Slick Carousel
    try {
        const swiperElements = $$('.swiper');
        swiperElements.forEach(element => {
            const swiper = new Swiper(element, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                }
            });
        });
        console.log('Swiper initialized successfully');
    } catch (error) {
        console.log('Swiper initialization error:', error);
    }

    // CountUp.js replacement for jQuery Counter-Up
    try {
        const counterElements = $$('.counter');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-count') || element.textContent);
                    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
                    
                    animateCounter(element, 0, target, duration);
                    counterObserver.unobserve(element);
                }
            });
        }, observerOptions);

        counterElements.forEach(element => {
            counterObserver.observe(element);
        });

        console.log('Counter animation initialized');
    } catch (error) {
        console.log('Counter initialization error:', error);
    }

    // Simple Lightbox replacement
    try {
        const lightboxTriggers = $$('[data-lightbox]');
        lightboxTriggers.forEach(trigger => {
            on(trigger, 'click', function(e) {
                e.preventDefault();
                const imageSrc = this.href || this.getAttribute('data-src');
                if (imageSrc) {
                    showLightbox(imageSrc);
                }
            });
        });
        console.log('Lightbox initialized');
    } catch (error) {
        console.log('Lightbox initialization error:', error);
    }

    // Initialize modern progress bars
    initializeProgressBars();
});

// Counter animation function
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + difference * easedProgress);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(animate);
}

// Simple lightbox implementation
function showLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'modern-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop">
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="Lightbox Image">
                <button class="lightbox-close">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    addClass(document.body, 'lightbox-open');
    
    // Close on backdrop click or close button
    const backdrop = find(lightbox, '.lightbox-backdrop');
    const closeBtn = find(lightbox, '.lightbox-close');
    
    function closeLightbox() {
        removeClass(document.body, 'lightbox-open');
        document.body.removeChild(lightbox);
    }
    
    on(backdrop, 'click', function(e) {
        if (e.target === backdrop) {
            closeLightbox();
        }
    });
    
    on(closeBtn, 'click', closeLightbox);
    
    // Close on escape key
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    document.addEventListener('keydown', handleKeydown);
}

// Modern progress bar initialization
function initializeProgressBars() {
    const progressBars = $$('.progress-bar-modern');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage') || 0;
                const duration = progressBar.getAttribute('data-duration') || 1000;
                
                animateProgressBar(progressBar, percentage, duration);
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function animateProgressBar(element, targetPercentage, duration) {
    const startTime = performance.now();
    const bar = find(element, '.progress-fill') || element;
    const text = find(element, '.progress-text');
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentPercentage = targetPercentage * progress;
        
        bar.style.width = currentPercentage + '%';
        if (text) {
            text.textContent = Math.round(currentPercentage) + '%';
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Add necessary CSS for lightbox
const lightboxCSS = `
    .modern-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
    }
    
    .lightbox-backdrop {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        cursor: default;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-open {
        overflow: hidden;
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = lightboxCSS;
document.head.appendChild(style);

console.log('Modern plugins initialized successfully');