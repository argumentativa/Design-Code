// Three.js Thunderbolt Scene Module
export class ThunderboltScene {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.thunderbolt = null;
        this.stars = null;
        this.electricity = null;
        this.hyperspaceStreaks = null;
        
        this.isAnimating = true;
        this.isMouseOver = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        
        this.colors = [0xffe66d, 0x4ecdc4, 0xff6b6b, 0xff8b94, 0x95e1d3, 0xffa726, 0x42a5f5, 0xab47bc];
        this.currentColorIndex = 0;
        
        this.animationId = null;
    }

    async init() {
        try {
            this.container = document.getElementById(this.containerId);
            if (!this.container) {
                throw new Error(`Container with id "${this.containerId}" not found`);
            }

            if (!window.THREE) {
                throw new Error('Three.js library not loaded');
            }

            this.setupScene();
            this.createThunderbolt();
            this.createStarfield();
            this.createElectricity();
            this.createHyperspaceStreaks();
            this.setupLighting();
            this.setupEventListeners();
            this.startAnimation();
            
            return true;
        } catch (error) {
            console.error('Failed to initialize thunderbolt scene:', error);
            this.showFallback();
            return false;
        }
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        
        this.camera = new THREE.PerspectiveCamera(
            75, 
            this.container.offsetWidth / this.container.offsetHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
    }

    createThunderbolt() {
        const thunderboltShape = new THREE.Shape();
        
        thunderboltShape.moveTo(0, 3);
        thunderboltShape.lineTo(-0.5, 1);
        thunderboltShape.lineTo(0.2, 1);
        thunderboltShape.lineTo(-0.3, 0);
        thunderboltShape.lineTo(0.8, 0);
        thunderboltShape.lineTo(0, -3);
        thunderboltShape.lineTo(0.5, -1);
        thunderboltShape.lineTo(-0.2, -1);
        thunderboltShape.lineTo(0.3, 0);
        thunderboltShape.lineTo(-0.8, 0);
        thunderboltShape.lineTo(0, 3);
        
        const extrudeSettings = {
            depth: 0.3,
            bevelEnabled: true,
            bevelSegments: 8,
            steps: 1,
            bevelSize: 0.1,
            bevelThickness: 0.1
        };
        
        const geometry = new THREE.ExtrudeGeometry(thunderboltShape, extrudeSettings);
        const material = new THREE.MeshPhongMaterial({ 
            color: this.colors[this.currentColorIndex],
            shininess: 100,
            transparent: false,
            opacity: 1.0,
            reflectivity: 0.3,
            emissive: new THREE.Color(0x111122)
        });
        
        this.thunderbolt = new THREE.Mesh(geometry, material);
        this.thunderbolt.castShadow = true;
        this.scene.add(this.thunderbolt);
    }

    createStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = window.innerWidth < 768 ? 400 : 600; // Reduced for performance
        
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const colors = new Float32Array(starCount * 3);
        const originalColors = new Float32Array(starCount * 3);
        const originalSizes = new Float32Array(starCount);
        
        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            const rand = Math.random();
            if (rand < 0.4) {
                sizes[i] = Math.random() * 1.5 + 1.0;
            } else if (rand < 0.8) {
                sizes[i] = Math.random() * 2.5 + 2.0;
            } else {
                sizes[i] = Math.random() * 4.0 + 3.0;
            }
            
            const starType = Math.random();
            let r, g, b;
            
            if (starType < 0.2) {
                const intensity = 0.9 + Math.random() * 0.1;
                r = intensity;
                g = intensity * 0.6;
                b = intensity * 0.7;
            } else if (starType < 0.4) {
                const intensity = 0.8 + Math.random() * 0.2;
                r = intensity;
                g = intensity * 0.9;
                b = intensity * 0.4;
            } else if (starType < 0.6) {
                const intensity = 0.8 + Math.random() * 0.2;
                r = intensity * 0.4;
                g = intensity;
                b = intensity * 0.9;
            } else if (starType < 0.8) {
                const intensity = 0.8 + Math.random() * 0.2;
                r = intensity * 0.9;
                g = intensity * 0.6;
                b = intensity;
            } else {
                const intensity = 0.9 + Math.random() * 0.1;
                r = intensity;
                g = intensity * 0.95;
                b = intensity * 0.9;
            }
            
            colors[i * 3] = r;
            colors[i * 3 + 1] = g;
            colors[i * 3 + 2] = b;
            
            originalColors[i * 3] = r;
            originalColors[i * 3 + 1] = g;
            originalColors[i * 3 + 2] = b;
            originalSizes[i] = sizes[i];
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                size: { value: 3.0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                
                varying vec3 vColor;
                varying float vSize;
                
                void main() {
                    vColor = color;
                    vSize = size;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (400.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vSize;
                
                void main() {
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    
                    if (dist > 0.5) discard;
                    
                    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true
        });
        
        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.stars.originalColors = originalColors;
        this.stars.originalSizes = originalSizes;
        this.scene.add(this.stars);
    }

    createElectricity() {
        const electricityGeometry = new THREE.BufferGeometry();
        const arcCount = 15;
        const pointsPerArc = 30;
        const totalPoints = arcCount * pointsPerArc;
        
        const positions = new Float32Array(totalPoints * 3);
        const colors = new Float32Array(totalPoints * 3);
        
        electricityGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        electricityGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const electricityMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                opacity: { value: 0.8 }
            },
            vertexShader: `
                attribute vec3 color;
                varying vec3 vColor;
                
                void main() {
                    vColor = color;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                uniform float opacity;
                
                void main() {
                    gl_FragColor = vec4(vColor, opacity);
                }
            `,
            transparent: true,
            vertexColors: true
        });
        
        this.electricity = new THREE.Points(electricityGeometry, electricityMaterial);
        this.scene.add(this.electricity);
    }

    createHyperspaceStreaks() {
        this.hyperspaceStreaks = { lines: [] };
        const lineCount = 50;
        
        for (let i = 0; i < lineCount; i++) {
            const lineGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(6);
            const colors = new Float32Array(6);
            
            const angle = Math.random() * Math.PI * 2;
            const baseRadius = 8 + Math.random() * 20;
            const baseHeight = (Math.random() - 0.5) * 25;
            const convergenceDistance = 50;
            const lineLength = 8 + Math.random() * 15;
            
            const startPoint = {
                x: Math.cos(angle) * baseRadius,
                y: baseHeight,
                z: -convergenceDistance
            };
            
            const convergencePoint = { x: 0, y: 0, z: 5 };
            const endProgress = Math.min(1.0, lineLength / convergenceDistance);
            
            const endPoint = {
                x: startPoint.x + (convergencePoint.x - startPoint.x) * endProgress,
                y: startPoint.y + (convergencePoint.y - startPoint.y) * endProgress,
                z: startPoint.z + (convergencePoint.z - startPoint.z) * endProgress
            };
            
            positions[0] = startPoint.x; positions[1] = startPoint.y; positions[2] = startPoint.z;
            positions[3] = endPoint.x; positions[4] = endPoint.y; positions[5] = endPoint.z;
            
            const backIntensity = 0.2 + Math.random() * 0.2;
            const frontIntensity = 0.8 + Math.random() * 0.2;
            
            colors[0] = backIntensity * 0.8; colors[1] = backIntensity * 1.0; colors[2] = backIntensity * 1.2;
            colors[3] = frontIntensity * 0.8; colors[4] = frontIntensity * 1.0; colors[5] = frontIntensity * 1.2;
            
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const lineMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                linewidth: 1 + Math.random() * 4
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            this.scene.add(line);
            
            this.hyperspaceStreaks.lines.push({ mesh: line });
        }
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }

    setupEventListeners() {
        this.container.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
        });
        
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            this.targetRotationX = this.mouseY * 0.5;
            this.targetRotationY = this.mouseX * 0.5;
        });
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }

    startAnimation() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.updateAnimation();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    updateAnimation() {
        if (!this.thunderbolt) return;
        
        if (this.isAnimating && !this.isMouseOver) {
            const time = Date.now() * 0.0003;
            this.thunderbolt.rotation.x += 0.004;
            this.thunderbolt.rotation.y += 0.006;
            this.thunderbolt.rotation.z += 0.003;
            
            this.thunderbolt.position.y = Math.sin(time * 1.2) * 0.15 + Math.sin(time * 2.1) * 0.05;
            this.thunderbolt.position.x = Math.cos(time * 0.8) * 0.08;
            this.thunderbolt.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03);
        } else if (this.isMouseOver) {
            this.thunderbolt.rotation.x += (this.targetRotationX - this.thunderbolt.rotation.x) * 0.05;
            this.thunderbolt.rotation.y += (this.targetRotationY - this.thunderbolt.rotation.y) * 0.05;
            
            this.thunderbolt.position.y = Math.sin(Date.now() * 0.002) * 0.15;
            this.thunderbolt.position.x = Math.cos(Date.now() * 0.0015) * 0.08;
        }
        
        this.updateStars();
        this.updateElectricity();
        this.updateHyperspaceStreaks();
    }

    updateStars() {
        if (!this.stars) return;
        
        const time = Date.now() * 0.001;
        this.stars.material.uniforms.time.value = time;
        
        const positions = this.stars.geometry.attributes.position.array;
        const sizes = this.stars.geometry.attributes.size.array;
        const colors = this.stars.geometry.attributes.color.array;
        const originalColors = this.stars.originalColors;
        const originalSizes = this.stars.originalSizes;
        
        for (let i = 0; i < sizes.length; i++) {
            const depth = Math.abs(positions[i * 3 + 2]);
            const parallaxFactor = 50.0 / (depth + 10.0);
            positions[i * 3 + 2] += Math.sin(time * 0.5 + i * 0.1) * 0.02 * parallaxFactor;
            positions[i * 3] += Math.cos(time * 0.3 + i * 0.15) * 0.01 * parallaxFactor;
            
            const twinklePhase = time * 2 + i * 0.7;
            const twinkleIntensity = Math.sin(twinklePhase) * 0.3 + Math.cos(twinklePhase * 1.7) * 0.2;
            
            const baseSize = originalSizes[i];
            sizes[i] = Math.max(0.2, baseSize * (1.0 + twinkleIntensity * 0.5));
            
            const colorShift = Math.sin(time * 0.8 + i * 0.4) * 0.2;
            const originalR = originalColors[i * 3];
            const originalG = originalColors[i * 3 + 1];
            const originalB = originalColors[i * 3 + 2];
            
            colors[i * 3] = originalR * (0.9 + twinkleIntensity * 0.3 + colorShift * 0.1);
            colors[i * 3 + 1] = originalG * (0.9 + twinkleIntensity * 0.3);
            colors[i * 3 + 2] = originalB * (0.9 + twinkleIntensity * 0.3 - colorShift * 0.05);
        }
        
        this.stars.geometry.attributes.position.needsUpdate = true;
        this.stars.geometry.attributes.size.needsUpdate = true;
        this.stars.geometry.attributes.color.needsUpdate = true;
    }

    updateElectricity() {
        if (!this.electricity || !this.thunderbolt) return;
        
        const time = Date.now() * 0.001;
        this.electricity.material.uniforms.time.value = time;
        this.electricity.rotation.copy(this.thunderbolt.rotation);
        this.electricity.position.copy(this.thunderbolt.position);
        
        const positions = this.electricity.geometry.attributes.position.array;
        const colors = this.electricity.geometry.attributes.color.array;
        const arcCount = 15;
        const pointsPerArc = 30;
        
        for (let arc = 0; arc < arcCount; arc++) {
            for (let point = 0; point < pointsPerArc; point++) {
                const index = arc * pointsPerArc + point;
                const baseIndex = index * 3;
                
                let rawT = (point / pointsPerArc + time * 0.3) % 1.0;
                const t = rawT < 0.5 ? 2 * rawT * rawT : 1 - 2 * (1 - rawT) * (1 - rawT);
                
                const goldenAngle = (arc / arcCount) * Math.PI * 2;
                const elegantSpiral = goldenAngle + t * Math.PI * 1.618;
                
                const spiralX = Math.cos(elegantSpiral);
                const spiralZ = Math.sin(elegantSpiral);
                const verticalPos = (t - 0.5) * 6.0;
                
                let boltRadius;
                const absY = Math.abs(verticalPos);
                
                if (absY > 2.5) {
                    boltRadius = 0.2 + (3.0 - absY) * 0.3;
                } else if (absY > 1.5) {
                    boltRadius = 0.6 + Math.sin((absY - 1.5) * Math.PI) * 0.3;
                } else if (absY > 0.5) {
                    boltRadius = 0.9 + Math.sin(absY * Math.PI * 2) * 0.4;
                } else {
                    boltRadius = 1.2;
                }
                
                const surfaceOffset = 0.1 + Math.sin(time * 2.0 + arc * 0.5) * 0.08;
                const radius = boltRadius + surfaceOffset;
                
                const electricFlow = Math.sin(t * Math.PI * 3) * Math.cos(t * Math.PI * 2);
                const surfaceX = spiralX * radius;
                const surfaceY = verticalPos + electricFlow * 0.15 + Math.sin(t * Math.PI + time) * 0.12;
                const surfaceZ = spiralZ * radius;
                
                positions[baseIndex] = surfaceX;
                positions[baseIndex + 1] = surfaceY;
                positions[baseIndex + 2] = surfaceZ;
                
                const phase = t + time * 0.3 + arc * 0.15;
                const colorCycle = Math.sin(phase) * 0.5 + 0.5;
                const brightness = 0.6 + (Math.sin(t * Math.PI) * 0.3);
                
                colors[baseIndex] = brightness * (0.8 + colorCycle * 0.2);
                colors[baseIndex + 1] = brightness * (0.9 + Math.sin(phase * 1.5) * 0.1);
                colors[baseIndex + 2] = brightness * (0.7 + Math.cos(phase * 2) * 0.3);
            }
        }
        
        this.electricity.geometry.attributes.position.needsUpdate = true;
        this.electricity.geometry.attributes.color.needsUpdate = true;
        
        const happyBounce = Math.sin(time * 2.5) * 0.15;
        const playfulFlutter = Math.sin(time * 5.2) * 0.08;
        this.electricity.material.uniforms.opacity.value = 0.8 + happyBounce + playfulFlutter;
    }

    updateHyperspaceStreaks() {
        if (!this.hyperspaceStreaks?.lines) return;
        
        const time = Date.now() * 0.001;
        
        this.hyperspaceStreaks.lines.forEach((lineData, index) => {
            const line = lineData.mesh;
            const positions = line.geometry.attributes.position.array;
            const colors = line.geometry.attributes.color.array;
            
            const moveSpeed = 1.2;
            positions[2] += moveSpeed;
            positions[5] += moveSpeed;
            
            if (positions[2] > 8) {
                const angle = Math.random() * Math.PI * 2;
                const baseRadius = 8 + Math.random() * 20;
                const baseHeight = (Math.random() - 0.5) * 25;
                const convergenceDistance = 50;
                const lineLength = 8 + Math.random() * 15;
                
                const startPoint = {
                    x: Math.cos(angle) * baseRadius,
                    y: baseHeight,
                    z: -convergenceDistance
                };
                
                const convergencePoint = { x: 0, y: 0, z: 5 };
                const endProgress = Math.min(1.0, lineLength / convergenceDistance);
                
                const endPoint = {
                    x: startPoint.x + (convergencePoint.x - startPoint.x) * endProgress,
                    y: startPoint.y + (convergencePoint.y - startPoint.y) * endProgress,
                    z: startPoint.z + (convergencePoint.z - startPoint.z) * endProgress
                };
                
                positions[0] = startPoint.x; positions[1] = startPoint.y; positions[2] = startPoint.z;
                positions[3] = endPoint.x; positions[4] = endPoint.y; positions[5] = endPoint.z;
                
                const backIntensity = 0.2 + Math.random() * 0.2;
                const frontIntensity = 0.8 + Math.random() * 0.2;
                
                colors[0] = backIntensity * 0.8; colors[1] = backIntensity * 1.0; colors[2] = backIntensity * 1.2;
                colors[3] = frontIntensity * 0.8; colors[4] = frontIntensity * 1.0; colors[5] = frontIntensity * 1.2;
                
                const newLineWidth = 1 + Math.random() * 4;
                line.material.linewidth = newLineWidth;
            }
            
            line.geometry.attributes.position.needsUpdate = true;
            line.geometry.attributes.color.needsUpdate = true;
        });
    }

    showFallback() {
        if (this.container) {
            this.container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center; padding: 2rem;">
                    <div>
                        <p>⚡ Thunderbolt Animation</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">WebGL not supported or Three.js failed to load</p>
                    </div>
                </div>
            `;
        }
    }

    toggleAnimation() {
        this.isAnimating = !this.isAnimating;
        return this.isAnimating;
    }

    changeColor() {
        if (this.thunderbolt) {
            this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
            this.thunderbolt.material.color.setHex(this.colors[this.currentColorIndex]);
        }
        return this.colors[this.currentColorIndex];
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.renderer && this.container) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
        
        if (this.scene) {
            this.scene.clear();
        }
    }
}