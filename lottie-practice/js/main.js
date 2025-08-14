// Lottie Practice - Main JavaScript File
class LottiePractice {
    constructor() {
        this.animations = new Map();
        this.isLottieLoaded = false;
        this.init();
    }

    async init() {
        try {
            console.log('🎬 Initializing Lottie Practice Environment...');
            
            await this.waitForLottie();
            this.createAnimations();
            this.setupControls();
            this.setupInteractiveEffects();
            
            console.log('✅ Lottie Practice Environment loaded successfully!');
        } catch (error) {
            console.error('❌ Failed to initialize Lottie environment:', error);
            this.showFallback();
        }
    }

    async waitForLottie() {
        return new Promise((resolve, reject) => {
            if (window.lottie) {
                this.isLottieLoaded = true;
                resolve();
                return;
            }

            let attempts = 0;
            const maxAttempts = 50;
            
            const checkLottie = () => {
                attempts++;
                if (window.lottie) {
                    this.isLottieLoaded = true;
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Lottie library failed to load'));
                } else {
                    setTimeout(checkLottie, 100);
                }
            };
            
            checkLottie();
        });
    }

    createAnimations() {
        this.createLoadingAnimation();
        this.createSuccessAnimation();
        this.createInteractiveAnimation();
    }

    createLoadingAnimation() {
        const container = document.getElementById('loading-animation');
        if (!container) return;

        const animationData = this.generateLoadingAnimationData();
        
        try {
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });

            this.animations.set('loading', animation);
            console.log('📊 Loading animation created');
        } catch (error) {
            console.error('Failed to create loading animation:', error);
            this.showAnimationFallback(container, '⏳ Loading...');
        }
    }

    createSuccessAnimation() {
        const container = document.getElementById('success-animation');
        if (!container) return;

        const animationData = this.generateSuccessAnimationData();
        
        try {
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: animationData
            });

            this.animations.set('success', animation);
            console.log('✅ Success animation created');
        } catch (error) {
            console.error('Failed to create success animation:', error);
            this.showAnimationFallback(container, '✅ Success!');
        }
    }

    createInteractiveAnimation() {
        const container = document.getElementById('interactive-animation');
        if (!container) return;

        const animationData = this.generateInteractiveAnimationData();
        
        try {
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });

            this.animations.set('interactive', animation);
            console.log('🎯 Interactive animation created');
        } catch (error) {
            console.error('Failed to create interactive animation:', error);
            this.showAnimationFallback(container, '🎨 Interactive');
        }
    }

    generateLoadingAnimationData() {
        return {
            "v": "5.7.4",
            "fr": 30,
            "ip": 0,
            "op": 90,
            "w": 200,
            "h": 200,
            "nm": "Loading Spinner",
            "ddd": 0,
            "assets": [],
            "layers": [
                {
                    "ddd": 0,
                    "ind": 1,
                    "ty": 4,
                    "nm": "Spinner",
                    "sr": 1,
                    "ks": {
                        "o": {"a": 0, "k": 100},
                        "r": {"a": 1, "k": [
                            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
                            {"t": 89, "s": [360]}
                        ]},
                        "p": {"a": 0, "k": [100, 100, 0]},
                        "a": {"a": 0, "k": [0, 0, 0]},
                        "s": {"a": 0, "k": [100, 100, 100]}
                    },
                    "ao": 0,
                    "shapes": [
                        {
                            "ty": "gr",
                            "it": [
                                {
                                    "ty": "el",
                                    "p": {"a": 0, "k": [0, 0]},
                                    "s": {"a": 0, "k": [80, 80]}
                                },
                                {
                                    "ty": "st",
                                    "c": {"a": 0, "k": [0.2, 0.4, 0.9, 1]},
                                    "o": {"a": 0, "k": 100},
                                    "w": {"a": 0, "k": 8},
                                    "lc": 2,
                                    "lj": 1,
                                    "d": [
                                        {"n": "d", "nm": "dash", "v": {"a": 0, "k": 20}},
                                        {"n": "g", "nm": "gap", "v": {"a": 0, "k": 10}},
                                        {"n": "o", "nm": "offset", "v": {"a": 1, "k": [
                                            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
                                            {"t": 89, "s": [30]}
                                        ]}}
                                    ]
                                },
                                {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}
                            ]
                        }
                    ],
                    "ip": 0,
                    "op": 90,
                    "st": 0,
                    "bm": 0
                }
            ]
        };
    }

    generateSuccessAnimationData() {
        return {
            "v": "5.7.4",
            "fr": 30,
            "ip": 0,
            "op": 60,
            "w": 200,
            "h": 200,
            "nm": "Success Checkmark",
            "ddd": 0,
            "assets": [],
            "layers": [
                {
                    "ddd": 0,
                    "ind": 1,
                    "ty": 4,
                    "nm": "Circle",
                    "sr": 1,
                    "ks": {
                        "o": {"a": 0, "k": 100},
                        "r": {"a": 0, "k": 0},
                        "p": {"a": 0, "k": [100, 100, 0]},
                        "a": {"a": 0, "k": [0, 0, 0]},
                        "s": {"a": 1, "k": [
                            {"i": {"x": [0.175, 0.175, 0.175], "y": [0, 0, 1]}, "o": {"x": [0.325, 0.325, 0.325], "y": [0, 0, 0]}, "t": 0, "s": [0, 0, 100]},
                            {"t": 30, "s": [100, 100, 100]}
                        ]}
                    },
                    "ao": 0,
                    "shapes": [
                        {
                            "ty": "gr",
                            "it": [
                                {
                                    "ty": "el",
                                    "p": {"a": 0, "k": [0, 0]},
                                    "s": {"a": 0, "k": [80, 80]}
                                },
                                {
                                    "ty": "fl",
                                    "c": {"a": 0, "k": [0.2, 0.8, 0.2, 1]},
                                    "o": {"a": 0, "k": 100}
                                },
                                {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}
                            ]
                        }
                    ],
                    "ip": 0,
                    "op": 60,
                    "st": 0,
                    "bm": 0
                },
                {
                    "ddd": 0,
                    "ind": 2,
                    "ty": 4,
                    "nm": "Checkmark",
                    "sr": 1,
                    "ks": {
                        "o": {"a": 0, "k": 100},
                        "r": {"a": 0, "k": 0},
                        "p": {"a": 0, "k": [100, 100, 0]},
                        "a": {"a": 0, "k": [0, 0, 0]},
                        "s": {"a": 0, "k": [100, 100, 100]}
                    },
                    "ao": 0,
                    "shapes": [
                        {
                            "ty": "gr",
                            "it": [
                                {
                                    "ty": "sh",
                                    "ks": {
                                        "a": 1,
                                        "k": [
                                            {"i": {"x": 0.833, "y": 0.833}, "o": {"x": 0.167, "y": 0.167}, "t": 30, "s": [{"i": [[0,0],[0,0],[0,0]], "o": [[0,0],[0,0],[0,0]], "v": [[-20,0],[-20,0],[-20,0]], "c": false}]},
                                            {"t": 59, "s": [{"i": [[0,0],[0,0],[0,0]], "o": [[0,0],[0,0],[0,0]], "v": [[-20,0],[-5,15],[25,-15]], "c": false}]}
                                        ]
                                    }
                                },
                                {
                                    "ty": "st",
                                    "c": {"a": 0, "k": [1, 1, 1, 1]},
                                    "o": {"a": 0, "k": 100},
                                    "w": {"a": 0, "k": 6},
                                    "lc": 2,
                                    "lj": 2
                                },
                                {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}
                            ]
                        }
                    ],
                    "ip": 30,
                    "op": 60,
                    "st": 0,
                    "bm": 0
                }
            ]
        };
    }

    generateInteractiveAnimationData() {
        return {
            "v": "5.7.4",
            "fr": 30,
            "ip": 0,
            "op": 120,
            "w": 200,
            "h": 200,
            "nm": "Interactive Pulse",
            "ddd": 0,
            "assets": [],
            "layers": [
                {
                    "ddd": 0,
                    "ind": 1,
                    "ty": 4,
                    "nm": "Pulse",
                    "sr": 1,
                    "ks": {
                        "o": {"a": 1, "k": [
                            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [100]},
                            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 60, "s": [30]},
                            {"t": 119, "s": [100]}
                        ]},
                        "r": {"a": 0, "k": 0},
                        "p": {"a": 0, "k": [100, 100, 0]},
                        "a": {"a": 0, "k": [0, 0, 0]},
                        "s": {"a": 1, "k": [
                            {"i": {"x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 1]}, "o": {"x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0]}, "t": 0, "s": [100, 100, 100]},
                            {"i": {"x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 1]}, "o": {"x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0]}, "t": 60, "s": [130, 130, 100]},
                            {"t": 119, "s": [100, 100, 100]}
                        ]}
                    },
                    "ao": 0,
                    "shapes": [
                        {
                            "ty": "gr",
                            "it": [
                                {
                                    "ty": "el",
                                    "p": {"a": 0, "k": [0, 0]},
                                    "s": {"a": 0, "k": [60, 60]}
                                },
                                {
                                    "ty": "fl",
                                    "c": {"a": 1, "k": [
                                        {"i": {"x": [0.833, 0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833, 0.833]}, "o": {"x": [0.167, 0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167, 0.167]}, "t": 0, "s": [0.9, 0.3, 0.6, 1]},
                                        {"i": {"x": [0.833, 0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833, 0.833]}, "o": {"x": [0.167, 0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167, 0.167]}, "t": 60, "s": [0.3, 0.7, 0.9, 1]},
                                        {"t": 119, "s": [0.9, 0.3, 0.6, 1]}
                                    ]},
                                    "o": {"a": 0, "k": 100}
                                },
                                {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}
                            ]
                        }
                    ],
                    "ip": 0,
                    "op": 120,
                    "st": 0,
                    "bm": 0
                }
            ]
        };
    }

    setupControls() {
        this.setupLoadingControls();
        this.setupSuccessControls();
        this.setupInteractiveControls();
    }

    setupLoadingControls() {
        const animation = this.animations.get('loading');
        if (!animation) return;

        const playBtn = document.getElementById('play-loading');
        const pauseBtn = document.getElementById('pause-loading');
        const stopBtn = document.getElementById('stop-loading');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                animation.play();
                console.log('▶️ Loading animation playing');
            });
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                animation.pause();
                console.log('⏸️ Loading animation paused');
            });
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                animation.stop();
                console.log('⏹️ Loading animation stopped');
            });
        }
    }

    setupSuccessControls() {
        const animation = this.animations.get('success');
        if (!animation) return;

        const playBtn = document.getElementById('play-success');
        const reverseBtn = document.getElementById('reverse-success');
        const resetBtn = document.getElementById('reset-success');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                animation.setDirection(1);
                animation.play();
                console.log('▶️ Success animation playing');
            });
        }

        if (reverseBtn) {
            reverseBtn.addEventListener('click', () => {
                animation.setDirection(-1);
                animation.play();
                console.log('⏮️ Success animation playing in reverse');
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                animation.goToAndStop(0, true);
                console.log('🔄 Success animation reset');
            });
        }
    }

    setupInteractiveControls() {
        const animation = this.animations.get('interactive');
        if (!animation) return;

        const speedControl = document.getElementById('speed-control');
        const speedDisplay = document.getElementById('speed-display');
        const directionControl = document.getElementById('direction-control');

        if (speedControl && speedDisplay) {
            speedControl.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                animation.setSpeed(speed);
                speedDisplay.textContent = `${speed}x`;
                console.log(`🎛️ Interactive animation speed: ${speed}x`);
            });
        }

        if (directionControl) {
            directionControl.addEventListener('change', (e) => {
                const direction = parseInt(e.target.value);
                animation.setDirection(direction);
                console.log(`🎛️ Interactive animation direction: ${direction > 0 ? 'forward' : 'reverse'}`);
            });
        }
    }

    setupInteractiveEffects() {
        const container = document.getElementById('interactive-animation');
        const animation = this.animations.get('interactive');
        
        if (!container || !animation) return;

        let isHovering = false;

        container.addEventListener('mouseenter', () => {
            if (!isHovering) {
                isHovering = true;
                animation.setSpeed(2);
                console.log('🖱️ Interactive animation: hover effect activated');
            }
        });

        container.addEventListener('mouseleave', () => {
            if (isHovering) {
                isHovering = false;
                animation.setSpeed(1);
                console.log('🖱️ Interactive animation: hover effect deactivated');
            }
        });

        container.addEventListener('focus', () => {
            if (!isHovering) {
                animation.setSpeed(1.5);
                console.log('⌨️ Interactive animation: focus effect activated');
            }
        });

        container.addEventListener('blur', () => {
            if (!isHovering) {
                animation.setSpeed(1);
                console.log('⌨️ Interactive animation: focus effect deactivated');
            }
        });

        container.addEventListener('click', () => {
            animation.goToAndPlay(0);
            console.log('🖱️ Interactive animation: clicked to restart');
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                animation.goToAndPlay(0);
                console.log('⌨️ Interactive animation: keyboard triggered restart');
            }
        });
    }

    showAnimationFallback(container, text) {
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 2rem;">
                ${text}
            </div>
        `;
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
    }

    showFallback() {
        document.querySelectorAll('.lottie-container').forEach(container => {
            if (container.id === 'loading-animation') {
                this.showAnimationFallback(container, '⏳ Loading...');
            } else if (container.id === 'success-animation') {
                this.showAnimationFallback(container, '✅ Success!');
            } else if (container.id === 'interactive-animation') {
                this.showAnimationFallback(container, '🎨 Interactive');
            }
        });
        
        console.warn('⚠️ Lottie fallback mode activated');
    }

    destroy() {
        this.animations.forEach((animation, key) => {
            try {
                animation.destroy();
                console.log(`🗑️ Destroyed ${key} animation`);
            } catch (error) {
                console.error(`Failed to destroy ${key} animation:`, error);
            }
        });
        this.animations.clear();
    }
}

const lottiePractice = new LottiePractice();

window.addEventListener('beforeunload', () => {
    lottiePractice.destroy();
});

window.lottiePractice = lottiePractice;