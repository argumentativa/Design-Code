// AI Suggestions Module
export class AISuggestions {
    constructor(inputId, containerId, options = {}) {
        this.inputId = inputId;
        this.containerId = containerId;
        this.loaderId = options.loaderId;
        this.isShimmer = options.isShimmer || false;
        
        this.input = null;
        this.container = null;
        this.loader = null;
        
        this.isActive = false;
        this.currentSuggestions = [];
        this.typingTimeout = null;
        
        this.suggestions = [
            { 
                icon: '🎨', 
                title: 'Design System Tips', 
                subtitle: 'Learn about color tokens and spacing' 
            },
            { 
                icon: '⚡', 
                title: 'Performance Optimization', 
                subtitle: 'Speed up your animations and interactions' 
            },
            { 
                icon: '🎯', 
                title: 'Accessibility Best Practices', 
                subtitle: 'Make your designs inclusive for everyone' 
            },
            { 
                icon: '📱', 
                title: 'Responsive Design', 
                subtitle: 'Create layouts that work on all devices' 
            },
            { 
                icon: '🚀', 
                title: 'Modern CSS Features', 
                subtitle: 'Grid, Flexbox, and custom properties' 
            },
            { 
                icon: '🎭', 
                title: 'Animation Principles', 
                subtitle: 'Timing, easing, and motion design' 
            }
        ];
    }

    init() {
        try {
            this.input = document.getElementById(this.inputId);
            this.container = document.getElementById(this.containerId);
            
            if (this.loaderId) {
                this.loader = document.getElementById(this.loaderId);
            }
            
            if (!this.input || !this.container) {
                throw new Error(`Required elements not found: ${this.inputId}, ${this.containerId}`);
            }
            
            this.setupEventListeners();
            return true;
        } catch (error) {
            console.error('Failed to initialize AI suggestions:', error);
            return false;
        }
    }

    setupEventListeners() {
        this.input.addEventListener('focus', () => this.handleFocus());
        this.input.addEventListener('blur', () => this.handleBlur());
        this.input.addEventListener('input', (e) => this.handleInput(e));
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target) && !this.container.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    handleFocus() {
        if (this.input.value.trim().length > 0) {
            this.showSuggestions();
        }
    }

    handleBlur() {
        setTimeout(() => {
            if (!this.container.matches(':hover')) {
                this.hideSuggestions();
            }
        }, 150);
    }

    handleInput(event) {
        const query = event.target.value.trim();
        
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        if (query.length > 0) {
            this.showLoader();
            
            this.typingTimeout = setTimeout(() => {
                this.hideLoader();
                this.filterAndShowSuggestions(query);
            }, 800 + Math.random() * 400);
        } else {
            this.hideLoader();
            this.hideSuggestions();
        }
    }

    handleKeydown(event) {
        if (!this.isActive) return;
        
        const suggestionItems = this.container.querySelectorAll('.suggestion-item');
        const currentActive = this.container.querySelector('.suggestion-item.active');
        let activeIndex = -1;
        
        if (currentActive) {
            activeIndex = Array.from(suggestionItems).indexOf(currentActive);
        }
        
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                activeIndex = Math.min(activeIndex + 1, suggestionItems.length - 1);
                this.highlightSuggestion(suggestionItems, activeIndex);
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                activeIndex = Math.max(activeIndex - 1, 0);
                this.highlightSuggestion(suggestionItems, activeIndex);
                break;
                
            case 'Enter':
                event.preventDefault();
                if (currentActive) {
                    this.selectSuggestion(currentActive);
                }
                break;
                
            case 'Escape':
                this.hideSuggestions();
                this.input.blur();
                break;
        }
    }

    filterAndShowSuggestions(query) {
        const filtered = this.suggestions.filter(suggestion => 
            suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
            suggestion.subtitle.toLowerCase().includes(query.toLowerCase())
        );
        
        this.currentSuggestions = filtered.length > 0 ? filtered : this.suggestions.slice(0, 3);
        this.showSuggestions();
    }

    showSuggestions() {
        if (this.currentSuggestions.length === 0) {
            this.currentSuggestions = this.suggestions.slice(0, 3);
        }
        
        this.container.innerHTML = '';
        
        this.currentSuggestions.forEach((suggestion, index) => {
            const item = this.createSuggestionItem(suggestion, index);
            this.container.appendChild(item);
            
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
        
        this.container.classList.add('active');
        this.isActive = true;
        
        this.input.setAttribute('aria-expanded', 'true');
        this.input.setAttribute('aria-haspopup', 'listbox');
    }

    hideSuggestions() {
        this.container.classList.remove('active');
        this.isActive = false;
        
        setTimeout(() => {
            if (!this.isActive) {
                this.container.innerHTML = '';
            }
        }, 400);
        
        this.input.setAttribute('aria-expanded', 'false');
    }

    createSuggestionItem(suggestion, index) {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.setAttribute('role', 'option');
        item.setAttribute('tabindex', '-1');
        
        const sparkle = document.createElement('div');
        sparkle.className = 'suggestion-sparkle';
        sparkle.style.top = `${15 + Math.random() * 10}%`;
        sparkle.style.right = `${10 + Math.random() * 15}%`;
        sparkle.style.animationDelay = `${index * 0.5}s`;
        
        item.innerHTML = `
            <div class="suggestion-icon">${suggestion.icon}</div>
            <div class="suggestion-content">
                <div class="suggestion-title">${suggestion.title}</div>
                <div class="suggestion-subtitle">${suggestion.subtitle}</div>
            </div>
        `;
        
        item.appendChild(sparkle);
        
        item.addEventListener('click', () => this.selectSuggestion(item));
        item.addEventListener('mouseenter', () => this.highlightSuggestion([item], 0));
        
        return item;
    }

    highlightSuggestion(items, activeIndex) {
        items.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('active');
                item.setAttribute('aria-selected', 'true');
            } else {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
            }
        });
    }

    selectSuggestion(item) {
        const title = item.querySelector('.suggestion-title').textContent;
        this.input.value = `Tell me about ${title}`;
        this.hideSuggestions();
        
        this.simulateAIResponse();
        
        const event = new CustomEvent('suggestion-selected', {
            detail: { title, element: item }
        });
        this.input.dispatchEvent(event);
    }

    simulateAIResponse() {
        this.showLoader();
        this.input.classList.add('ai-thinking');
        
        setTimeout(() => {
            this.hideLoader();
            this.input.classList.remove('ai-thinking');
            
            this.showResponseFeedback();
        }, 2000 + Math.random() * 1000);
    }

    showResponseFeedback() {
        const originalPlaceholder = this.input.placeholder;
        this.input.placeholder = "Great question! Here's what I found...";
        this.input.value = '';
        
        setTimeout(() => {
            this.input.placeholder = originalPlaceholder;
        }, 3000);
    }

    showLoader() {
        if (this.loader) {
            this.loader.classList.add('active');
        }
    }

    hideLoader() {
        if (this.loader) {
            this.loader.classList.remove('active');
        }
    }

    updateSuggestions(newSuggestions) {
        if (Array.isArray(newSuggestions)) {
            this.suggestions = newSuggestions;
        }
    }

    destroy() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        this.hideSuggestions();
        
        if (this.input) {
            this.input.removeEventListener('focus', this.handleFocus);
            this.input.removeEventListener('blur', this.handleBlur);
            this.input.removeEventListener('input', this.handleInput);
            this.input.removeEventListener('keydown', this.handleKeydown);
        }
    }
}