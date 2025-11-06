/**
 * Author Component Module
 * Interactive behaviors for the Author row component
 */

/**
 * Initialize all Author components on the page
 * This function sets up interactive features like hover effects,
 * click handlers, and keyboard navigation
 */
export function initAuthorComponents() {
    const authorRows = document.querySelectorAll('.author-row');
    
    if (authorRows.length === 0) {
        console.log('No author components found');
        return;
    }
    
    authorRows.forEach((row, index) => {
        setupAuthorRow(row, index);
    });
    
    console.log(`✅ Initialized ${authorRows.length} author component(s)`);
}

/**
 * Set up individual author row with interactive features
 * @param {HTMLElement} row - The author row element
 * @param {number} index - Index of the row
 */
function setupAuthorRow(row, index) {
    // Add keyboard navigation
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', `View ${getAuthorName(row)}'s profile`);
    
    // Click handler
    row.addEventListener('click', (e) => {
        handleAuthorClick(e, row);
    });
    
    // Keyboard navigation
    row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAuthorClick(e, row);
        }
    });
    
    // Add hover animations to badges
    const badges = row.querySelectorAll('.author-badge');
    badges.forEach((badge, badgeIndex) => {
        setupBadgeInteractivity(badge, badgeIndex);
    });
    
    // Add ripple effect on click
    addRippleEffect(row);
    
    // Stagger animation on load
    setTimeout(() => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        requestAnimationFrame(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        });
    }, index * 50);
}

/**
 * Handle click events on author row
 * @param {Event} e - The click event
 * @param {HTMLElement} row - The author row element
 */
function handleAuthorClick(e, row) {
    // Prevent default if it's a badge click
    if (e.target.closest('.author-badge')) {
        const badge = e.target.closest('.author-badge');
        handleBadgeClick(e, badge);
        return;
    }
    
    // Main row click action
    const authorName = getAuthorName(row);
    console.log(`Clicked on author: ${authorName}`);
    
    // Add visual feedback
    row.classList.add('author-row--clicked');
    setTimeout(() => {
        row.classList.remove('author-row--clicked');
    }, 200);
    
    // You can add navigation or other actions here
    // Example: window.location.href = `/profile/${getAuthorId(row)}`;
}

/**
 * Handle badge click events
 * @param {Event} e - The click event
 * @param {HTMLElement} badge - The badge element
 */
function handleBadgeClick(e, badge) {
    e.stopPropagation();
    
    const badgeText = badge.querySelector('.author-badge__text')?.textContent || 'badge';
    console.log(`Clicked on badge: ${badgeText}`);
    
    // Add visual feedback
    badge.style.transform = 'scale(0.95)';
    setTimeout(() => {
        badge.style.transform = '';
    }, 150);
    
    // You can add badge-specific actions here
    // Example: filter by badge type, show badge details, etc.
}

/**
 * Set up interactive features for badges
 * @param {HTMLElement} badge - The badge element
 * @param {number} index - Index of the badge
 */
function setupBadgeInteractivity(badge, index) {
    // Add tooltip or aria-label
    const badgeText = badge.querySelector('.author-badge__text')?.textContent || '';
    badge.setAttribute('aria-label', badgeText);
    badge.setAttribute('role', 'button');
    badge.setAttribute('tabindex', '0');
    
    // Keyboard support for badges
    badge.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBadgeClick(e, badge);
        }
    });
    
    // Add hover delay for smoother interactions
    let hoverTimeout;
    badge.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        badge.classList.add('author-badge--hover');
    });
    
    badge.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
            badge.classList.remove('author-badge--hover');
        }, 100);
    });
}

/**
 * Add ripple effect to author row on click
 * @param {HTMLElement} row - The author row element
 */
function addRippleEffect(row) {
    row.addEventListener('click', function(e) {
        // Don't create ripple for badge clicks
        if (e.target.closest('.author-badge')) {
            return;
        }
        
        const ripple = document.createElement('span');
        const rect = row.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        row.style.position = 'relative';
        row.style.overflow = 'hidden';
        row.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

/**
 * Get author name from row element
 * @param {HTMLElement} row - The author row element
 * @returns {string} Author name
 */
function getAuthorName(row) {
    const nameElement = row.querySelector('.author-name__text');
    return nameElement ? nameElement.textContent.trim() : 'Unknown Author';
}

/**
 * Get author ID from row element (if available)
 * @param {HTMLElement} row - The author row element
 * @returns {string} Author ID
 */
function getAuthorId(row) {
    return row.getAttribute('data-author-id') || '';
}

/**
 * Add CSS animation for ripple effect
 * This should be called once to inject the animation into the page
 */
export function injectRippleAnimation() {
    if (document.getElementById('author-ripple-animation')) {
        return; // Already injected
    }
    
    const style = document.createElement('style');
    style.id = 'author-ripple-animation';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inject ripple animation when module loads
if (typeof document !== 'undefined') {
    injectRippleAnimation();
}

