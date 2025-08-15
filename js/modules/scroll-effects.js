// Scroll Effects Module
export class ScrollEffects {
    constructor() {
        this.buttonGrid = null;
        this.shimmerButtons = [];
        this.isObserverSupported = 'IntersectionObserver' in window;
        this.observer = null;
        this.scrollHandler = null;
    }

    init() {
        try {
            this.buttonGrid = document.getElementById('button-grid');
            
            if (!this.buttonGrid) {
                console.warn('Button grid not found, scroll effects disabled');
                return false;
            }
            
            this.shimmerButtons = this.buttonGrid.querySelectorAll('.button-shimmer');
            
            if (this.shimmerButtons.length === 0) {
                console.warn('No shimmer buttons found');
                return false;
            }
            
            this.setupScrollEffects();
            return true;
        } catch (error) {
            console.error('Failed to initialize scroll effects:', error);
            return false;
        }
    }

    setupScrollEffects() {
        if (this.isObserverSupported) {
            this.setupIntersectionObserver();
        } else {
            this.setupFallbackScrollListener();
        }
        
        this.setupScrollPositionEffects();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const button = entry.target;
                const visibility = entry.intersectionRatio;
                
                this.updateButtonVisibility(button, visibility);
                
                if (entry.isIntersecting) {
                    button.classList.add('in-view');
                } else {
                    button.classList.remove('in-view');
                }
            });
        }, options);
        
        this.shimmerButtons.forEach(button => {
            this.observer.observe(button);
        });
    }

    setupFallbackScrollListener() {
        this.scrollHandler = this.throttle(() => {
            this.shimmerButtons.forEach(button => {
                const rect = button.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const visibility = this.calculateVisibility(rect, windowHeight);
                this.updateButtonVisibility(button, visibility);
                
                if (visibility > 0) {
                    button.classList.add('in-view');
                } else {
                    button.classList.remove('in-view');
                }
            });
        }, 16);
        
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }

    setupScrollPositionEffects() {
        const scrollHandler = this.throttle(() => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(scrollY / maxScroll, 1);
            
            this.shimmerButtons.forEach((button, index) => {
                this.updateShimmerEffect(button, scrollProgress, index);
            });
        }, 16);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    calculateVisibility(rect, windowHeight) {
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        if (elementBottom < 0 || elementTop > windowHeight) {
            return 0;
        }
        
        const visibleTop = Math.max(0, -elementTop);
        const visibleBottom = Math.min(elementHeight, windowHeight - elementTop);
        const visibleHeight = visibleBottom - visibleTop;
        
        return Math.max(0, visibleHeight / elementHeight);
    }

    updateButtonVisibility(button, visibility) {
        const opacity = 0.3 + (visibility * 0.7);
        const scale = 0.8 + (visibility * 0.2);
        
        button.style.opacity = opacity;
        button.style.transform = `scale(${scale})`;
    }

    updateShimmerEffect(button, scrollProgress, index) {
        const offset = index * 20;
        const phase = (scrollProgress * 360 + offset) % 360;
        
        const backgroundPosition = `${Math.sin(phase * Math.PI / 180) * 50 + 50}% ${Math.cos(phase * Math.PI / 180) * 50 + 50}%`;
        
        button.style.backgroundPosition = backgroundPosition;
        
        const intensity = Math.sin(scrollProgress * Math.PI * 2) * 0.3 + 0.7;
        const brightness = 0.8 + (intensity * 0.4);
        
        button.style.filter = `brightness(${brightness}) saturate(${1 + intensity * 0.5})`;
        
        const rotateAngle = scrollProgress * 360 * (index % 2 === 0 ? 1 : -1);
        const currentTransform = button.style.transform || 'scale(1)';
        
        if (!currentTransform.includes('rotate')) {
            button.style.transform = `${currentTransform} rotate(${rotateAngle * 0.1}deg)`;
        }
    }

    addScrollTriggerAnimations() {
        const cards = document.querySelectorAll('.card');
        
        if (this.isObserverSupported) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            cards.forEach(card => {
                card.classList.add('animate-on-scroll');
                cardObserver.observe(card);
            });
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
            this.scrollHandler = null;
        }
        
        this.shimmerButtons.forEach(button => {
            button.style.opacity = '';
            button.style.transform = '';
            button.style.backgroundPosition = '';
            button.style.filter = '';
            button.classList.remove('in-view');
        });
    }
}