// Optimized Main JavaScript File with Enhanced Error Handling and Performance
// Note: This file uses ES6 modules. For now, we'll create a non-module version for compatibility

// Since ES6 modules require a server and proper MIME types, let's create a fallback
// that loads the original main.js for immediate functionality

class FrontendPracticeApp {
    constructor() {
        this.thunderboltScene = null;
        this.roomScene = null;
        this.aiSuggestions = null;
        this.cleanAiSuggestions = null;
        this.shimmerControls = null;
        this.scrollEffects = null;
        
        this.isInitialized = false;
        this.loadingStates = new Map();
        this.performanceObserver = null;
        
        this.bindMethods();
    }

    bindMethods() {
        this.init = this.init.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    async init() {
        try {
            logger.info('Initializing Frontend Practice App...');
            
            this.showLoadingState();
            this.setupGlobalErrorHandling();
            this.setupPerformanceMonitoring();
            
            await this.checkBrowserSupport();
            await this.loadDependencies();
            await this.initializeModules();
            
            this.setupEventListeners();
            this.hideLoadingState();
            
            this.isInitialized = true;
            logger.success('Frontend Practice App initialized successfully!');
            Utils.logPerformance();
            
        } catch (error) {
            logger.error('Failed to initialize app:', error);
            this.showErrorState(error);
        }
    }

    async checkBrowserSupport() {
        const support = {
            webgl: Utils.isWebGLSupported(),
            es6: typeof Symbol !== 'undefined',
            modules: 'noModule' in HTMLScriptElement.prototype,
            intersectionObserver: 'IntersectionObserver' in window,
            customProperties: Utils.supportsFeature('--custom', 'property')
        };

        logger.info('Browser support:', support);

        if (!support.webgl) {
            logger.warn('WebGL not supported - 3D features will be disabled');
        }

        if (!support.es6) {
            throw new Error('ES6 not supported - please update your browser');
        }

        return support;
    }

    async loadDependencies() {
        const dependencies = [];
        
        if (!window.THREE) {
            dependencies.push(this.loadThreeJS());
        }
        
        if (dependencies.length > 0) {
            await Promise.all(dependencies);
            logger.info('Dependencies loaded successfully');
        }
    }

    loadThreeJS() {
        return new Promise((resolve, reject) => {
            if (window.THREE) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = () => {
                logger.success('Three.js loaded successfully');
                resolve();
            };
            script.onerror = () => {
                logger.error('Failed to load Three.js from CDN');
                this.loadThreeJSFallback()
                    .then(resolve)
                    .catch(reject);
            };
            document.head.appendChild(script);
        });
    }

    async loadThreeJSFallback() {
        logger.info('Attempting to load Three.js fallback...');
        try {
            const module = await import('https://unpkg.com/three@0.128.0/build/three.module.js');
            window.THREE = module;
            logger.success('Three.js fallback loaded successfully');
        } catch (error) {
            logger.error('All Three.js sources failed - 3D features disabled');
            throw new Error('Three.js could not be loaded');
        }
    }

    async initializeModules() {
        const initPromises = [];

        initPromises.push(this.initThunderboltScene());
        initPromises.push(this.initAISuggestions());
        initPromises.push(this.initShimmerControls());
        initPromises.push(this.initScrollEffects());
        
        if (document.getElementById('room-container')) {
            initPromises.push(this.initRoomScene());
        }

        const results = await Promise.allSettled(initPromises);
        
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                logger.error(`Module ${index} failed to initialize:`, result.reason);
            }
        });
    }

    async initThunderboltScene() {
        try {
            this.setLoadingState('thunderbolt', true);
            
            if (!Utils.isWebGLSupported()) {
                throw new Error('WebGL not supported');
            }

            this.thunderboltScene = new ThunderboltScene('threejs-container');
            const success = await this.thunderboltScene.init();
            
            if (success) {
                this.setupThunderboltControls();
                logger.success('Thunderbolt scene initialized');
            } else {
                throw new Error('Thunderbolt scene initialization failed');
            }
            
        } catch (error) {
            logger.error('Thunderbolt scene error:', error);
            this.showThunderboltFallback();
        } finally {
            this.setLoadingState('thunderbolt', false);
        }
    }

    async initRoomScene() {
        try {
            this.setLoadingState('room', true);
            
            logger.info('Room scene initialization would go here');
            
        } catch (error) {
            logger.error('Room scene error:', error);
        } finally {
            this.setLoadingState('room', false);
        }
    }

    async initAISuggestions() {
        try {
            this.aiSuggestions = new AISuggestions(
                'ai-input', 
                'suggestions-container',
                { loaderId: 'input-loader', isShimmer: true }
            );
            
            this.cleanAiSuggestions = new AISuggestions(
                'clean-ai-input',
                'clean-suggestions-container',
                { loaderId: 'clean-input-loader', isShimmer: false }
            );
            
            const success1 = this.aiSuggestions.init();
            const success2 = this.cleanAiSuggestions.init();
            
            if (success1 || success2) {
                logger.success('AI suggestions initialized');
            }
            
        } catch (error) {
            logger.error('AI suggestions error:', error);
        }
    }

    async initShimmerControls() {
        try {
            this.shimmerControls = new ShimmerControls();
            const success = this.shimmerControls.init();
            
            if (success) {
                logger.success('Shimmer controls initialized');
            }
            
        } catch (error) {
            logger.error('Shimmer controls error:', error);
        }
    }

    async initScrollEffects() {
        try {
            this.scrollEffects = new ScrollEffects();
            const success = this.scrollEffects.init();
            
            if (success) {
                this.scrollEffects.addScrollTriggerAnimations();
                logger.success('Scroll effects initialized');
            }
            
        } catch (error) {
            logger.error('Scroll effects error:', error);
        }
    }

    setupThunderboltControls() {
        const toggleButton = document.getElementById('toggle-animation');
        const colorButton = document.getElementById('change-color');
        
        if (toggleButton && this.thunderboltScene) {
            toggleButton.addEventListener('click', () => {
                try {
                    const isAnimating = this.thunderboltScene.toggleAnimation();
                    toggleButton.textContent = isAnimating ? 'Pause Animation' : 'Start Animation';
                    toggleButton.setAttribute('aria-pressed', isAnimating ? 'false' : 'true');
                    logger.info(`Animation ${isAnimating ? 'started' : 'paused'}`);
                } catch (error) {
                    logger.error('Failed to toggle animation:', error);
                }
            });
        }
        
        if (colorButton && this.thunderboltScene) {
            colorButton.addEventListener('click', () => {
                try {
                    const newColor = this.thunderboltScene.changeColor();
                    logger.info(`Thunderbolt color changed to: #${newColor.toString(16)}`);
                } catch (error) {
                    logger.error('Failed to change color:', error);
                }
            });
        }
    }

    setupEventListeners() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        window.addEventListener('resize', Utils.debounce(this.handleResize, 250));
        
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAnimations();
        } else {
            this.resumeAnimations();
        }
    }

    handleResize() {
        if (this.thunderboltScene) {
            this.thunderboltScene.onWindowResize();
        }
        
        if (this.roomScene) {
            this.roomScene.onWindowResize();
        }
    }

    pauseAnimations() {
        logger.info('Pausing animations (tab hidden)');
        
        if (this.thunderboltScene) {
            this.thunderboltScene.isAnimating = false;
        }
    }

    resumeAnimations() {
        logger.info('Resuming animations (tab visible)');
        
        if (this.thunderboltScene) {
            this.thunderboltScene.isAnimating = true;
        }
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            logger.error('Global error:', event.error);
            this.handleGlobalError(event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            logger.error('Unhandled promise rejection:', event.reason);
            this.handleGlobalError(event.reason);
        });
    }

    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            try {
                this.performanceObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.entryType === 'measure') {
                            logger.debug(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                        }
                    });
                });
                
                this.performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (error) {
                logger.warn('Performance monitoring not available:', error);
            }
        }
    }

    setLoadingState(module, isLoading) {
        this.loadingStates.set(module, isLoading);
        
        const hasAnyLoading = Array.from(this.loadingStates.values()).some(state => state);
        
        if (hasAnyLoading) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }
    }

    showLoadingState() {
        const existingLoader = document.getElementById('app-loader');
        if (existingLoader) return;

        const loader = Utils.createElement('div', 'app-loader', `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading Frontend Practice...</p>
            </div>
        `);
        loader.id = 'app-loader';
        
        const style = document.createElement('style');
        style.textContent = `
            .app-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(4px);
            }
            .loader-content {
                text-align: center;
                color: var(--color-text);
            }
            .loader-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid var(--color-border);
                border-top: 3px solid var(--color-primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
    }

    hideLoadingState() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }

    showErrorState(error) {
        const errorDiv = Utils.createElement('div', 'app-error', `
            <div class="error-content">
                <h2>⚠️ Something went wrong</h2>
                <p>The application failed to load properly.</p>
                <details>
                    <summary>Error details</summary>
                    <pre>${error.message}</pre>
                </details>
                <button onclick="location.reload()" class="button button--primary">
                    Reload Page
                </button>
            </div>
        `);
        
        const style = document.createElement('style');
        style.textContent = `
            .app-error {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--color-background);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 2rem;
            }
            .error-content {
                text-align: center;
                max-width: 500px;
            }
            .error-content h2 {
                color: var(--color-text);
                margin-bottom: 1rem;
            }
            .error-content details {
                margin: 1rem 0;
                text-align: left;
            }
            .error-content pre {
                background: var(--color-surface);
                padding: 1rem;
                border-radius: var(--border-radius-sm);
                overflow: auto;
                font-size: 0.875rem;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(errorDiv);
    }

    showThunderboltFallback() {
        const container = document.getElementById('threejs-container');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center; padding: 2rem;">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
                        <p style="font-weight: 600;">Thunderbolt Animation</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">3D features not available</p>
                        <p style="font-size: 0.8rem; color: #999;">WebGL or Three.js failed to load</p>
                    </div>
                </div>
            `;
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
        }
    }

    handleGlobalError(error) {
        if (this.isInitialized) {
            logger.error('Runtime error occurred:', error);
        }
    }

    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            logger.info('Service Worker registered:', registration);
        } catch (error) {
            logger.warn('Service Worker registration failed:', error);
        }
    }

    cleanup() {
        logger.info('Cleaning up application...');
        
        if (this.thunderboltScene) {
            this.thunderboltScene.destroy();
        }
        
        if (this.roomScene) {
            this.roomScene.destroy();
        }
        
        if (this.aiSuggestions) {
            this.aiSuggestions.destroy();
        }
        
        if (this.cleanAiSuggestions) {
            this.cleanAiSuggestions.destroy();
        }
        
        if (this.shimmerControls) {
            this.shimmerControls.destroy();
        }
        
        if (this.scrollEffects) {
            this.scrollEffects.destroy();
        }
        
        if (this.performanceObserver) {
            this.performanceObserver.disconnect();
        }
    }
}

const app = new FrontendPracticeApp();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', app.init);
} else {
    app.init();
}

window.app = app;