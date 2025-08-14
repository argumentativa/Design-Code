// Enhanced Main JavaScript - Compatible Version
// This version includes the optimizations but works without ES6 modules

(function() {
    'use strict';

    // Check for browser support
    const browserSupport = {
        webgl: checkWebGLSupport(),
        es6: typeof Symbol !== 'undefined',
        intersectionObserver: 'IntersectionObserver' in window,
        customProperties: CSS && CSS.supports && CSS.supports('--custom', 'property')
    };

    function checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!(gl && gl instanceof WebGLRenderingContext);
        } catch (e) {
            return false;
        }
    }

    // Enhanced error handling wrapper
    function safeExecute(fn, fallback) {
        try {
            return fn();
        } catch (error) {
            console.error('Error in safe execution:', error);
            if (fallback) fallback(error);
            return null;
        }
    }

    // Performance optimization: Debounce function
    function debounce(func, wait) {
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

    // Performance optimization: Throttle function
    function throttle(func, limit) {
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

    // Loading state management
    function showLoadingState() {
        document.body.classList.add('loading');
    }

    function hideLoadingState() {
        document.body.classList.remove('loading');
    }

    // Initialize with proper error handling
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ Enhanced JavaScript is working!');
        
        showLoadingState();
        
        // Initialize all components with error handling
        safeExecute(() => {
            initShimmerControls();
        }, (error) => {
            console.warn('Shimmer controls initialization failed:', error);
        });
        
        safeExecute(() => {
            initScrollShimmerButtons();
        }, (error) => {
            console.warn('Scroll buttons initialization failed:', error);
        });
        
        safeExecute(() => {
            initAISuggestions();
        }, (error) => {
            console.warn('AI suggestions initialization failed:', error);
        });
        
        safeExecute(() => {
            initCleanAISuggestions();
        }, (error) => {
            console.warn('Clean AI suggestions initialization failed:', error);
        });
        
        // Three.js with enhanced error handling and performance optimization
        if (browserSupport.webgl) {
            safeExecute(() => {
                initThreeJS();
            }, (error) => {
                console.warn('Three.js initialization failed:', error);
                showThreeJSFallback('threejs-container', 'Three.js failed to initialize');
            });
            
            safeExecute(() => {
                initRoomScene();
            }, (error) => {
                console.warn('Room scene initialization failed:', error);
                showThreeJSFallback('room-container', 'Room scene failed to initialize');
            });
        } else {
            console.warn('WebGL not supported - 3D features disabled');
            showThreeJSFallback('threejs-container', 'WebGL not supported');
            showThreeJSFallback('room-container', 'WebGL not supported');
        }
        
        // Setup performance monitoring
        setupPerformanceMonitoring();
        
        // Setup visibility change handling for performance
        setupVisibilityHandling();
        
        // Add resize handler with debouncing
        window.addEventListener('resize', debounce(handleResize, 250));
        
        hideLoadingState();
    });

    // Fallback UI for Three.js
    function showThreeJSFallback(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center; padding: 2rem;">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
                        <p style="font-weight: 600;">3D Animation</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">${message}</p>
                    </div>
                </div>
            `;
        }
    }

    // Performance monitoring
    function setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            try {
                const perfObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.entryType === 'measure') {
                            console.debug(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                        }
                    });
                });
                
                perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (error) {
                console.warn('Performance monitoring not available:', error);
            }
        }
    }

    // Visibility handling for performance
    let animationsPaused = false;
    
    function setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pauseAnimations();
            } else {
                resumeAnimations();
            }
        });
    }

    function pauseAnimations() {
        animationsPaused = true;
        console.log('Animations paused (tab hidden)');
        // Pause Three.js animations if they exist
        if (window.isAnimating !== undefined) {
            window.isAnimating = false;
        }
    }

    function resumeAnimations() {
        animationsPaused = false;
        console.log('Animations resumed (tab visible)');
        // Resume Three.js animations if they exist
        if (window.isAnimating !== undefined) {
            window.isAnimating = true;
        }
    }

    function handleResize() {
        // Handle window resize for Three.js scenes
        if (window.onWindowResize) {
            window.onWindowResize();
        }
    }

    // Add scroll performance optimization
    const scrollHandler = throttle(() => {
        // Existing scroll handling code
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
        
        // Update button shimmer effects based on scroll
        const shimmerButtons = document.querySelectorAll('.button-shimmer');
        shimmerButtons.forEach((button, index) => {
            const offset = index * 20;
            const phase = (scrollProgress * 360 + offset) % 360;
            const backgroundPosition = `${Math.sin(phase * Math.PI / 180) * 50 + 50}% ${Math.cos(phase * Math.PI / 180) * 50 + 50}%`;
            button.style.backgroundPosition = backgroundPosition;
        });
    }, 16);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Intersection Observer for lazy loading
    if (browserSupport.intersectionObserver) {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    lazyLoadObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all cards for animation
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('animate-on-scroll');
            lazyLoadObserver.observe(card);
        });
    }

    // Register Service Worker for offline capability
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.warn('Service Worker registration failed:', error);
                });
        });
    }

    // Export to window for compatibility with existing code
    window.safeExecute = safeExecute;
    window.debounce = debounce;
    window.throttle = throttle;
    window.browserSupport = browserSupport;

    // Load the original main.js functions but with error handling
    const originalDOMContentLoaded = window.onload;
    window.onload = function() {
        if (originalDOMContentLoaded) {
            safeExecute(originalDOMContentLoaded);
        }
    };

})();