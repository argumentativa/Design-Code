// Utility Functions Module
export class Utils {
    static isWebGLSupported() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!(gl && gl.getExtension);
        } catch (e) {
            return false;
        }
    }

    static isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static getReducedMotionPreference() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    static throttle(func, limit) {
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

    static createElement(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    static loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = () => {
            console.error(`Failed to load script: ${src}`);
            if (callback) callback(new Error(`Script load failed: ${src}`));
        };
        document.head.appendChild(script);
    }

    static loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    static preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    static getPerformanceInfo() {
        if (!('performance' in window)) return null;
        
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        return {
            domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : null,
            loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : null,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || null,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || null,
            memory: performance.memory ? {
                used: this.formatBytes(performance.memory.usedJSHeapSize),
                total: this.formatBytes(performance.memory.totalJSHeapSize),
                limit: this.formatBytes(performance.memory.jsHeapSizeLimit)
            } : null
        };
    }

    static logPerformance() {
        if (process.env.NODE_ENV === 'development') {
            const info = this.getPerformanceInfo();
            if (info) {
                console.group('🚀 Performance Info');
                console.log('DOM Content Loaded:', info.domContentLoaded + 'ms');
                console.log('Load Complete:', info.loadComplete + 'ms');
                console.log('First Paint:', info.firstPaint + 'ms');
                console.log('First Contentful Paint:', info.firstContentfulPaint + 'ms');
                if (info.memory) {
                    console.log('Memory Usage:', info.memory.used + ' / ' + info.memory.total);
                }
                console.groupEnd();
            }
        }
    }

    static safeQuerySelector(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.error(`Invalid selector: ${selector}`, error);
            return null;
        }
    }

    static safeQuerySelectorAll(selector, context = document) {
        try {
            return context.querySelectorAll(selector);
        } catch (error) {
            console.error(`Invalid selector: ${selector}`, error);
            return [];
        }
    }

    static addEventListeners(element, events, handler, options) {
        if (!element) return;
        
        const eventList = Array.isArray(events) ? events : [events];
        eventList.forEach(event => {
            element.addEventListener(event, handler, options);
        });
    }

    static removeEventListeners(element, events, handler, options) {
        if (!element) return;
        
        const eventList = Array.isArray(events) ? events : [events];
        eventList.forEach(event => {
            element.removeEventListener(event, handler, options);
        });
    }

    static setAttributes(element, attributes) {
        if (!element || !attributes) return;
        
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    static easeOutElastic(t) {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }

    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return Promise.resolve();
            } catch (err) {
                document.body.removeChild(textArea);
                return Promise.reject(err);
            }
        }
    }

    static getCSSCustomProperty(property, element = document.documentElement) {
        return getComputedStyle(element).getPropertyValue(property).trim();
    }

    static setCSSCustomProperty(property, value, element = document.documentElement) {
        element.style.setProperty(property, value);
    }

    static supportsFeature(property, value) {
        return CSS.supports(property, value);
    }
}

export const logger = {
    info: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('ℹ️', ...args);
        }
    },
    
    warn: (...args) => {
        console.warn('⚠️', ...args);
    },
    
    error: (...args) => {
        console.error('❌', ...args);
    },
    
    success: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('✅', ...args);
        }
    },
    
    debug: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug('🐛', ...args);
        }
    }
};