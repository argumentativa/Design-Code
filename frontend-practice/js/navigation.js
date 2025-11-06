/**
 * Modern Navigation Component
 * Implements Discord-inspired navigation with immediate visibility,
 * contextual grouping, activity indicators, and single-tap access.
 */

class ModernNavigation {
    constructor() {
        this.nav = document.querySelector('.modern-nav');
        this.searchInput = document.querySelector('.search-input');
        this.toggleButtons = document.querySelectorAll('.nav-toggle');
        this.navLists = document.querySelectorAll('.nav-list');
        this.navItems = document.querySelectorAll('.nav-item');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSearch();
        this.setupMobileNavigation();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Toggle section expansion
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSection(button);
            });
        });

        // Navigation link interactions
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e, link);
            });
        });

        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.clearSearch();
                }
            });
        }

        // User menu toggle
        const userMenuToggle = document.querySelector('.user-menu-toggle');
        if (userMenuToggle) {
            userMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleUserMenu();
            });
        }
    }

    setupSearch() {
        // Debounced search function
        let searchTimeout;
        
        this.handleSearch = (query) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query.toLowerCase());
            }, 300);
        };

        this.performSearch = (query) => {
            if (!query.trim()) {
                this.showAllItems();
                return;
            }

            this.navItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const isMatch = text.includes(query);
                
                if (isMatch) {
                    item.style.display = 'block';
                    item.classList.add('nav-item--highlighted');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('nav-item--highlighted');
                }
            });

            // Expand sections that have visible items
            this.expandSectionsWithResults();
        };

        this.showAllItems = () => {
            this.navItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('nav-item--highlighted');
            });
        };

        this.clearSearch = () => {
            if (this.searchInput) {
                this.searchInput.value = '';
                this.showAllItems();
                this.searchInput.blur();
            }
        };
    }

    setupMobileNavigation() {
        // Mobile menu toggle (for future implementation)
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.nav && !this.nav.contains(e.target) && 
                !e.target.closest('.mobile-menu-toggle')) {
                this.closeMobileMenu();
            }
        });
    }

    setupKeyboardNavigation() {
        // Keyboard navigation for search results
        this.searchInput?.addEventListener('keydown', (e) => {
            const visibleItems = Array.from(this.navItems).filter(item => 
                item.style.display !== 'none'
            );

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateSearchResults(visibleItems, 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSearchResults(visibleItems, -1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.activateSelectedItem(visibleItems);
            }
        });
    }

    setupAccessibility() {
        // ARIA attributes and screen reader support
        this.toggleButtons.forEach(button => {
            const section = button.closest('.nav-section');
            const list = section?.querySelector('.nav-list');
            
            if (list) {
                button.setAttribute('aria-controls', list.id || 'nav-list');
                button.setAttribute('aria-expanded', list.classList.contains('nav-list--expanded').toString());
            }
        });

        // Focus management
        this.navLinks.forEach(link => {
            link.addEventListener('focus', () => {
                link.closest('.nav-item')?.classList.add('nav-item--focused');
            });

            link.addEventListener('blur', () => {
                link.closest('.nav-item')?.classList.remove('nav-item--focused');
            });
        });
    }

    toggleSection(button) {
        const section = button.closest('.nav-section');
        const list = section?.querySelector('.nav-list');
        
        if (!list) return;

        const isExpanded = list.classList.contains('nav-list--expanded');
        
        if (isExpanded) {
            list.classList.remove('nav-list--expanded');
            button.setAttribute('aria-expanded', 'false');
        } else {
            list.classList.add('nav-list--expanded');
            button.setAttribute('aria-expanded', 'true');
        }

        // Animate the toggle icon
        const icon = button.querySelector('svg');
        if (icon) {
            icon.style.transform = isExpanded ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
    }

    handleNavClick(e, link) {
        // Remove active state from all items
        this.navItems.forEach(item => {
            item.classList.remove('nav-item--active');
        });

        // Add active state to clicked item
        const navItem = link.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('nav-item--active');
        }

        // Analytics tracking (if needed)
        this.trackNavigation(link.href, link.textContent);

        // Handle special navigation types
        const href = link.getAttribute('href');
        if (href.startsWith('#dm-')) {
            this.handleDirectMessage(href);
        } else if (href.startsWith('#') && href !== '#home') {
            this.handleInternalNavigation(href);
        }
    }

    handleDirectMessage(href) {
        // Handle direct message navigation
        console.log('Opening direct message:', href);
        // Implement DM-specific logic here
    }

    handleInternalNavigation(href) {
        // Handle internal navigation
        console.log('Navigating to:', href);
        // Implement internal navigation logic here
    }

    trackNavigation(href, text) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'navigation_click', {
                'navigation_item': text,
                'navigation_url': href
            });
        }
    }

    expandSectionsWithResults() {
        this.navLists.forEach(list => {
            const visibleItems = list.querySelectorAll('.nav-item[style*="block"]');
            if (visibleItems.length > 0) {
                list.classList.add('nav-list--expanded');
                const toggle = list.closest('.nav-section')?.querySelector('.nav-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }

    navigateSearchResults(items, direction) {
        const currentIndex = items.findIndex(item => 
            item.classList.contains('nav-item--focused')
        );
        
        let nextIndex;
        if (currentIndex === -1) {
            nextIndex = direction > 0 ? 0 : items.length - 1;
        } else {
            nextIndex = (currentIndex + direction + items.length) % items.length;
        }

        // Remove focus from current item
        items.forEach(item => item.classList.remove('nav-item--focused'));
        
        // Focus on next item
        if (items[nextIndex]) {
            items[nextIndex].classList.add('nav-item--focused');
            items[nextIndex].querySelector('.nav-link')?.focus();
        }
    }

    activateSelectedItem(items) {
        const focusedItem = items.find(item => 
            item.classList.contains('nav-item--focused')
        );
        
        if (focusedItem) {
            const link = focusedItem.querySelector('.nav-link');
            if (link) {
                link.click();
            }
        }
    }

    toggleUserMenu() {
        // Implement user menu toggle
        console.log('Toggle user menu');
        // Add user menu implementation here
    }

    toggleMobileMenu() {
        this.nav?.classList.toggle('nav--open');
    }

    closeMobileMenu() {
        this.nav?.classList.remove('nav--open');
    }

    // Public API methods
    expandAll() {
        this.toggleButtons.forEach(button => {
            const list = button.closest('.nav-section')?.querySelector('.nav-list');
            if (list && !list.classList.contains('nav-list--expanded')) {
                this.toggleSection(button);
            }
        });
    }

    collapseAll() {
        this.toggleButtons.forEach(button => {
            const list = button.closest('.nav-section')?.querySelector('.nav-list');
            if (list && list.classList.contains('nav-list--expanded')) {
                this.toggleSection(button);
            }
        });
    }

    setActiveItem(href) {
        this.navItems.forEach(item => {
            item.classList.remove('nav-item--active');
        });

        const targetItem = document.querySelector(`[href="${href}"]`)?.closest('.nav-item');
        if (targetItem) {
            targetItem.classList.add('nav-item--active');
        }
    }

    // Utility methods
    getVisibleItems() {
        return Array.from(this.navItems).filter(item => 
            item.style.display !== 'none'
        );
    }

    getActiveItem() {
        return Array.from(this.navItems).find(item => 
            item.classList.contains('nav-item--active')
        );
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new ModernNavigation();
    
    // Make navigation available globally for debugging
    window.modernNavigation = navigation;
    
    console.log('🚀 Modern Navigation initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernNavigation;
}

