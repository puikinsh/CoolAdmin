/**
 * Modern Plugin Replacements
 * Vanilla JS alternatives to jQuery plugins
 */

// Initialize modern plugins when DOM is ready
ready(() => {
    
    // Bootstrap 5 Native Selects - No initialization needed
    try {
        const selectElements = $$('.form-select, .js-select2');
        console.log(`Found ${selectElements.length} select elements using Bootstrap 5 native form controls`);
    } catch (error) {
        console.log('Bootstrap select verification error:', error);
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

// Add necessary CSS for Bootstrap select customization
const bootstrapSelectCSS = `
    .select-wrapper {
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;
    }
    
    .form-select {
        display: inline-block;
        width: auto;
        min-width: 120px;
        padding: 0.375rem 2.25rem 0.375rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 16px 12px;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .form-select:focus {
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    
    .form-select-sm {
        padding: 0.25rem 1.75rem 0.25rem 0.5rem;
        font-size: 0.8125rem;
        min-width: 100px;
    }
    
    .form-select-lg {
        padding: 0.5rem 2.75rem 0.5rem 1rem;
        font-size: 1rem;
        min-width: 140px;
    }
    
    .table-data__tool-left .select-wrapper {
        margin-right: 15px;
    }
    
    .table-data__tool-right .select-wrapper {
        margin-left: 10px;
    }
`;

// Add CSS for progress bars
const progressBarCSS = `
    .au-progress__inner {
        background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
        transition: width 0.3s ease-in-out;
    }
    
    .au-progress:nth-child(1) .au-progress__inner {
        background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
    }
    
    .au-progress:nth-child(2) .au-progress__inner {
        background: linear-gradient(90deg, #28a745 0%, #1e7e34 100%);
    }
    
    .au-progress:nth-child(3) .au-progress__inner {
        background: linear-gradient(90deg, #17a2b8 0%, #138496 100%);
    }
    
    .au-progress:nth-child(4) .au-progress__inner {
        background: linear-gradient(90deg, #ffc107 0%, #e0a800 100%);
    }
`;

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
const bootstrapStyle = document.createElement('style');
bootstrapStyle.textContent = bootstrapSelectCSS;
document.head.appendChild(bootstrapStyle);

const progressStyle = document.createElement('style');
progressStyle.textContent = progressBarCSS;
document.head.appendChild(progressStyle);

const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = lightboxCSS;
document.head.appendChild(lightboxStyle);

console.log('Modern plugins initialized successfully');