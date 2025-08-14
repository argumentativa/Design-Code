// Shimmer Controls Module
export class ShimmerControls {
    constructor() {
        this.speedSlider = null;
        this.speedDisplay = null;
        this.directionSelect = null;
        this.intensitySlider = null;
        this.intensityDisplay = null;
        this.pauseButton = null;
        this.shimmerCard = null;
        
        this.isPaused = false;
        this.currentSpeed = 40;
        this.currentDirection = 'clockwise';
        this.currentIntensity = 100;
        
        this.animationStyleSheet = null;
    }

    init() {
        try {
            this.speedSlider = document.getElementById('speed-slider');
            this.speedDisplay = document.getElementById('speed-display');
            this.directionSelect = document.getElementById('direction-select');
            this.intensitySlider = document.getElementById('intensity-slider');
            this.intensityDisplay = document.getElementById('intensity-display');
            this.pauseButton = document.getElementById('pause-shimmer');
            this.shimmerCard = document.getElementById('shimmer-card');
            
            if (!this.speedSlider || !this.shimmerCard) {
                throw new Error('Required shimmer control elements not found');
            }
            
            this.createDynamicStyleSheet();
            this.setupEventListeners();
            this.updateShimmerAnimation();
            
            return true;
        } catch (error) {
            console.error('Failed to initialize shimmer controls:', error);
            return false;
        }
    }

    createDynamicStyleSheet() {
        this.animationStyleSheet = document.createElement('style');
        this.animationStyleSheet.id = 'dynamic-shimmer-styles';
        document.head.appendChild(this.animationStyleSheet);
    }

    setupEventListeners() {
        if (this.speedSlider) {
            this.speedSlider.addEventListener('input', (e) => {
                this.currentSpeed = parseInt(e.target.value);
                this.speedDisplay.textContent = `${this.currentSpeed}s`;
                this.updateShimmerAnimation();
            });
        }
        
        if (this.directionSelect) {
            this.directionSelect.addEventListener('change', (e) => {
                this.currentDirection = e.target.value;
                this.updateShimmerAnimation();
            });
        }
        
        if (this.intensitySlider) {
            this.intensitySlider.addEventListener('input', (e) => {
                this.currentIntensity = parseInt(e.target.value);
                this.intensityDisplay.textContent = `${this.currentIntensity}%`;
                this.updateShimmerAnimation();
            });
        }
        
        if (this.pauseButton) {
            this.pauseButton.addEventListener('click', () => {
                this.togglePause();
            });
        }
    }

    updateShimmerAnimation() {
        if (!this.shimmerCard || !this.animationStyleSheet) return;
        
        const intensity = this.currentIntensity / 100;
        const speed = this.currentSpeed;
        
        let keyframes = '';
        
        switch (this.currentDirection) {
            case 'clockwise':
                keyframes = `
                    @keyframes dynamicShimmer {
                        0% { 
                            background-position: 0% 0%;
                            transform: scale(1);
                        }
                        25% { 
                            background-position: 100% 0%;
                            transform: scale(${1 + 0.005 * intensity});
                        }
                        50% { 
                            background-position: 100% 100%;
                            transform: scale(1);
                        }
                        75% { 
                            background-position: 0% 100%;
                            transform: scale(${1 - 0.002 * intensity});
                        }
                        100% { 
                            background-position: 0% 0%;
                            transform: scale(1);
                        }
                    }
                `;
                break;
                
            case 'counterclockwise':
                keyframes = `
                    @keyframes dynamicShimmer {
                        0% { 
                            background-position: 0% 0%;
                            transform: scale(1);
                        }
                        25% { 
                            background-position: 0% 100%;
                            transform: scale(${1 + 0.005 * intensity});
                        }
                        50% { 
                            background-position: 100% 100%;
                            transform: scale(1);
                        }
                        75% { 
                            background-position: 100% 0%;
                            transform: scale(${1 - 0.002 * intensity});
                        }
                        100% { 
                            background-position: 0% 0%;
                            transform: scale(1);
                        }
                    }
                `;
                break;
                
            case 'horizontal':
                keyframes = `
                    @keyframes dynamicShimmer {
                        0% { 
                            background-position: 0% 50%;
                            transform: scale(1) skewX(0deg);
                        }
                        50% { 
                            background-position: 100% 50%;
                            transform: scale(${1 + 0.003 * intensity}) skewX(${2 * intensity}deg);
                        }
                        100% { 
                            background-position: 0% 50%;
                            transform: scale(1) skewX(0deg);
                        }
                    }
                `;
                break;
                
            case 'vertical':
                keyframes = `
                    @keyframes dynamicShimmer {
                        0% { 
                            background-position: 50% 0%;
                            transform: scale(1) skewY(0deg);
                        }
                        50% { 
                            background-position: 50% 100%;
                            transform: scale(${1 + 0.003 * intensity}) skewY(${2 * intensity}deg);
                        }
                        100% { 
                            background-position: 50% 0%;
                            transform: scale(1) skewY(0deg);
                        }
                    }
                `;
                break;
        }
        
        const css = `
            ${keyframes}
            
            .card--shimmer {
                animation: dynamicShimmer ${speed}s ease-in-out infinite;
                background-size: ${600 * intensity}% ${600 * intensity}%;
            }
            
            .card--shimmer.paused {
                animation-play-state: paused;
            }
        `;
        
        this.animationStyleSheet.textContent = css;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.shimmerCard.classList.add('paused');
            this.pauseButton.textContent = 'Resume';
            this.pauseButton.setAttribute('aria-label', 'Resume shimmer animation');
        } else {
            this.shimmerCard.classList.remove('paused');
            this.pauseButton.textContent = 'Pause';
            this.pauseButton.setAttribute('aria-label', 'Pause shimmer animation');
        }
        
        const event = new CustomEvent('shimmer-toggle', {
            detail: { isPaused: this.isPaused }
        });
        document.dispatchEvent(event);
    }

    setSpeed(speed) {
        if (speed >= 1 && speed <= 120) {
            this.currentSpeed = speed;
            if (this.speedSlider) {
                this.speedSlider.value = speed;
                this.speedDisplay.textContent = `${speed}s`;
            }
            this.updateShimmerAnimation();
        }
    }

    setDirection(direction) {
        const validDirections = ['clockwise', 'counterclockwise', 'horizontal', 'vertical'];
        if (validDirections.includes(direction)) {
            this.currentDirection = direction;
            if (this.directionSelect) {
                this.directionSelect.value = direction;
            }
            this.updateShimmerAnimation();
        }
    }

    setIntensity(intensity) {
        if (intensity >= 10 && intensity <= 100) {
            this.currentIntensity = intensity;
            if (this.intensitySlider) {
                this.intensitySlider.value = intensity;
                this.intensityDisplay.textContent = `${intensity}%`;
            }
            this.updateShimmerAnimation();
        }
    }

    getState() {
        return {
            speed: this.currentSpeed,
            direction: this.currentDirection,
            intensity: this.currentIntensity,
            isPaused: this.isPaused
        };
    }

    destroy() {
        if (this.animationStyleSheet) {
            this.animationStyleSheet.remove();
        }
        
        if (this.shimmerCard) {
            this.shimmerCard.classList.remove('paused');
            this.shimmerCard.style.animation = '';
        }
    }
}