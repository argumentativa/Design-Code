// Main JavaScript file for frontend practice

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ JavaScript is working!');
    
    // Initialize shimmer controls
    initShimmerControls();
    
    // Initialize scroll-triggered buttons
    initScrollShimmerButtons();
    
    // Initialize AI suggestions
    initAISuggestions();
    
    // Initialize clean AI suggestions
    initCleanAISuggestions();
    
    // Initialize filled AI suggestions
    initFilledAISuggestions();
    
    // Three.js 3D Animation Setup
    initThreeJS();
    
    // Initialize Room Scene
    initRoomScene();
});

// Example function demonstrating modern JavaScript
function createCard(title, content) {
    // This shows:
    // - Function declarations
    // - Template literals
    // - DOM manipulation
    // - Method chaining
    
    const cardHTML = `
        <div class="card">
            <h2 class="card__title">${title}</h2>
            <p class="card__content">${content}</p>
        </div>
    `;
    
    return cardHTML;
}

// Three.js 3D Animation Functions
let scene, camera, renderer, thunderbolt, stars, electricity, hyperspaceStreaks;
let isAnimating = true;
// Bright, optimistic Jetsons color palette
const colors = [0xffe66d, 0x4ecdc4, 0xff6b6b, 0xff8b94, 0x95e1d3, 0xffa726, 0x42a5f5, 0xab47bc];
let currentColorIndex = 0;

// Mouse interaction variables
let mouseX = 0;
let mouseY = 0;
let isMouseOver = false;
let targetRotationX = 0;
let targetRotationY = 0;

function initThreeJS() {
    const container = document.getElementById('threejs-container');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Bright sky blue Jetsons background
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Create thunderbolt geometry using custom shape
    const thunderboltShape = new THREE.Shape();
    
    // Define thunderbolt lightning bolt shape points
    thunderboltShape.moveTo(0, 3);      // Top point
    thunderboltShape.lineTo(-0.5, 1);   // Upper left
    thunderboltShape.lineTo(0.2, 1);    // Upper right indent
    thunderboltShape.lineTo(-0.3, 0);   // Middle left
    thunderboltShape.lineTo(0.8, 0);    // Middle right
    thunderboltShape.lineTo(0, -3);     // Bottom point
    thunderboltShape.lineTo(0.5, -1);   // Lower right
    thunderboltShape.lineTo(-0.2, -1);  // Lower left indent
    thunderboltShape.lineTo(0.3, 0);    // Middle right
    thunderboltShape.lineTo(-0.8, 0);   // Middle left
    thunderboltShape.lineTo(0, 3);      // Back to top
    
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
        color: colors[currentColorIndex],
        shininess: 100,
        transparent: false,
        opacity: 1.0,
        reflectivity: 0.3,
        emissive: new THREE.Color(0x111122) // Subtle warm glow
    });
    thunderbolt = new THREE.Mesh(geometry, material);
    thunderbolt.castShadow = true;
    scene.add(thunderbolt);
    
    // Create starfield
    createStarfield();
    
    // Create electricity effect
    createElectricity();
    
    // Create hyperspace speed streaks
    createHyperspaceStreaks();
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Remove ground plane for space environment
    // (No ground in space!)
    
    // Set up event listeners
    setupThreeJSControls();
    setupMouseInteraction(container);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (isAnimating && !isMouseOver) {
        // Slow, graceful rotation
        const time = Date.now() * 0.0003; // Much slower time multiplier
        thunderbolt.rotation.x += 0.004; // Slower, more graceful
        thunderbolt.rotation.y += 0.006;
        thunderbolt.rotation.z += 0.003;
        
        // Gentle floating motion
        thunderbolt.position.y = Math.sin(time * 1.2) * 0.15 + Math.sin(time * 2.1) * 0.05;
        thunderbolt.position.x = Math.cos(time * 0.8) * 0.08;
        thunderbolt.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03); // Subtle pulsing
    } else if (isMouseOver) {
        // Smooth interpolation to mouse-controlled rotation
        thunderbolt.rotation.x += (targetRotationX - thunderbolt.rotation.x) * 0.05; // Slower response
        thunderbolt.rotation.y += (targetRotationY - thunderbolt.rotation.y) * 0.05;
        
        // Gentle floating effect
        thunderbolt.position.y = Math.sin(Date.now() * 0.002) * 0.15;
        thunderbolt.position.x = Math.cos(Date.now() * 0.0015) * 0.08;
    }
    
    // Animate stars twinkling with size variation
    if (stars) {
        const time = Date.now() * 0.001;
        
        // Update shader uniform for time-based effects
        stars.material.uniforms.time.value = time;
        
        const positions = stars.geometry.attributes.position.array;
        const sizes = stars.geometry.attributes.size.array;
        const colors = stars.geometry.attributes.color.array;
        
        // Get reference to original values
        const originalColors = stars.originalColors;
        const originalSizes = stars.originalSizes;
        
        for (let i = 0; i < sizes.length; i++) {
            // Add subtle parallax movement - closer stars move slightly more
            const depth = Math.abs(positions[i * 3 + 2]);
            const parallaxFactor = 50.0 / (depth + 10.0);
            positions[i * 3 + 2] += Math.sin(time * 0.5 + i * 0.1) * 0.02 * parallaxFactor;
            positions[i * 3] += Math.cos(time * 0.3 + i * 0.15) * 0.01 * parallaxFactor;
            
            // Enhanced twinkling with color variations
            const twinklePhase = time * 2 + i * 0.7;
            const twinkleIntensity = Math.sin(twinklePhase) * 0.3 + Math.cos(twinklePhase * 1.7) * 0.2;
            
            // Size twinkling - use original size as reference
            const baseSize = originalSizes[i];
            sizes[i] = Math.max(0.2, baseSize * (1.0 + twinkleIntensity * 0.5));
            
            // Color twinkling - use original colors as reference
            const colorShift = Math.sin(time * 0.8 + i * 0.4) * 0.2;
            const originalR = originalColors[i * 3];
            const originalG = originalColors[i * 3 + 1];
            const originalB = originalColors[i * 3 + 2];
            
            // Apply twinkling while preserving original color character
            colors[i * 3] = originalR * (0.9 + twinkleIntensity * 0.3 + colorShift * 0.1);
            colors[i * 3 + 1] = originalG * (0.9 + twinkleIntensity * 0.3);
            colors[i * 3 + 2] = originalB * (0.9 + twinkleIntensity * 0.3 - colorShift * 0.05);
        }
        
        stars.geometry.attributes.position.needsUpdate = true;
        stars.geometry.attributes.size.needsUpdate = true;
        stars.geometry.attributes.color.needsUpdate = true;
    }
    
    // Animate electricity around thunderbolt
    if (electricity) {
        const time = Date.now() * 0.001;
        
        // Update electricity shader time for jitter effect
        electricity.material.uniforms.time.value = time;
        
        // Make electricity follow thunderbolt rotation
        electricity.rotation.copy(thunderbolt.rotation);
        electricity.position.copy(thunderbolt.position);
        
        // Graceful, premium electricity animation
        const positions = electricity.geometry.attributes.position.array;
        const colors = electricity.geometry.attributes.color.array;
        const arcCount = 15;
        const pointsPerArc = 30;
        
        for (let arc = 0; arc < arcCount; arc++) {
            for (let point = 0; point < pointsPerArc; point++) {
                const index = arc * pointsPerArc + point;
                const baseIndex = index * 3;
                
                // Elegant flowing motion with smooth easing
                let rawT = (point / pointsPerArc + time * 0.3) % 1.0; // Slower, more graceful
                // Apply smooth easing curve for premium feel
                const t = rawT < 0.5 
                    ? 2 * rawT * rawT 
                    : 1 - 2 * (1 - rawT) * (1 - rawT); // Smooth in-out cubic
                
                // Sophisticated spiral patterns with golden ratio influence
                const goldenAngle = (arc / arcCount) * Math.PI * 2;
                const elegantSpiral = goldenAngle + t * Math.PI * 1.618; // Golden ratio spiral
                
                // Calculate thunderbolt surface distance
                const spiralX = Math.cos(elegantSpiral);
                const spiralZ = Math.sin(elegantSpiral);
                const verticalPos = (t - 0.5) * 6.0; // Full height range for thunderbolt
                
                // Thunderbolt shape - varies width based on vertical position
                let boltRadius;
                const absY = Math.abs(verticalPos);
                
                if (absY > 2.5) {
                    // Pointed ends (top and bottom)
                    boltRadius = 0.2 + (3.0 - absY) * 0.3;
                } else if (absY > 1.5) {
                    // Upper/lower sections
                    boltRadius = 0.6 + Math.sin((absY - 1.5) * Math.PI) * 0.3;
                } else if (absY > 0.5) {
                    // Middle sections (wider)
                    boltRadius = 0.9 + Math.sin(absY * Math.PI * 2) * 0.4;
                } else {
                    // Center area
                    boltRadius = 1.2;
                }
                
                // Hug the thunderbolt surface with offset for visibility
                const surfaceOffset = 0.1 + Math.sin(time * 2.0 + arc * 0.5) * 0.08;
                const radius = boltRadius + surfaceOffset;
                
                // Position on thunderbolt surface with electric flow variations
                const electricFlow = Math.sin(t * Math.PI * 3) * Math.cos(t * Math.PI * 2);
                const surfaceX = spiralX * radius;
                const surfaceY = verticalPos + electricFlow * 0.15 + Math.sin(t * Math.PI + time) * 0.12;
                const surfaceZ = spiralZ * radius;
                
                positions[baseIndex] = surfaceX;
                positions[baseIndex + 1] = surfaceY;
                positions[baseIndex + 2] = surfaceZ;
                
                // Cheerful, whimsical color transitions
                const phase = t + time * 0.3 + arc * 0.15;
                const colorCycle = Math.sin(phase) * 0.5 + 0.5; // Gentler cycling
                const brightness = 0.6 + (Math.sin(t * Math.PI) * 0.3); // Softer brightness variation
                
                // Bright, cheerful Jetsons-style electricity colors
                colors[baseIndex] = brightness * (0.8 + colorCycle * 0.2); // Warm pink/orange
                colors[baseIndex + 1] = brightness * (0.9 + Math.sin(phase * 1.5) * 0.1); // Bright yellow/white
                colors[baseIndex + 2] = brightness * (0.7 + Math.cos(phase * 2) * 0.3); // Soft blue/cyan
            }
        }
        
        // Mark geometry for update
        electricity.geometry.attributes.position.needsUpdate = true;
        electricity.geometry.attributes.color.needsUpdate = true;
        
        // Cheerful, bouncy intensity like Jetsons energy
        const happyBounce = Math.sin(time * 2.5) * 0.15; // Bouncy rhythm
        const playfulFlutter = Math.sin(time * 5.2) * 0.08; // Playful flutter
        electricity.material.uniforms.opacity.value = 0.8 + happyBounce + playfulFlutter;
    }
    
    // Animate hyperspace line streaks
    if (hyperspaceStreaks && hyperspaceStreaks.lines) {
        const time = Date.now() * 0.001;
        
        hyperspaceStreaks.lines.forEach((lineData, index) => {
            const line = lineData.mesh;
            const positions = line.geometry.attributes.position.array;
            const colors = line.geometry.attributes.color.array;
            
            // Move entire line forward
            const moveSpeed = 1.2;
            positions[2] += moveSpeed; // Start point Z
            positions[5] += moveSpeed; // End point Z
            
            // Reset line when it passes convergence point
            if (positions[2] > 8) { // Start point passed through
                // Generate new line starting from far back
                const angle = Math.random() * Math.PI * 2;
                const baseRadius = 8 + Math.random() * 20;
                const baseHeight = (Math.random() - 0.5) * 25;
                const convergenceDistance = 50;
                const lineLength = 8 + Math.random() * 15;
                
                // New start point (far back)
                const startPoint = {
                    x: Math.cos(angle) * baseRadius,
                    y: baseHeight,
                    z: -convergenceDistance
                };
                
                // New end point (converging forward)
                const convergencePoint = { x: 0, y: 0, z: 5 };
                const endProgress = Math.min(1.0, lineLength / convergenceDistance);
                
                const endPoint = {
                    x: startPoint.x + (convergencePoint.x - startPoint.x) * endProgress,
                    y: startPoint.y + (convergencePoint.y - startPoint.y) * endProgress,
                    z: startPoint.z + (convergencePoint.z - startPoint.z) * endProgress
                };
                
                // Update positions
                positions[0] = startPoint.x; positions[1] = startPoint.y; positions[2] = startPoint.z;
                positions[3] = endPoint.x; positions[4] = endPoint.y; positions[5] = endPoint.z;
                
                // Update colors with new intensities
                const backIntensity = 0.2 + Math.random() * 0.2;
                const frontIntensity = 0.8 + Math.random() * 0.2;
                
                // Back point color (dim)
                colors[0] = backIntensity * 0.8;
                colors[1] = backIntensity * 1.0;
                colors[2] = backIntensity * 1.2;
                
                // Front point color (bright)
                colors[3] = frontIntensity * 0.8;
                colors[4] = frontIntensity * 1.0;
                colors[5] = frontIntensity * 1.2;
                
                // Update line width based on perspective
                const newLineWidth = 1 + Math.random() * 4;
                line.material.linewidth = newLineWidth;
            }
            
            // Mark for update
            line.geometry.attributes.position.needsUpdate = true;
            line.geometry.attributes.color.needsUpdate = true;
        });
    }
    
    renderer.render(scene, camera);
}

function setupThreeJSControls() {
    const toggleButton = document.getElementById('toggle-animation');
    const colorButton = document.getElementById('change-color');
    
    toggleButton.addEventListener('click', function() {
        isAnimating = !isAnimating;
        this.textContent = isAnimating ? 'Pause Animation' : 'Start Animation';
        console.log(`Animation ${isAnimating ? 'started' : 'paused'}`);
    });
    
    colorButton.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        thunderbolt.material.color.setHex(colors[currentColorIndex]);
        console.log(`Thunderbolt color changed to: #${colors[currentColorIndex].toString(16)}`);
    });
}

function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800; // Significantly increased for visibility
    
    // Create arrays for star positions and sizes
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);
    const originalColors = new Float32Array(starCount * 3); // Store original colors
    const originalSizes = new Float32Array(starCount); // Store original sizes
    
    // Generate random star positions and sizes
    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y  
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
        
        // Much larger star sizes to compete with hyperspace streaks
        const rand = Math.random();
        if (rand < 0.4) {
            sizes[i] = Math.random() * 1.5 + 1.0; // Medium stars (1.0-2.5)
        } else if (rand < 0.8) {
            sizes[i] = Math.random() * 2.5 + 2.0; // Large stars (2.0-4.5)
        } else {
            sizes[i] = Math.random() * 4.0 + 3.0; // Very large bright stars (3.0-7.0)
        }
        
        // Dreamy, colorful star palette
        const starType = Math.random();
        let r, g, b;
        
        if (starType < 0.2) {
            // Bright coral/pink stars (Jetsons style)
            const intensity = 0.9 + Math.random() * 0.1;
            r = intensity;
            g = intensity * 0.6;
            b = intensity * 0.7;
        } else if (starType < 0.4) {
            // Cheerful yellow/orange stars
            const intensity = 0.8 + Math.random() * 0.2;
            r = intensity;
            g = intensity * 0.9;
            b = intensity * 0.4;
        } else if (starType < 0.6) {
            // Bright cyan/turquoise stars
            const intensity = 0.8 + Math.random() * 0.2;
            r = intensity * 0.4;
            g = intensity;
            b = intensity * 0.9;
        } else if (starType < 0.8) {
            // Soft lavender/purple stars
            const intensity = 0.8 + Math.random() * 0.2;
            r = intensity * 0.9;
            g = intensity * 0.6;
            b = intensity;
        } else {
            // Bright white stars with warm tint
            const intensity = 0.9 + Math.random() * 0.1;
            r = intensity;
            g = intensity * 0.95;
            b = intensity * 0.9;
        }
        
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
        
        // Store original values for animation reference
        originalColors[i * 3] = r;
        originalColors[i * 3 + 1] = g;
        originalColors[i * 3 + 2] = b;
        originalSizes[i] = sizes[i];
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create custom shader material for circular stars
    const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            size: { value: 3.0 } // Dramatically increased base size
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
                
                // Scale point size based on distance (much larger for visibility)
                gl_PointSize = size * (400.0 / -mvPosition.z);
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vSize;
            
            void main() {
                // Calculate distance from center of point
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                
                // Create perfect circle with smooth edges
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                
                // MAXIMUM glow effect for visibility against hyperspace
                float innerGlow = 1.0 - smoothstep(0.0, 0.25, dist);
                float outerGlow = 1.0 - smoothstep(0.0, 0.5, dist);
                float ultraBright = 1.0 - smoothstep(0.0, 0.15, dist);
                
                // MAXIMUM brightness and alpha for visibility
                vec3 finalColor = vColor * (1.2 + innerGlow * 0.8 + ultraBright * 0.5);
                float finalAlpha = alpha * (0.9 + outerGlow * 0.1);
                
                gl_FragColor = vec4(finalColor, finalAlpha);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    // Create star system
    stars = new THREE.Points(starGeometry, starMaterial);
    // Store original data on the stars object for animation
    stars.originalColors = originalColors;
    stars.originalSizes = originalSizes;
    scene.add(stars);
    
    console.log(`Created starfield with ${starCount} stars of varying sizes`);
}

function createElectricity() {
    const electricityGeometry = new THREE.BufferGeometry();
    const arcCount = 15; // Increased from 8 - more electric arcs
    const pointsPerArc = 30; // Increased from 20 - smoother, more points
    const totalPoints = arcCount * pointsPerArc;
    
    const positions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);
    
    // Generate electric arc positions around diamond
    for (let arc = 0; arc < arcCount; arc++) {
        for (let point = 0; point < pointsPerArc; point++) {
            const index = arc * pointsPerArc + point;
            const baseIndex = index * 3;
            
            // Create spiral/helical path around diamond
            const t = point / pointsPerArc; // 0 to 1 along arc
            const angle = (arc / arcCount) * Math.PI * 2; // Angle around diamond
            const spiralAngle = angle + t * Math.PI * 4; // Spiral effect
            
            // Base distance from diamond center (slightly outside diamond surface)
            const baseRadius = 1.8 + Math.sin(t * Math.PI * 3) * 0.3;
            
            // Add much more randomness for chaotic electric effect
            const randomOffset = (Math.random() - 0.5) * 0.6; // Increased from 0.2
            const radius = baseRadius + randomOffset;
            
            // Position around diamond
            positions[baseIndex] = Math.cos(spiralAngle) * radius;
            positions[baseIndex + 1] = (t - 0.5) * 3 + Math.sin(t * Math.PI * 2) * 0.5; // Vertical with waves
            positions[baseIndex + 2] = Math.sin(spiralAngle) * radius;
            
            // Much brighter electric colors with more variation
            const intensity = 0.8 + Math.random() * 0.2;
            colors[baseIndex] = intensity * 0.8; // More red for brighter effect
            colors[baseIndex + 1] = intensity; // Bright green
            colors[baseIndex + 2] = intensity * 1.2; // Very bright blue
        }
    }
    
    electricityGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    electricityGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create electric material with shader
    const electricityMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            opacity: { value: 0.8 } // Refined for elegance
        },
        vertexShader: `
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
                vColor = color;
                
                vec3 pos = position;
                // Subtle, elegant micro-movements for premium feel
                pos.x += sin(time * 8.0 + position.y * 2.0) * 0.05;
                pos.y += cos(time * 6.0 + position.z * 1.5) * 0.04;
                pos.z += cos(time * 7.0 + position.x * 1.8) * 0.05;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                
                // Dynamic point size based on distance for depth
                float distance = length(mvPosition.xyz);
                gl_PointSize = 3.5 + sin(time * 2.0 + distance * 0.1) * 0.5;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            uniform float opacity;
            
            void main() {
                // Sophisticated gradient with soft falloff
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                
                // Multi-layer glow for premium feel
                float outerGlow = 1.0 - smoothstep(0.0, 0.5, dist);
                float innerCore = 1.0 - smoothstep(0.0, 0.2, dist);
                float centerSparkle = 1.0 - smoothstep(0.0, 0.1, dist);
                
                // Elegant layered alpha
                float alpha = outerGlow * 0.6 + innerCore * 0.3 + centerSparkle * 0.1;
                
                // Refined color with subtle warmth
                vec3 finalColor = vColor * (0.8 + innerCore * 0.4) + vec3(centerSparkle * 0.3);
                
                gl_FragColor = vec4(finalColor, alpha * opacity);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    electricity = new THREE.Points(electricityGeometry, electricityMaterial);
    scene.add(electricity);
    
    console.log(`Created electricity effect around thunderbolt with ${arcCount} arcs`);
}

function createHyperspaceStreaks() {
    // Create line-based hyperspace streaks using BufferGeometry for lines
    const streakCount = 150; // Reduced count for performance with lines
    const lines = [];
    
    for (let i = 0; i < streakCount; i++) {
        // Create individual line geometry for each streak
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(6); // 2 points × 3 coordinates = 6
        const lineColors = new Float32Array(6); // 2 points × 3 colors = 6
        
        // Random starting position far back
        const angle = Math.random() * Math.PI * 2;
        const baseRadius = 8 + Math.random() * 20;
        const baseHeight = (Math.random() - 0.5) * 25;
        const convergenceDistance = 50;
        
        // Line start point (far back)
        const startPoint = {
            x: Math.cos(angle) * baseRadius,
            y: baseHeight,
            z: -convergenceDistance
        };
        
        // Line end point (converging forward)
        const convergencePoint = { x: 0, y: 0, z: 5 };
        const lineLength = 8 + Math.random() * 15; // Variable line lengths
        const endProgress = Math.min(1.0, lineLength / convergenceDistance);
        
        const endPoint = {
            x: startPoint.x + (convergencePoint.x - startPoint.x) * endProgress,
            y: startPoint.y + (convergencePoint.y - startPoint.y) * endProgress,
            z: startPoint.z + (convergencePoint.z - startPoint.z) * endProgress
        };
        
        // Set line positions
        linePositions[0] = startPoint.x; linePositions[1] = startPoint.y; linePositions[2] = startPoint.z;
        linePositions[3] = endPoint.x; linePositions[4] = endPoint.y; linePositions[5] = endPoint.z;
        
        // Set colors - dim at back, bright at front
        const backIntensity = 0.2 + Math.random() * 0.2;
        const frontIntensity = 0.8 + Math.random() * 0.2;
        
        // Cheerful Jetsons-style streak colors - back point
        lineColors[0] = backIntensity * 1.0; // Bright coral
        lineColors[1] = backIntensity * 0.8; // Warm yellow
        lineColors[2] = backIntensity * 0.6; // Soft blue
        
        // Cheerful Jetsons-style streak colors - front point (brighter)
        lineColors[3] = frontIntensity * 1.0; // Bright coral
        lineColors[4] = frontIntensity * 0.9; // Bright yellow
        lineColors[5] = frontIntensity * 0.7; // Bright blue
        
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        
        // Create line material with varying width
        const lineWidth = 1 + Math.random() * 4; // Variable line thickness
        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            linewidth: lineWidth
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        lines.push({
            mesh: line,
            baseRadius: baseRadius,
            baseHeight: baseHeight,
            angle: angle,
            lineLength: lineLength
        });
        
        scene.add(line);
    }
    
    // Store lines array for animation
    hyperspaceStreaks = { lines: lines, count: streakCount };
    
    console.log(`Created hyperspace line effect with ${streakCount} speed streaks`);
}

function setupMouseInteraction(container) {
    // Mouse enter - start tracking mouse
    container.addEventListener('mouseenter', function() {
        isMouseOver = true;
        console.log('Mouse entered 3D area - thunderbolt now follows mouse!');
    });
    
    // Mouse leave - return to normal animation
    container.addEventListener('mouseleave', function() {
        isMouseOver = false;
        thunderbolt.position.set(0, 0, 0); // Reset position to center
        console.log('Mouse left 3D area - returning to normal rotation');
    });
    
    // Mouse move - track position and update thunderbolt rotation
    container.addEventListener('mousemove', function(event) {
        if (!isMouseOver) return;
        
        const rect = container.getBoundingClientRect();
        
        // Normalize mouse position to -1 to 1 range
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Convert mouse position to rotation angles (adjusted for thunderbolt)
        targetRotationY = mouseX * Math.PI; // Horizontal mouse movement controls Y rotation
        targetRotationX = mouseY * Math.PI * 0.5; // Vertical mouse movement controls X rotation
    });
}

function onWindowResize() {
    const container = document.getElementById('threejs-container');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

// Room Scene Variables
let roomScene, roomCamera, roomRenderer, roomControls;
let roomLights = [];
let isRoomLightingOn = true;
let textureLoader;
let people = []; // Array to store people for animation

// Initialize 3D Room Scene
function initRoomScene() {
    const container = document.getElementById('room-container');
    
    // Scene setup
    roomScene = new THREE.Scene();
    roomScene.background = new THREE.Color(0xf0f0f0); // Light neutral background
    
    // Camera setup - positioned to view room from front
    roomCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    roomCamera.position.set(5, 3, 8);
    roomCamera.lookAt(0, 1, 0);
    
    // Renderer setup
    roomRenderer = new THREE.WebGLRenderer({ antialias: true });
    roomRenderer.setSize(container.offsetWidth, container.offsetHeight);
    roomRenderer.shadowMap.enabled = true;
    roomRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(roomRenderer.domElement);
    
    // Initialize texture loader
    textureLoader = new THREE.TextureLoader();
    
    // Create procedural textures
    createProceduralTextures();
    
    // Create room structure
    createRoom();
    
    // Add furniture
    addFurniture();
    
    // Add decorations
    addDecorations();
    
    // Set up lighting
    setupRoomLighting();
    
    // Set up camera controls (orbit controls would need to be included)
    setupRoomControls();
    
    // Handle window resize
    window.addEventListener('resize', onRoomWindowResize);
    
    // Start animation loop
    animateRoom();
}

// Global texture variables
let woodGrainTexture, terrazzoTexture, lushWallTexture, cityViewTexture;

function createProceduralTextures() {
    // Create wood grain texture
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 512;
    woodCanvas.height = 512;
    const woodCtx = woodCanvas.getContext('2d');
    
    // Wood grain pattern
    const gradient = woodCtx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#D4B896');
    gradient.addColorStop(0.3, '#C8A882');
    gradient.addColorStop(0.7, '#B8966E');
    gradient.addColorStop(1, '#A6845A');
    
    woodCtx.fillStyle = gradient;
    woodCtx.fillRect(0, 0, 512, 512);
    
    // Add wood grain lines
    woodCtx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
    woodCtx.lineWidth = 2;
    for (let i = 0; i < 30; i++) {
        const y = (i / 30) * 512;
        woodCtx.beginPath();
        woodCtx.moveTo(0, y);
        
        // Create wavy grain lines
        for (let x = 0; x <= 512; x += 10) {
            const waveY = y + Math.sin(x * 0.02 + i * 0.5) * 8;
            woodCtx.lineTo(x, waveY);
        }
        woodCtx.stroke();
    }
    
    // Add some knots and imperfections
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = 10 + Math.random() * 15;
        
        const knotGradient = woodCtx.createRadialGradient(x, y, 0, x, y, radius);
        knotGradient.addColorStop(0, 'rgba(101, 67, 33, 0.6)');
        knotGradient.addColorStop(1, 'rgba(101, 67, 33, 0)');
        
        woodCtx.fillStyle = knotGradient;
        woodCtx.beginPath();
        woodCtx.arc(x, y, radius, 0, Math.PI * 2);
        woodCtx.fill();
    }
    
    woodGrainTexture = new THREE.CanvasTexture(woodCanvas);
    woodGrainTexture.wrapS = THREE.RepeatWrapping;
    woodGrainTexture.wrapT = THREE.RepeatWrapping;
    woodGrainTexture.repeat.set(2, 1);
    
    // Create elegant terrazzo texture
    const terrazzoCanvas = document.createElement('canvas');
    terrazzoCanvas.width = 1024; // Higher resolution for better detail
    terrazzoCanvas.height = 1024;
    const terrazzoCtx = terrazzoCanvas.getContext('2d');
    
    // Elegant base color - warm neutral gray
    const baseGradient = terrazzoCtx.createRadialGradient(512, 512, 0, 512, 512, 512);
    baseGradient.addColorStop(0, '#F8F6F0'); // Warm white center
    baseGradient.addColorStop(1, '#F0EFEB'); // Slightly darker edges
    
    terrazzoCtx.fillStyle = baseGradient;
    terrazzoCtx.fillRect(0, 0, 1024, 1024);
    
    // Sophisticated terrazzo chip colors (authentic marble and stone palette)
    const chipColors = [
        // Natural stones
        { color: '#2F2F2F', weight: 0.15 }, // Charcoal/Black marble
        { color: '#696969', weight: 0.12 }, // Medium gray granite
        { color: '#D3D3D3', weight: 0.18 }, // Light gray marble
        { color: '#F5F5F5', weight: 0.20 }, // White Carrara marble
        { color: '#8B7D6B', weight: 0.10 }, // Warm taupe limestone
        { color: '#B8860B', weight: 0.08 }, // Darker gold veining
        { color: '#CD853F', weight: 0.07 }, // Sandy brown travertine
        { color: '#4F4F4F', weight: 0.10 }, // Dark slate
    ];
    
    // Create weighted chip distribution
    const weightedChips = [];
    chipColors.forEach(chip => {
        const count = Math.floor(chip.weight * 1500); // Total of ~1500 chips
        for (let i = 0; i < count; i++) {
            weightedChips.push(chip.color);
        }
    });
    
    // Add chips in three size categories (like real terrazzo)
    
    // Large accent chips (5-15% of total)
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = 8 + Math.random() * 12; // 8-20 pixels
        const color = weightedChips[Math.floor(Math.random() * weightedChips.length)];
        
        terrazzoCtx.fillStyle = color;
        
        // Create more realistic angular marble chips
        terrazzoCtx.beginPath();
        const sides = 4 + Math.floor(Math.random() * 3); // 4-6 sides for marble-like shapes
        const angleStep = (Math.PI * 2) / sides;
        const baseAngle = Math.random() * Math.PI * 2;
        
        for (let j = 0; j < sides; j++) {
            const angle = j * angleStep + baseAngle;
            const radiusVariation = 0.7 + Math.random() * 0.6;
            const radius = size * radiusVariation;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            if (j === 0) {
                terrazzoCtx.moveTo(px, py);
            } else {
                terrazzoCtx.lineTo(px, py);
            }
        }
        terrazzoCtx.closePath();
        terrazzoCtx.fill();
        
        // Add subtle inner highlight for marble depth
        if (Math.random() > 0.7) {
            terrazzoCtx.fillStyle = color + '40'; // Add transparency
            terrazzoCtx.beginPath();
            terrazzoCtx.arc(x, y, size * 0.3, 0, Math.PI * 2);
            terrazzoCtx.fill();
        }
    }
    
    // Medium chips (main body - 70% of total)
    for (let i = 0; i < 800; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = 3 + Math.random() * 6; // 3-9 pixels
        const color = weightedChips[Math.floor(Math.random() * weightedChips.length)];
        
        terrazzoCtx.fillStyle = color;
        
        // Irregular but more refined shapes
        terrazzoCtx.beginPath();
        const sides = 3 + Math.floor(Math.random() * 4); // 3-6 sides
        const angleStep = (Math.PI * 2) / sides;
        const baseAngle = Math.random() * Math.PI * 2;
        
        for (let j = 0; j < sides; j++) {
            const angle = j * angleStep + baseAngle;
            const radius = size * (0.8 + Math.random() * 0.4);
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            if (j === 0) {
                terrazzoCtx.moveTo(px, py);
            } else {
                terrazzoCtx.lineTo(px, py);
            }
        }
        terrazzoCtx.closePath();
        terrazzoCtx.fill();
    }
    
    // Fine aggregate (small chips - 15-20% of total)
    for (let i = 0; i < 400; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = 1 + Math.random() * 3; // 1-4 pixels
        const color = weightedChips[Math.floor(Math.random() * weightedChips.length)];
        
        terrazzoCtx.fillStyle = color;
        
        // Simple circular or small angular shapes
        if (Math.random() > 0.5) {
            terrazzoCtx.beginPath();
            terrazzoCtx.arc(x, y, size, 0, Math.PI * 2);
            terrazzoCtx.fill();
        } else {
            terrazzoCtx.fillRect(x, y, size, size);
        }
    }
    
    // Add subtle surface variations and polished finish effect
    const surfaceData = terrazzoCtx.getImageData(0, 0, 1024, 1024);
    const pixels = surfaceData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        // Add very subtle color temperature variation
        const warmth = (Math.random() - 0.5) * 3;
        pixels[i] = Math.max(0, Math.min(255, pixels[i] + warmth));     // Red
        pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + warmth * 0.8)); // Green  
        pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + warmth * 0.6)); // Blue
    }
    
    terrazzoCtx.putImageData(surfaceData, 0, 0);
    
    // Add subtle polished surface reflections
    terrazzoCtx.globalAlpha = 0.05;
    terrazzoCtx.fillStyle = '#FFFFFF';
    
    // Simulate polished surface micro-reflections
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = 5 + Math.random() * 15;
        
        terrazzoCtx.beginPath();
        terrazzoCtx.ellipse(x, y, size, size * 0.3, Math.random() * Math.PI, 0, Math.PI * 2);
        terrazzoCtx.fill();
    }
    
    terrazzoCtx.globalAlpha = 1.0;
    
    terrazzoTexture = new THREE.CanvasTexture(terrazzoCanvas);
    terrazzoTexture.wrapS = THREE.RepeatWrapping;
    terrazzoTexture.wrapT = THREE.RepeatWrapping;
    terrazzoTexture.repeat.set(4, 4);
    
    // Create lush botanical wall pattern
    const wallCanvas = document.createElement('canvas');
    wallCanvas.width = 512;
    wallCanvas.height = 512;
    const wallCtx = wallCanvas.getContext('2d');
    
    // Base wall colors - gradient from light green to cream
    const wallGradient = wallCtx.createLinearGradient(0, 0, 512, 512);
    wallGradient.addColorStop(0, '#98C5A3'); // Light green
    wallGradient.addColorStop(0.5, '#A8D5B3'); // Lighter green
    wallGradient.addColorStop(1, '#F0F5DC'); // Cream
    
    wallCtx.fillStyle = wallGradient;
    wallCtx.fillRect(0, 0, 512, 512);
    
    // Add botanical elements - leaves and vines
    const leafColors = [
        'rgba(34, 139, 34, 0.7)',    // Forest green
        'rgba(46, 125, 50, 0.6)',    // Dark green
        'rgba(76, 175, 80, 0.5)',    // Green
        'rgba(102, 187, 106, 0.4)',  // Light green
        'rgba(129, 199, 132, 0.3)',  // Very light green
    ];
    
    // Draw flowing vine patterns
    for (let v = 0; v < 8; v++) {
        const startX = Math.random() * 512;
        const startY = Math.random() * 512;
        
        wallCtx.strokeStyle = 'rgba(46, 125, 50, 0.4)';
        wallCtx.lineWidth = 2 + Math.random() * 3;
        wallCtx.beginPath();
        wallCtx.moveTo(startX, startY);
        
        let currentX = startX;
        let currentY = startY;
        
        // Create flowing vine curves
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 / 20) * i + Math.random() * 0.5;
            const distance = 15 + Math.random() * 25;
            currentX += Math.cos(angle) * distance;
            currentY += Math.sin(angle) * distance;
            
            // Keep within canvas bounds
            currentX = Math.max(0, Math.min(512, currentX));
            currentY = Math.max(0, Math.min(512, currentY));
            
            wallCtx.lineTo(currentX, currentY);
        }
        wallCtx.stroke();
    }
    
    // Add leaves along the vines
    for (let l = 0; l < 150; l++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = 8 + Math.random() * 15;
        const rotation = Math.random() * Math.PI * 2;
        const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        
        wallCtx.save();
        wallCtx.translate(x, y);
        wallCtx.rotate(rotation);
        wallCtx.fillStyle = leafColor;
        
        // Draw leaf shape
        wallCtx.beginPath();
        wallCtx.moveTo(0, -size);
        wallCtx.quadraticCurveTo(size * 0.6, -size * 0.4, size * 0.4, 0);
        wallCtx.quadraticCurveTo(size * 0.6, size * 0.4, 0, size);
        wallCtx.quadraticCurveTo(-size * 0.6, size * 0.4, -size * 0.4, 0);
        wallCtx.quadraticCurveTo(-size * 0.6, -size * 0.4, 0, -size);
        wallCtx.fill();
        
        // Add leaf vein
        wallCtx.strokeStyle = 'rgba(46, 125, 50, 0.6)';
        wallCtx.lineWidth = 1;
        wallCtx.beginPath();
        wallCtx.moveTo(0, -size * 0.8);
        wallCtx.lineTo(0, size * 0.8);
        wallCtx.stroke();
        
        wallCtx.restore();
    }
    
    // Add small flowers
    for (let f = 0; f < 40; f++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const flowerSize = 4 + Math.random() * 6;
        
        const flowerColors = [
            'rgba(255, 182, 193, 0.8)', // Light pink
            'rgba(255, 160, 122, 0.7)', // Light salmon
            'rgba(221, 160, 221, 0.6)', // Plum
            'rgba(255, 255, 255, 0.9)', // White
        ];
        
        const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        
        // Draw simple 5-petal flower
        wallCtx.fillStyle = flowerColor;
        for (let p = 0; p < 5; p++) {
            const angle = (p * Math.PI * 2) / 5;
            const petalX = x + Math.cos(angle) * flowerSize * 0.8;
            const petalY = y + Math.sin(angle) * flowerSize * 0.8;
            
            wallCtx.beginPath();
            wallCtx.arc(petalX, petalY, flowerSize * 0.4, 0, Math.PI * 2);
            wallCtx.fill();
        }
        
        // Flower center
        wallCtx.fillStyle = 'rgba(255, 215, 0, 0.9)'; // Gold
        wallCtx.beginPath();
        wallCtx.arc(x, y, flowerSize * 0.2, 0, Math.PI * 2);
        wallCtx.fill();
    }
    
    // Add subtle damask-like pattern overlay
    wallCtx.globalAlpha = 0.1;
    wallCtx.fillStyle = '#2E7D32';
    
    for (let d = 0; d < 20; d++) {
        const x = (d % 4) * 128 + 64;
        const y = Math.floor(d / 4) * 128 + 64;
        
        // Draw ornamental motif
        wallCtx.beginPath();
        wallCtx.moveTo(x, y - 30);
        wallCtx.quadraticCurveTo(x + 20, y - 20, x + 15, y);
        wallCtx.quadraticCurveTo(x + 20, y + 20, x, y + 30);
        wallCtx.quadraticCurveTo(x - 20, y + 20, x - 15, y);
        wallCtx.quadraticCurveTo(x - 20, y - 20, x, y - 30);
        wallCtx.fill();
    }
    
    wallCtx.globalAlpha = 1.0;
    
    lushWallTexture = new THREE.CanvasTexture(wallCanvas);
    lushWallTexture.wrapS = THREE.RepeatWrapping;
    lushWallTexture.wrapT = THREE.RepeatWrapping;
    lushWallTexture.repeat.set(2, 2);
    
    // Create city skyline view from skyscraper
    const cityCanvas = document.createElement('canvas');
    cityCanvas.width = 1024;
    cityCanvas.height = 512;
    const cityCtx = cityCanvas.getContext('2d');
    
    // Sky gradient - dawn/dusk colors
    const skyGradient = cityCtx.createLinearGradient(0, 0, 0, 512);
    skyGradient.addColorStop(0, '#87CEEB');   // Sky blue
    skyGradient.addColorStop(0.3, '#B0E0E6'); // Powder blue
    skyGradient.addColorStop(0.6, '#FFA07A'); // Light salmon
    skyGradient.addColorStop(0.8, '#FF7F50'); // Coral
    skyGradient.addColorStop(1, '#FF6347');   // Tomato
    
    cityCtx.fillStyle = skyGradient;
    cityCtx.fillRect(0, 0, 1024, 512);
    
    // Add clouds
    cityCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let c = 0; c < 12; c++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 200; // Upper part of sky
        const size = 30 + Math.random() * 40;
        
        // Create fluffy cloud shapes
        for (let i = 0; i < 5; i++) {
            const offsetX = (Math.random() - 0.5) * size;
            const offsetY = (Math.random() - 0.5) * size * 0.5;
            cityCtx.beginPath();
            cityCtx.arc(x + offsetX, y + offsetY, size * (0.3 + Math.random() * 0.4), 0, Math.PI * 2);
            cityCtx.fill();
        }
    }
    
    // Create distant mountain/hill silhouettes
    cityCtx.fillStyle = 'rgba(70, 130, 180, 0.6)'; // Steel blue
    cityCtx.beginPath();
    cityCtx.moveTo(0, 350);
    for (let x = 0; x <= 1024; x += 20) {
        const height = 300 + Math.sin(x * 0.01) * 50 + Math.random() * 30;
        cityCtx.lineTo(x, height);
    }
    cityCtx.lineTo(1024, 512);
    cityCtx.lineTo(0, 512);
    cityCtx.fill();
    
    // Create city skyline with buildings
    const buildingColors = [
        '#2F4F4F', // Dark slate gray
        '#483D8B', // Dark slate blue
        '#696969', // Dim gray
        '#708090', // Slate gray
        '#778899', // Light slate gray
        '#4682B4', // Steel blue
        '#36454F', // Charcoal
    ];
    
    // Generate buildings from back to front (smaller to larger)
    for (let layer = 0; layer < 3; layer++) {
        const depth = layer * 0.3;
        const alpha = 0.4 + layer * 0.3;
        
        for (let b = 0; b < 25 - layer * 5; b++) {
            const x = (b / (25 - layer * 5)) * 1024;
            const width = 30 + Math.random() * 60 - layer * 10;
            const height = 150 + Math.random() * 200 + layer * 50;
            const buildingColor = buildingColors[Math.floor(Math.random() * buildingColors.length)];
            
            // Building silhouette
            cityCtx.fillStyle = buildingColor.replace(')', `, ${alpha})`).replace('#', 'rgba(').replace('2F4F4F', '47, 79, 79').replace('483D8B', '72, 61, 139').replace('696969', '105, 105, 105').replace('708090', '112, 128, 144').replace('778899', '119, 136, 153').replace('4682B4', '70, 130, 180').replace('36454F', '54, 69, 79');
            
            cityCtx.fillRect(x, 512 - height, width, height);
            
            // Add building windows (lit up)
            const windowRows = Math.floor(height / 15);
            const windowCols = Math.floor(width / 12);
            
            for (let row = 0; row < windowRows; row++) {
                for (let col = 0; col < windowCols; col++) {
                    if (Math.random() > 0.6) { // 40% windows are lit
                        const windowX = x + col * 12 + 3;
                        const windowY = 512 - height + row * 15 + 3;
                        const windowColor = Math.random() > 0.8 ? 
                            'rgba(255, 255, 0, 0.9)' :  // Warm office light
                            'rgba(173, 216, 230, 0.8)'; // Cool office light
                        
                        cityCtx.fillStyle = windowColor;
                        cityCtx.fillRect(windowX, windowY, 6, 8);
                    }
                }
            }
        }
    }
    
    // Add some flying objects (helicopters, birds)
    for (let f = 0; f < 5; f++) {
        const x = Math.random() * 1024;
        const y = 100 + Math.random() * 200;
        
        if (Math.random() > 0.6) {
            // Helicopter
            cityCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            cityCtx.fillRect(x, y, 20, 6);
            cityCtx.fillRect(x + 6, y - 3, 8, 3);
            
            // Rotor blur
            cityCtx.fillStyle = 'rgba(200, 200, 200, 0.3)';
            cityCtx.fillRect(x - 5, y - 8, 30, 2);
        } else {
            // Birds
            cityCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
            cityCtx.lineWidth = 2;
            cityCtx.beginPath();
            cityCtx.arc(x, y, 3, Math.PI, 0);
            cityCtx.arc(x + 6, y, 3, Math.PI, 0);
            cityCtx.stroke();
        }
    }
    
    // Add atmospheric haze/fog in the distance
    const hazeGradient = cityCtx.createLinearGradient(0, 300, 0, 512);
    hazeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    hazeGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
    cityCtx.fillStyle = hazeGradient;
    cityCtx.fillRect(0, 300, 1024, 212);
    
    cityViewTexture = new THREE.CanvasTexture(cityCanvas);
    cityViewTexture.wrapS = THREE.ClampToEdgeWrapping;
    cityViewTexture.wrapT = THREE.ClampToEdgeWrapping;
}

function createRoom() {
    // Room dimensions
    const roomWidth = 8;
    const roomHeight = 6;
    const roomDepth = 8;
    
    // Elegant terrazzo floor with polished finish
    const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floorMaterial = new THREE.MeshPhongMaterial({ 
        map: terrazzoTexture,
        side: THREE.DoubleSide,
        shininess: 80,           // High polish finish
        reflectivity: 0.3,       // Subtle reflections
        transparent: false,
        opacity: 1.0,
        specular: 0x444444      // Controlled specular highlights
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomScene.add(floor);
    
    // Back wall - floor-to-ceiling window with city view
    const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const backWallMaterial = new THREE.MeshLambertMaterial({ 
        map: cityViewTexture,
        transparent: true,
        opacity: 0.95
    });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, roomHeight / 2, -roomDepth / 2 + 0.01);
    roomScene.add(backWall);
    
    // Left wall - floor-to-ceiling window with city view
    const leftWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const leftWallMaterial = new THREE.MeshLambertMaterial({ 
        map: cityViewTexture.clone(),
        transparent: true,
        opacity: 0.95
    });
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.position.set(-roomWidth / 2 + 0.01, roomHeight / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    roomScene.add(leftWall);
    
    // Right wall - floor-to-ceiling window with city view
    const rightWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const rightWallMaterial = new THREE.MeshLambertMaterial({ 
        map: cityViewTexture.clone(),
        transparent: true,
        opacity: 0.95
    });
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.position.set(roomWidth / 2 - 0.01, roomHeight / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    roomScene.add(rightWall);
    
    // Add window frames for back wall
    addWindowFrames(0, roomHeight / 2, -roomDepth / 2, roomWidth, roomHeight, 'back');
    
    // Add window frames for left wall  
    addWindowFrames(-roomWidth / 2, roomHeight / 2, 0, roomDepth, roomHeight, 'left');
    
    // Add window frames for right wall
    addWindowFrames(roomWidth / 2, roomHeight / 2, 0, roomDepth, roomHeight, 'right');
    
    // Modern ceiling with mid-century style
    const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const ceilingMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xF5F5F5, // Light gray/white modern ceiling
        side: THREE.DoubleSide
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.y = roomHeight;
    ceiling.rotation.x = Math.PI / 2;
    ceiling.receiveShadow = true;
    roomScene.add(ceiling);
    
    // Add mid-century modern lighting
    addMidCenturyLighting();
    
    // Add people and open bar for corporate event atmosphere
    addPeopleAndBar();
}

function addWindowFrames(centerX, centerY, centerZ, width, height, orientation) {
    const frameThickness = 0.05;
    const frameDepth = 0.1;
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x2F2F2F }); // Dark gray frames
    
    // Horizontal frames (top and bottom)
    for (let i = 0; i < 2; i++) {
        const frameGeometry = new THREE.BoxGeometry(width + frameThickness, frameThickness, frameDepth);
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        
        const yOffset = i === 0 ? height / 2 : -height / 2;
        
        if (orientation === 'back') {
            frame.position.set(centerX, centerY + yOffset, centerZ);
        } else if (orientation === 'left') {
            frame.position.set(centerX, centerY + yOffset, centerZ);
            frame.rotation.y = Math.PI / 2;
        } else if (orientation === 'right') {
            frame.position.set(centerX, centerY + yOffset, centerZ);
            frame.rotation.y = -Math.PI / 2;
        }
        
        frame.castShadow = true;
        roomScene.add(frame);
    }
    
    // Vertical frames (left and right)
    for (let i = 0; i < 2; i++) {
        const frameGeometry = new THREE.BoxGeometry(frameThickness, height + frameThickness, frameDepth);
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        
        const xOffset = i === 0 ? -width / 2 : width / 2;
        
        if (orientation === 'back') {
            frame.position.set(centerX + xOffset, centerY, centerZ);
        } else if (orientation === 'left') {
            frame.position.set(centerX, centerY, centerZ + xOffset);
            frame.rotation.y = Math.PI / 2;
        } else if (orientation === 'right') {
            frame.position.set(centerX, centerY, centerZ - xOffset);
            frame.rotation.y = -Math.PI / 2;
        }
        
        frame.castShadow = true;
        roomScene.add(frame);
    }
    
    // Cross mullions for large windows (divide into 4 panes)
    if (width > 4) {
        // Vertical mullion
        const vMullionGeometry = new THREE.BoxGeometry(frameThickness * 0.7, height, frameDepth);
        const vMullion = new THREE.Mesh(vMullionGeometry, frameMaterial);
        
        if (orientation === 'back') {
            vMullion.position.set(centerX, centerY, centerZ);
        } else if (orientation === 'left') {
            vMullion.position.set(centerX, centerY, centerZ);
            vMullion.rotation.y = Math.PI / 2;
        } else if (orientation === 'right') {
            vMullion.position.set(centerX, centerY, centerZ);
            vMullion.rotation.y = -Math.PI / 2;
        }
        
        vMullion.castShadow = true;
        roomScene.add(vMullion);
    }
    
    if (height > 4) {
        // Horizontal mullion
        const hMullionGeometry = new THREE.BoxGeometry(width, frameThickness * 0.7, frameDepth);
        const hMullion = new THREE.Mesh(hMullionGeometry, frameMaterial);
        
        if (orientation === 'back') {
            hMullion.position.set(centerX, centerY, centerZ);
        } else if (orientation === 'left') {
            hMullion.position.set(centerX, centerY, centerZ);
            hMullion.rotation.y = Math.PI / 2;
        } else if (orientation === 'right') {
            hMullion.position.set(centerX, centerY, centerZ);
            hMullion.rotation.y = -Math.PI / 2;
        }
        
        hMullion.castShadow = true;
        roomScene.add(hMullion);
    }
}

function addMidCenturyLighting() {
    const roomWidth = 8;
    const roomHeight = 6;
    const roomDepth = 8;
    
    // Add recessed ceiling lights (modern track lighting system)
    const trackMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 }); // Dark metal
    const lightMaterial = new THREE.MeshLambertMaterial({ color: 0xE5E5E5 }); // Light metal
    
    // Main ceiling track
    const trackGeometry = new THREE.BoxGeometry(roomWidth - 2, 0.05, 0.2);
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.position.set(0, roomHeight - 0.1, 0);
    track.castShadow = true;
    roomScene.add(track);
    
    // Track lights (4 adjustable spots)
    for (let i = 0; i < 4; i++) {
        const x = -3 + i * 2; // Evenly spaced along track
        
        // Light housing
        const housingGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.2);
        const housing = new THREE.Mesh(housingGeometry, lightMaterial);
        housing.position.set(x, roomHeight - 0.2, 0);
        housing.castShadow = true;
        roomScene.add(housing);
        
        // Light lens/front
        const lensGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.02);
        const lensMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFFACD, // Light cream color
            emissive: 0x332211 // Subtle warm glow
        });
        const lens = new THREE.Mesh(lensGeometry, lensMaterial);
        lens.position.set(x, roomHeight - 0.31, 0);
        roomScene.add(lens);
    }
    
    // Mid-century pendant lights over desk area
    const pendantPositions = [
        { x: -1, z: -1.5 }, // Above desk
        { x: 1.5, z: 0 },   // Corner accent
        { x: -2, z: 1.5 }   // Reading area
    ];
    
    pendantPositions.forEach((pos, index) => {
        // Pendant cord/cable
        const cordGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1.5 + index * 0.3);
        const cordMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
        const cord = new THREE.Mesh(cordGeometry, cordMaterial);
        cord.position.set(pos.x, roomHeight - (0.75 + index * 0.15), pos.z);
        roomScene.add(cord);
        
        // Ceiling mount
        const mountGeometry = new THREE.CylinderGeometry(0.05, 0.03, 0.1);
        const mountMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const mount = new THREE.Mesh(mountGeometry, mountMaterial);
        mount.position.set(pos.x, roomHeight - 0.05, pos.z);
        mount.castShadow = true;
        roomScene.add(mount);
        
        // Mid-century shade design variations
        let shade, shadeMaterial;
        
        if (index === 0) {
            // Dome shade (classic mid-century)
            const shadeGeometry = new THREE.SphereGeometry(0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
            shadeMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xF4A460, // Sandy brown
                side: THREE.DoubleSide
            });
            shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
            shade.position.set(pos.x, roomHeight - 1.5, pos.z);
        } else if (index === 1) {
            // Cone shade (Scandinavian style)
            const shadeGeometry = new THREE.ConeGeometry(0.25, 0.4, 12);
            shadeMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xE6E6FA, // Lavender
                side: THREE.DoubleSide
            });
            shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
            shade.position.set(pos.x, roomHeight - 1.65, pos.z);
        } else {
            // Cylinder shade (George Nelson bubble style)
            const shadeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.35);
            shadeMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xFFF8DC, // Cornsilk
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
            shade.position.set(pos.x, roomHeight - 1.8, pos.z);
        }
        
        shade.castShadow = true;
        shade.receiveShadow = true;
        roomScene.add(shade);
        
        // Light source inside shade
        const bulbGeometry = new THREE.SphereGeometry(0.04, 8, 8);
        const bulbMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFFAF0,
            emissive: 0x221100
        });
        const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
        bulb.position.set(pos.x, shade.position.y, pos.z);
        roomScene.add(bulb);
    });
    
    // Add decorative ceiling coffers (mid-century architectural detail)
    const cofferMaterial = new THREE.MeshLambertMaterial({ color: 0xE8E8E8 }); // Slightly darker than ceiling
    
    // Create 4 rectangular coffers
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const x = -2 + i * 4;
            const z = -2 + j * 4;
            
            // Coffer frame (raised border)
            const frameGeometry = new THREE.BoxGeometry(3, 0.05, 3);
            const frame = new THREE.Mesh(frameGeometry, cofferMaterial);
            frame.position.set(x, roomHeight - 0.02, z);
            roomScene.add(frame);
            
            // Coffer inset (recessed center)
            const insetGeometry = new THREE.BoxGeometry(2.5, 0.08, 2.5);
            const insetMaterial = new THREE.MeshLambertMaterial({ color: 0xDCDCDC }); // Even lighter
            const inset = new THREE.Mesh(insetGeometry, insetMaterial);
            inset.position.set(x, roomHeight - 0.06, z);
            inset.receiveShadow = true;
            roomScene.add(inset);
        }
    }
    
    // Add a statement mid-century ceiling medallion/rosette in center
    const medallionGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05);
    const medallionMaterial = new THREE.MeshLambertMaterial({ color: 0xD3D3D3 });
    const medallion = new THREE.Mesh(medallionGeometry, medallionMaterial);
    medallion.position.set(0, roomHeight - 0.025, 0);
    medallion.castShadow = true;
    roomScene.add(medallion);
    
    // Medallion decorative rings
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.1 + i * 0.08, 0.01, 8, 16);
        const ringMaterial = new THREE.MeshLambertMaterial({ color: 0xC0C0C0 });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0, roomHeight - 0.02, 0);
        ring.rotation.x = Math.PI / 2;
        roomScene.add(ring);
    }
}

function addPeopleAndBar() {
    // Add an elegant open bar setup
    createOpenBar();
    
    // Add people in conversation groups
    createPeopleGroups();
}

function createOpenBar() {
    const barMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2F1B14, // Rich dark wood
        shininess: 60,
        reflectivity: 0.4
    });
    
    const marbleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xF5F5F5, // White marble top
        shininess: 100,
        reflectivity: 0.6
    });
    
    // Main bar counter (along right wall)
    const barGeometry = new THREE.BoxGeometry(0.8, 1.0, 4.0);
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(3.2, 0.5, 0);
    bar.castShadow = true;
    roomScene.add(bar);
    
    // Marble bar top
    const barTopGeometry = new THREE.BoxGeometry(0.9, 0.05, 4.1);
    const barTop = new THREE.Mesh(barTopGeometry, marbleMaterial);
    barTop.position.set(3.2, 1.03, 0);
    barTop.castShadow = true;
    roomScene.add(barTop);
    
    // Bar back shelving
    const shelfMaterial = new THREE.MeshLambertMaterial({ color: 0x3F2F1F });
    
    for (let i = 0; i < 3; i++) {
        const shelfGeometry = new THREE.BoxGeometry(0.3, 0.03, 3.8);
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf.position.set(3.8, 1.5 + i * 0.4, 0);
        shelf.castShadow = true;
        roomScene.add(shelf);
    }
    
    // Add bottles and glasses
    addBarAccessories();
}

function addBarAccessories() {
    const bottlePositions = [
        { x: 3.8, z: -1.5 }, { x: 3.8, z: -1.0 }, { x: 3.8, z: -0.5 },
        { x: 3.8, z: 0.5 }, { x: 3.8, z: 1.0 }, { x: 3.8, z: 1.5 }
    ];
    
    bottlePositions.forEach((pos, index) => {
        // Bottle variations
        const height = 0.3 + Math.random() * 0.2;
        const bottleColors = [0x2D5016, 0x654321, 0x8B4513, 0x4B0000, 0x008B8B];
        const color = bottleColors[index % bottleColors.length];
        
        const bottleGeometry = new THREE.CylinderGeometry(0.03, 0.04, height);
        const bottleMaterial = new THREE.MeshPhongMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.8,
            shininess: 80
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.position.set(pos.x, 1.5 + height/2 + Math.floor(index/3) * 0.4, pos.z);
        bottle.castShadow = true;
        roomScene.add(bottle);
        
        // Bottle caps/corks
        const capGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.02);
        const capMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.set(pos.x, bottle.position.y + height/2 + 0.01, pos.z);
        roomScene.add(cap);
    });
    
    // Wine glasses on bar top
    const glassPositions = [
        { x: 3.2, z: -0.8 }, { x: 3.2, z: 0.8 }
    ];
    
    glassPositions.forEach(pos => {
        // Wine glass stem
        const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15);
        const stemMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.set(pos.x, 1.1, pos.z);
        roomScene.add(stem);
        
        // Wine glass bowl
        const bowlGeometry = new THREE.SphereGeometry(0.04, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.6);
        const bowl = new THREE.Mesh(bowlGeometry, stemMaterial);
        bowl.position.set(pos.x, 1.18, pos.z);
        roomScene.add(bowl);
    });
}

function createPeopleGroups() {
    // Group 1: Two people by the windows (back wall)
    createPerson(-2, 0, -3, 'standing', 0x1f4e79); // Navy suit
    createPerson(-1, 0, -3.2, 'standing', 0x8b4513); // Brown dress
    
    // Group 2: Three people near the bar
    createPerson(2, 0, -0.5, 'standing', 0x2f2f2f); // Charcoal suit
    createPerson(1.5, 0, 0.2, 'standing', 0x800080); // Purple dress
    createPerson(2.2, 0, 0.8, 'standing', 0x4682b4); // Steel blue suit
    
    // Group 3: Two people near the desk area
    createPerson(-0.5, 0, 0.5, 'standing', 0x654321); // Brown suit
    createPerson(0.2, 0, 0.8, 'standing', 0x8b0000); // Maroon dress
    
    // Group 4: Person at the bar
    createPerson(2.8, 0, 1.2, 'standing', 0x483d8b); // Dark slate blue
}

function createPerson(x, y, z, pose, clothingColor) {
    const personGroup = new THREE.Group();
    
    // Body proportions
    const bodyHeight = 0.4;
    const bodyWidth = 0.15;
    const headRadius = 0.08;
    const legHeight = 0.5;
    
    // Movement properties
    const movementData = {
        group: personGroup,
        targetX: x,
        targetZ: z,
        currentX: x,
        currentZ: z,
        speed: 0.003 + Math.random() * 0.002, // Random walking speed
        pauseTime: 0,
        maxPauseTime: 200 + Math.random() * 300, // Random pause duration
        isMoving: false,
        conversationPartner: null,
        lastDirectionChange: 0,
        personalityType: Math.random() > 0.5 ? 'social' : 'observer' // Social vs observer behavior
    };
    
    // Head
    const headGeometry = new THREE.SphereGeometry(headRadius, 8, 8);
    const skinMaterial = new THREE.MeshLambertMaterial({ color: 0xfdbcb4 }); // Skin tone
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.set(0, bodyHeight + legHeight + headRadius, 0);
    head.castShadow = true;
    personGroup.add(head);
    
    // Hair
    const hairGeometry = new THREE.SphereGeometry(headRadius * 1.1, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const hairColors = [0x8B4513, 0x654321, 0x2F1B14, 0xFFD700, 0x696969];
    const hairMaterial = new THREE.MeshLambertMaterial({ 
        color: hairColors[Math.floor(Math.random() * hairColors.length)]
    });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.set(0, bodyHeight + legHeight + headRadius + 0.02, 0);
    hair.castShadow = true;
    personGroup.add(hair);
    
    // Body (torso)
    const bodyGeometry = new THREE.CylinderGeometry(bodyWidth, bodyWidth * 1.2, bodyHeight);
    const clothingMaterial = new THREE.MeshLambertMaterial({ color: clothingColor });
    const body = new THREE.Mesh(bodyGeometry, clothingMaterial);
    body.position.set(0, legHeight + bodyHeight/2, 0);
    body.castShadow = true;
    personGroup.add(body);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.025, 0.03, 0.3);
    
    // Left arm
    const leftArm = new THREE.Mesh(armGeometry, clothingMaterial);
    const leftArmAngle = Math.PI / 8 + (Math.random() - 0.5) * Math.PI / 6; // Natural variation
    leftArm.position.set(-bodyWidth - 0.05, legHeight + bodyHeight - 0.1, 0);
    leftArm.rotation.z = leftArmAngle;
    leftArm.castShadow = true;
    personGroup.add(leftArm);
    
    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, clothingMaterial);
    const rightArmAngle = -Math.PI / 8 + (Math.random() - 0.5) * Math.PI / 6; // Natural variation
    rightArm.position.set(bodyWidth + 0.05, legHeight + bodyHeight - 0.1, 0);
    rightArm.rotation.z = rightArmAngle;
    rightArm.castShadow = true;
    personGroup.add(rightArm);
    
    // Hands
    const handGeometry = new THREE.SphereGeometry(0.025, 6, 6);
    
    const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
    leftHand.position.set(-bodyWidth - 0.08, legHeight + bodyHeight - 0.25, 0);
    leftHand.castShadow = true;
    personGroup.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
    rightHand.position.set(bodyWidth + 0.08, legHeight + bodyHeight - 0.25, 0);
    rightHand.castShadow = true;
    personGroup.add(rightHand);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.04, 0.05, legHeight);
    const pantsMaterial = new THREE.MeshLambertMaterial({ 
        color: Math.floor(clothingColor * 0.7) // Darker shade for pants/skirt
    });
    
    // Left leg
    const leftLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    leftLeg.position.set(-bodyWidth/2, legHeight/2, 0);
    leftLeg.castShadow = true;
    personGroup.add(leftLeg);
    
    // Right leg  
    const rightLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    rightLeg.position.set(bodyWidth/2, legHeight/2, 0);
    rightLeg.castShadow = true;
    personGroup.add(rightLeg);
    
    // Shoes
    const shoeGeometry = new THREE.BoxGeometry(0.08, 0.03, 0.12);
    const shoeMaterial = new THREE.MeshLambertMaterial({ color: 0x2F1B14 }); // Dark brown/black
    
    const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    leftShoe.position.set(-bodyWidth/2, 0.015, 0.02);
    leftShoe.castShadow = true;
    personGroup.add(leftShoe);
    
    const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    rightShoe.position.set(bodyWidth/2, 0.015, 0.02);
    rightShoe.castShadow = true;
    personGroup.add(rightShoe);
    
    // Add some randomness to pose
    personGroup.rotation.y = (Math.random() - 0.5) * Math.PI / 3; // Random facing direction
    personGroup.position.set(x, y, z);
    
    roomScene.add(personGroup);
    
    // Store person data for animation
    people.push(movementData);
}

function addFurniture() {
    // Curved desk with wood grain texture
    const deskGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
    const deskMaterial = new THREE.MeshLambertMaterial({ 
        map: woodGrainTexture,
        color: 0xFFFFFF // White tint to let texture show through naturally
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.set(-1, 0.75, -2);
    desk.castShadow = true;
    roomScene.add(desk);
    
    // Desk legs with wood grain
    for (let i = 0; i < 4; i++) {
        const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.7);
        const legMaterial = new THREE.MeshLambertMaterial({ 
            map: woodGrainTexture.clone(),
            color: 0xFFFFFF
        });
        legMaterial.map.repeat.set(0.5, 2); // Scale texture for cylindrical legs
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        const x = i < 2 ? -2.3 : 0.3;
        const z = i % 2 === 0 ? -2.6 : -1.4;
        leg.position.set(x, 0.35, z);
        leg.castShadow = true;
        roomScene.add(leg);
    }
    
    // Small desk drawers
    for (let i = 0; i < 3; i++) {
        const drawerGeometry = new THREE.BoxGeometry(0.4, 0.15, 0.03);
        const drawerMaterial = new THREE.MeshLambertMaterial({ color: 0xD2B48C });
        const drawer = new THREE.Mesh(drawerGeometry, drawerMaterial);
        drawer.position.set(-1.8 + i * 0.5, 0.6, -1.3);
        drawer.castShadow = true;
        roomScene.add(drawer);
        
        // Drawer handle
        const handleGeometry = new THREE.SphereGeometry(0.02);
        const handleMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(-1.8 + i * 0.5, 0.6, -1.25);
        roomScene.add(handle);
    }
    
    // Simple stool with wood grain
    const stoolSeatGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05);
    const stoolSeatMaterial = new THREE.MeshLambertMaterial({ 
        map: woodGrainTexture.clone(),
        color: 0xFFFFFF
    });
    stoolSeatMaterial.map.repeat.set(1, 1);
    const stoolSeat = new THREE.Mesh(stoolSeatGeometry, stoolSeatMaterial);
    stoolSeat.position.set(-1, 0.6, -1);
    stoolSeat.castShadow = true;
    roomScene.add(stoolSeat);
    
    // Stool legs
    for (let i = 0; i < 4; i++) {
        const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        const angle = (i * Math.PI) / 2;
        leg.position.set(
            -1 + Math.cos(angle) * 0.25,
            0.3,
            -1 + Math.sin(angle) * 0.25
        );
        leg.castShadow = true;
        roomScene.add(leg);
    }
    
    // Monitor on desk
    const monitorGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
    const monitorMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.position.set(-1, 1.1, -2.3);
    monitor.castShadow = true;
    roomScene.add(monitor);
    
    // Monitor screen
    const screenGeometry = new THREE.PlaneGeometry(0.7, 0.4);
    const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x4A90E2 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(-1, 1.1, -2.25);
    roomScene.add(screen);
    
    // Monitor stand
    const standGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.2);
    const standMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(-1, 0.9, -2.2);
    stand.castShadow = true;
    roomScene.add(stand);
}

function addDecorations() {
    // Wall shelves on right wall
    for (let i = 0; i < 3; i++) {
        const shelfGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.3);
        const shelfMaterial = new THREE.MeshLambertMaterial({ color: 0xDEB887 });
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf.position.set(3.7, 2 + i * 0.8, -1);
        shelf.castShadow = true;
        roomScene.add(shelf);
        
        // Books on shelves
        for (let j = 0; j < 3; j++) {
            const bookColors = [0xFFD700, 0xFF6347, 0x8B4513, 0x32CD32];
            const bookGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.2);
            const bookMaterial = new THREE.MeshLambertMaterial({ 
                color: bookColors[Math.floor(Math.random() * bookColors.length)]
            });
            const book = new THREE.Mesh(bookGeometry, bookMaterial);
            book.position.set(3.6 + j * 0.07, 2.15 + i * 0.8, -1);
            book.castShadow = true;
            roomScene.add(book);
        }
    }
    
    // Small plant
    const potGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.2);
    const potMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(0.5, 0.9, -2.2);
    pot.castShadow = true;
    roomScene.add(pot);
    
    const plantGeometry = new THREE.SphereGeometry(0.2);
    const plantMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const plant = new THREE.Mesh(plantGeometry, plantMaterial);
    plant.position.set(0.5, 1.2, -2.2);
    plant.castShadow = true;
    roomScene.add(plant);
    
    // Camera on tripod
    const cameraBodyGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.15);
    const cameraBodyMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const cameraBody = new THREE.Mesh(cameraBodyGeometry, cameraBodyMaterial);
    cameraBody.position.set(2, 1.5, 1);
    cameraBody.castShadow = true;
    roomScene.add(cameraBody);
    
    // Tripod legs
    for (let i = 0; i < 3; i++) {
        const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.4);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        const angle = (i * 2 * Math.PI) / 3;
        leg.position.set(
            2 + Math.cos(angle) * 0.5,
            0.7,
            1 + Math.sin(angle) * 0.5
        );
        leg.rotation.z = Math.cos(angle) * 0.2;
        leg.rotation.x = Math.sin(angle) * 0.2;
        leg.castShadow = true;
        roomScene.add(leg);
    }
    
    // Picture frames on walls
    const frameGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.02);
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    
    // Frame 1
    const frame1 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame1.position.set(-2, 3, -3.98);
    roomScene.add(frame1);
    
    // Frame 2
    const frame2 = new THREE.Mesh(frameGeometry, frameMaterial);
    frame2.position.set(1, 2.5, -3.98);
    roomScene.add(frame2);
}

function setupRoomLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    roomScene.add(ambientLight);
    roomLights.push(ambientLight);
    
    // Main ceiling light
    const mainLight = new THREE.PointLight(0xffffff, 0.8, 20);
    mainLight.position.set(0, 5, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    roomScene.add(mainLight);
    roomLights.push(mainLight);
    
    // Warm desk lamp effect
    const deskLight = new THREE.PointLight(0xFFE135, 0.6, 5);
    deskLight.position.set(-1, 1.5, -2);
    roomScene.add(deskLight);
    roomLights.push(deskLight);
    
    // Window light simulation
    const windowLight = new THREE.DirectionalLight(0xFFE4B5, 0.3);
    windowLight.position.set(8, 4, 2);
    windowLight.target.position.set(0, 0, 0);
    roomScene.add(windowLight);
    roomScene.add(windowLight.target);
    roomLights.push(windowLight);
}

function setupRoomControls() {
    const container = document.getElementById('room-container');
    
    // Simple mouse controls for camera rotation and zoom
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let cameraRadius = 10; // Starting zoom distance
    
    container.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    container.addEventListener('mousemove', (event) => {
        if (!isMouseDown) return;
        
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        targetX += deltaX * 0.01;
        targetY += deltaY * 0.01;
        
        // Limit vertical rotation
        targetY = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetY));
        
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    // Add zoom functionality with mouse wheel
    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        
        // Zoom in/out based on wheel direction
        const zoomSpeed = 0.5;
        const minRadius = 3;  // Closest zoom (inside room)
        const maxRadius = 20; // Farthest zoom (overview)
        
        if (event.deltaY > 0) {
            // Zoom out
            cameraRadius = Math.min(maxRadius, cameraRadius + zoomSpeed);
        } else {
            // Zoom in
            cameraRadius = Math.max(minRadius, cameraRadius - zoomSpeed);
        }
    });
    
    // Apply smooth camera rotation and zoom
    function updateCameraRotation() {
        roomCamera.position.x = Math.cos(targetX) * cameraRadius;
        roomCamera.position.z = Math.sin(targetX) * cameraRadius;
        roomCamera.position.y = 3 + Math.sin(targetY) * 2;
        roomCamera.lookAt(0, 1.5, 0);
    }
    
    // Room control buttons
    const zoomInButton = document.getElementById('zoom-in-room');
    const zoomOutButton = document.getElementById('zoom-out-room');
    const lightingButton = document.getElementById('toggle-room-lighting');
    const resetButton = document.getElementById('reset-room-camera');
    
    // Zoom button controls
    zoomInButton.addEventListener('click', () => {
        const minRadius = 3;
        const zoomSpeed = 1; // Larger steps for button clicks
        cameraRadius = Math.max(minRadius, cameraRadius - zoomSpeed);
    });
    
    zoomOutButton.addEventListener('click', () => {
        const maxRadius = 20;
        const zoomSpeed = 1; // Larger steps for button clicks
        cameraRadius = Math.min(maxRadius, cameraRadius + zoomSpeed);
    });
    
    lightingButton.addEventListener('click', () => {
        isRoomLightingOn = !isRoomLightingOn;
        roomLights.forEach(light => {
            light.intensity = isRoomLightingOn ? light.userData.originalIntensity || light.intensity : 0.1;
        });
        lightingButton.textContent = isRoomLightingOn ? 'Turn Off Lights' : 'Turn On Lights';
    });
    
    // Store original intensities
    roomLights.forEach(light => {
        light.userData.originalIntensity = light.intensity;
    });
    
    resetButton.addEventListener('click', () => {
        targetX = 0;
        targetY = 0;
        cameraRadius = 10; // Reset zoom to default
        updateCameraRotation();
    });
    
    // Store update function for animation loop
    window.updateRoomCameraRotation = updateCameraRotation;
}

function animateRoom() {
    requestAnimationFrame(animateRoom);
    
    // Update camera if control function exists
    if (window.updateRoomCameraRotation) {
        window.updateRoomCameraRotation();
    }
    
    // Animate people movement
    animatePeople();
    
    // Render the room scene
    roomRenderer.render(roomScene, roomCamera);
}

function animatePeople() {
    const time = Date.now();
    
    people.forEach((person, index) => {
        // Check if person should start moving
        if (!person.isMoving) {
            person.pauseTime++;
            
            if (person.pauseTime >= person.maxPauseTime) {
                // Choose new destination
                chooseNewDestination(person, index);
                person.isMoving = true;
                person.pauseTime = 0;
                person.maxPauseTime = 100 + Math.random() * 400; // New random pause time
            }
        } else {
            // Move towards target
            const deltaX = person.targetX - person.currentX;
            const deltaZ = person.targetZ - person.currentZ;
            const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
            
            if (distance > 0.05) { // Still moving
                // Normalize direction and apply speed
                const dirX = (deltaX / distance) * person.speed;
                const dirZ = (deltaZ / distance) * person.speed;
                
                // Check collision before moving
                const nextX = person.currentX + dirX;
                const nextZ = person.currentZ + dirZ;
                
                if (!isNearFurniture(nextX, nextZ) && !willCollideWithOtherPerson(nextX, nextZ, index)) {
                    // Safe to move
                    person.currentX = nextX;
                    person.currentZ = nextZ;
                    
                    // Update 3D position
                    person.group.position.set(person.currentX, 0, person.currentZ);
                    
                    // Rotate to face movement direction
                    const angle = Math.atan2(deltaZ, deltaX);
                    person.group.rotation.y = angle + Math.PI / 2; // Adjust for model orientation
                    
                    // Add subtle walking animation
                    const walkCycle = Math.sin(time * 0.01) * 0.02;
                    person.group.position.y = walkCycle;
                } else {
                    // Collision detected - choose new path or wait
                    if (Math.random() > 0.7) {
                        // Choose new destination to avoid obstacle
                        chooseNewDestination(person, index);
                    } else {
                        // Wait and try again
                        person.isMoving = false;
                        person.maxPauseTime = 50 + Math.random() * 100; // Short pause
                    }
                }
                
            } else {
                // Reached destination
                person.isMoving = false;
                person.currentX = person.targetX;
                person.currentZ = person.targetZ;
                person.group.position.set(person.currentX, 0, person.currentZ);
                
                // Face a random direction when stopped
                person.group.rotation.y = (Math.random() - 0.5) * Math.PI;
            }
        }
        
        // Check for social interactions
        if (!person.isMoving && person.personalityType === 'social') {
            findConversationPartner(person, index);
        }
    });
}

function chooseNewDestination(person, index) {
    const roomBounds = { minX: -3.5, maxX: 2.5, minZ: -3.5, maxZ: 2.5 };
    let newX, newZ;
    let attempts = 0;
    
    if (person.personalityType === 'social') {
        // Social people tend to move toward others or social areas
        if (Math.random() > 0.4) {
            // Move toward bar area
            newX = 2.0 + Math.random() * 0.8;
            newZ = -1.5 + Math.random() * 3.0;
        } else {
            // Move toward windows for conversation
            newX = -3.0 + Math.random() * 2.0;
            newZ = -3.0 + Math.random() * 1.0;
        }
    } else {
        // Observer types move more randomly, avoiding crowds
        if (Math.random() > 0.6) {
            // Move toward windows (quieter area)
            newX = -2.5 + Math.random() * 1.0;
            newZ = -3.5 + Math.random() * 1.5;
        } else {
            // Random movement in open areas
            newX = -1.5 + Math.random() * 2.5;
            newZ = -1.0 + Math.random() * 2.0;
        }
    }
    
    // Ensure destination is within room bounds
    newX = Math.max(roomBounds.minX, Math.min(roomBounds.maxX, newX));
    newZ = Math.max(roomBounds.minZ, Math.min(roomBounds.maxZ, newZ));
    
    // Check if destination is too close to furniture
    if (isNearFurniture(newX, newZ)) {
        // Try alternative locations
        if (attempts < 5) {
            attempts++;
            chooseNewDestination(person, index);
            return;
        }
    }
    
    person.targetX = newX;
    person.targetZ = newZ;
}

function isNearFurniture(x, z) {
    // Add buffer around objects for realistic navigation
    const buffer = 0.3;
    
    // Check desk area (including stool)
    if (x > (-2.5 - buffer) && x < (0.5 + buffer) && z > (-2.8 - buffer) && z < (-1.2 + buffer)) return true;
    
    // Check bar area (people can get close but not walk through)
    if (x > (2.8 - buffer) && z > (-2.0 - buffer) && z < (2.0 + buffer)) return true;
    
    // Check plant area
    if (x > (0.2 - buffer) && x < (0.8 + buffer) && z > (-2.5 - buffer) && z < (-1.9 + buffer)) return true;
    
    // Check camera tripod area
    if (x > (1.5 - buffer) && x < (2.5 + buffer) && z > (0.5 - buffer) && z < (1.5 + buffer)) return true;
    
    // Check if too close to walls
    if (x < (-3.5 + buffer) || x > (2.5 - buffer) || z < (-3.5 + buffer) || z > (2.5 - buffer)) return true;
    
    return false;
}

function willCollideWithOtherPerson(x, z, currentPersonIndex) {
    const personalSpace = 0.4; // Minimum distance between people
    
    for (let i = 0; i < people.length; i++) {
        if (i === currentPersonIndex) continue;
        
        const otherPerson = people[i];
        const distance = Math.sqrt(
            Math.pow(x - otherPerson.currentX, 2) + 
            Math.pow(z - otherPerson.currentZ, 2)
        );
        
        if (distance < personalSpace) {
            return true;
        }
    }
    
    return false;
}

function findConversationPartner(person, index) {
    if (Math.random() > 0.02) return; // Only occasionally look for partners
    
    // Find nearby people
    people.forEach((otherPerson, otherIndex) => {
        if (otherIndex === index || otherPerson.isMoving) return;
        
        const distance = Math.sqrt(
            Math.pow(person.currentX - otherPerson.currentX, 2) + 
            Math.pow(person.currentZ - otherPerson.currentZ, 2)
        );
        
        // If someone is nearby and available for conversation
        if (distance < 0.8 && distance > 0.3 && !otherPerson.conversationPartner) {
            // Face each other
            const angle = Math.atan2(
                otherPerson.currentZ - person.currentZ, 
                otherPerson.currentX - person.currentX
            );
            person.group.rotation.y = angle + Math.PI / 2;
            otherPerson.group.rotation.y = angle - Math.PI / 2;
            
            // Mark as conversation partners temporarily
            person.conversationPartner = otherIndex;
            otherPerson.conversationPartner = index;
            
            // Extend pause time for conversation
            person.maxPauseTime = Math.max(person.maxPauseTime, 300);
            otherPerson.maxPauseTime = Math.max(otherPerson.maxPauseTime, 300);
            
            // Clear conversation after some time
            setTimeout(() => {
                if (person.conversationPartner === otherIndex) {
                    person.conversationPartner = null;
                    otherPerson.conversationPartner = null;
                }
            }, 200 + Math.random() * 400);
        }
    });
}

function onRoomWindowResize() {
    const container = document.getElementById('room-container');
    roomCamera.aspect = container.offsetWidth / container.offsetHeight;
    roomCamera.updateProjectionMatrix();
    roomRenderer.setSize(container.offsetWidth, container.offsetHeight);
}

// Shimmer Controls Function
function initShimmerControls() {
    const shimmerCard = document.getElementById('shimmer-card');
    const speedSlider = document.getElementById('speed-slider');
    const speedDisplay = document.getElementById('speed-display');
    const directionSelect = document.getElementById('direction-select');
    const intensitySlider = document.getElementById('intensity-slider');
    const intensityDisplay = document.getElementById('intensity-display');
    const pauseButton = document.getElementById('pause-shimmer');
    
    let isPaused = false;
    
    // Animation patterns
    const animations = {
        clockwise: `
            0% { background-position: 0% 0%; transform: scale(1); }
            25% { background-position: 100% 0%; transform: scale(1.005); }
            50% { background-position: 100% 100%; transform: scale(1); }
            75% { background-position: 0% 100%; transform: scale(0.998); }
            100% { background-position: 0% 0%; transform: scale(1); }
        `,
        counterclockwise: `
            0% { background-position: 0% 0%; transform: scale(1); }
            25% { background-position: 0% 100%; transform: scale(1.005); }
            50% { background-position: 100% 100%; transform: scale(1); }
            75% { background-position: 100% 0%; transform: scale(0.998); }
            100% { background-position: 0% 0%; transform: scale(1); }
        `,
        horizontal: `
            0% { background-position: 0% 50%; transform: scale(1); }
            50% { background-position: 100% 50%; transform: scale(1.005); }
            100% { background-position: 0% 50%; transform: scale(1); }
        `,
        vertical: `
            0% { background-position: 50% 0%; transform: scale(1); }
            50% { background-position: 50% 100%; transform: scale(1.005); }
            100% { background-position: 50% 0%; transform: scale(1); }
        `
    };
    
    function updateAnimation() {
        if (!isPaused) {
            const speed = speedSlider.value;
            const direction = directionSelect.value;
            const intensity = intensitySlider.value / 100;
            
            // Calculate color intensity
            const purple = `rgba(147, 51, 234, ${intensity})`;
            const magenta = `rgba(236, 72, 153, ${intensity})`;
            const yellow = `rgba(234, 179, 8, ${intensity})`;
            const cyan = `rgba(6, 182, 212, ${intensity})`;
            
            // Update background gradient with new intensity
            shimmerCard.style.background = `linear-gradient(135deg, ${purple}, ${magenta}, ${yellow}, ${cyan}, ${purple}, ${magenta})`;
            shimmerCard.style.backgroundSize = '600% 600%';
            
            // Remove existing animation
            shimmerCard.style.animation = 'none';
            
            // Create new keyframes
            const keyframeName = `shimmer-${direction}`;
            
            // Remove existing style element if it exists
            const existingStyle = document.getElementById('shimmer-keyframes');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Create new style element
            const style = document.createElement('style');
            style.id = 'shimmer-keyframes';
            style.textContent = `@keyframes ${keyframeName} { ${animations[direction]} }`;
            document.head.appendChild(style);
            
            // Apply new animation
            setTimeout(() => {
                shimmerCard.style.animation = `${keyframeName} ${speed}s ease-in-out infinite`;
            }, 10);
        }
    }
    
    // Speed control
    speedSlider.addEventListener('input', function() {
        speedDisplay.textContent = `${this.value}s`;
        updateAnimation();
    });
    
    // Direction control
    directionSelect.addEventListener('change', updateAnimation);
    
    // Intensity control
    intensitySlider.addEventListener('input', function() {
        intensityDisplay.textContent = `${this.value}%`;
        updateAnimation();
    });
    
    // Pause/Play control
    pauseButton.addEventListener('click', function() {
        isPaused = !isPaused;
        
        if (isPaused) {
            shimmerCard.style.animationPlayState = 'paused';
            this.textContent = 'Play';
        } else {
            shimmerCard.style.animationPlayState = 'running';
            this.textContent = 'Pause';
            updateAnimation();
        }
    });
    
    // Initialize with default settings
    updateAnimation();
}

// Scroll-Triggered Button Shimmer Function
function initScrollShimmerButtons() {
    const buttons = document.querySelectorAll('.button-shimmer');
    let lastScrollY = window.scrollY;
    
    function updateButtonShimmer() {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        // Calculate scroll progress (0-1) based on page height
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const scrollProgress = Math.min(currentScrollY / maxScroll, 1);
        
        // Calculate shimmer position based on scroll (make it more dramatic)
        const shimmerPosition = scrollProgress * 200; // Increased range for more movement
        
        buttons.forEach((button, index) => {
            // Add slight offset for each button to create wave effect
            const buttonOffset = (index * 15) % 100;
            const finalPosition = (shimmerPosition + buttonOffset) % 100;
            
            // Update background position for the large gradient
            button.style.backgroundPosition = `${finalPosition}% ${finalPosition}%`;
            
            // Force a repaint to ensure the change is visible
            button.style.transform = `translateZ(0) scale(${1 + scrollDelta * 0.001})`;
            
            // Add intensity based on scroll speed
            const intensity = Math.min(scrollDelta * 0.02, 0.3);
            button.style.filter = `brightness(${1 + intensity})`;
        });
        
        lastScrollY = currentScrollY;
        
        // Reset effects after a short delay
        setTimeout(() => {
            buttons.forEach(button => {
                button.style.filter = 'brightness(1)';
                button.style.transform = 'translateZ(0) scale(1)';
            });
        }, 150);
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        updateButtonShimmer();
        
        scrollTimeout = setTimeout(() => {
            updateButtonShimmer();
        }, 16); // ~60fps
    });
    
    // Initialize button positions
    updateButtonShimmer();
}

// AI Suggestions Function
function initAISuggestions() {
    const input = document.getElementById('ai-input');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const inputLoader = document.getElementById('input-loader');
    
    let typingTimeout;
    let isTyping = false;
    
    const suggestionSets = {
        'how': [
            { title: 'How to learn JavaScript?', subtitle: 'Programming fundamentals and best practices', icon: '🚀' },
            { title: 'How to design better?', subtitle: 'UI/UX principles and design systems', icon: '🎨' },
            { title: 'How to optimize performance?', subtitle: 'Web performance and optimization tips', icon: '⚡' }
        ],
        'what': [
            { title: 'What is React?', subtitle: 'Modern JavaScript library for UI', icon: '⚛️' },
            { title: 'What are design tokens?', subtitle: 'Scalable design system foundations', icon: '🎯' },
            { title: 'What is Three.js?', subtitle: '3D graphics library for the web', icon: '🌟' }
        ],
        'why': [
            { title: 'Why use TypeScript?', subtitle: 'Type safety and better developer experience', icon: '🛡️' },
            { title: 'Why design systems matter?', subtitle: 'Consistency and scalability benefits', icon: '🏗️' },
            { title: 'Why learn frontend?', subtitle: 'Career opportunities and creativity', icon: '💡' }
        ],
        'best': [
            { title: 'Best practices for CSS?', subtitle: 'Modern CSS techniques and patterns', icon: '💎' },
            { title: 'Best UI animation libraries?', subtitle: 'Smooth and performant animations', icon: '✨' },
            { title: 'Best learning resources?', subtitle: 'Curated tutorials and documentation', icon: '📚' }
        ],
        'javascript': [
            { title: 'JavaScript ES6+ features', subtitle: 'Modern syntax and capabilities', icon: '🔥' },
            { title: 'JavaScript async/await', subtitle: 'Handling asynchronous operations', icon: '⏰' },
            { title: 'JavaScript frameworks comparison', subtitle: 'React, Vue, Angular overview', icon: '🏆' }
        ],
        'css': [
            { title: 'CSS Grid vs Flexbox', subtitle: 'Layout techniques comparison', icon: '📐' },
            { title: 'CSS animations guide', subtitle: 'Keyframes and transitions', icon: '🎭' },
            { title: 'CSS custom properties', subtitle: 'CSS variables and theming', icon: '🎨' }
        ]
    };
    
    function showInputLoader() {
        inputLoader.classList.add('active');
    }
    
    function hideInputLoader() {
        inputLoader.classList.remove('active');
    }
    
    function createSuggestionElement(suggestion, index) {
        return `
            <div class="suggestion-item" style="animation-delay: ${index * 0.1}s">
                <div class="suggestion-icon">${suggestion.icon}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${suggestion.title}</div>
                    <div class="suggestion-subtitle">${suggestion.subtitle}</div>
                </div>
                <div class="suggestion-sparkle"></div>
            </div>
        `;
    }
    
    function showSuggestions(query) {
        const lowerQuery = query.toLowerCase().trim();
        let suggestions = [];
        
        // Find matching suggestions based on keywords
        for (const [keyword, suggestionList] of Object.entries(suggestionSets)) {
            if (lowerQuery.includes(keyword)) {
                suggestions = suggestionList;
                break;
            }
        }
        
        // Default suggestions if no match
        if (suggestions.length === 0) {
            suggestions = [
                { title: 'Popular frontend topics', subtitle: 'Trending questions and tutorials', icon: '🔥' },
                { title: 'Design inspiration', subtitle: 'Beautiful UI patterns and examples', icon: '💫' },
                { title: 'Code challenges', subtitle: 'Practice problems and solutions', icon: '🧩' }
            ];
        }
        
        // Create suggestions HTML
        const suggestionsHTML = suggestions.map(createSuggestionElement).join('');
        suggestionsContainer.innerHTML = suggestionsHTML;
        
        // Show the container first
        suggestionsContainer.classList.add('active');
        
        // Animate in with slow stagger and progressive opacity
        setTimeout(() => {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    // Dramatic opacity progression: much more contrast
                    const baseOpacity = 0.05 + (index * 0.475); // 0.05, 0.525, 1.0
                    item.style.setProperty('--base-opacity', baseOpacity);
                    
                    // Add custom CSS for this specific item
                    item.style.opacity = baseOpacity;
                    item.style.transition = `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`;
                    
                    // Trigger the animation
                    item.classList.add('animate-in');
                    
                    // Snappy opacity fade-in with fewer stages
                    setTimeout(() => {
                        item.style.opacity = 0.6 + (index * 0.2); // Quick mid-stage
                    }, 80);
                    
                    // Final dramatic reveal
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.filter = 'brightness(1.15)'; // Brighter flash
                        setTimeout(() => {
                            item.style.filter = 'brightness(1)'; // Return to normal
                        }, 60);
                    }, 200);
                }, index * 120); // Much faster stagger: 120ms between items
            });
        }, 100);
        
        // Add click handlers with timeout to ensure elements exist
        setTimeout(() => {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    const title = item.querySelector('.suggestion-title').textContent;
                    input.value = title;
                    hideSuggestions();
                    
                    // Delight moment - shake input slightly
                    input.style.animation = 'none';
                    setTimeout(() => {
                        input.style.animation = 'subtle-shake 0.5s ease-in-out';
                    }, 10);
                });
            });
        }, 150);
    }
    
    function hideSuggestions() {
        hideInputLoader();
        suggestionsContainer.classList.remove('active');
        setTimeout(() => {
            suggestionsContainer.innerHTML = '';
        }, 400);
    }
    
    // Input event handlers
    input.addEventListener('input', (e) => {
        const query = e.target.value;
        
        clearTimeout(typingTimeout);
        
        if (query.length === 0) {
            hideSuggestions();
            isTyping = false;
            return;
        }
        
        if (query.length >= 2) {
            if (!isTyping) {
                showInputLoader();
                isTyping = true;
            }
            
            // Clear previous timeout
            clearTimeout(typingTimeout);
            
            // Show suggestions after AI loader has time to play
            typingTimeout = setTimeout(() => {
                showSuggestions(query);
                
                // Keep loader for a bit longer even after showing suggestions
                setTimeout(() => {
                    hideInputLoader();
                    isTyping = false;
                }, 600 + Math.random() * 400); // Extra time for AI thinking effect
            }, 800 + Math.random() * 600); // Longer initial delay: 800-1400ms
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            hideSuggestions();
        }
    });
    
    // Show suggestions on focus if there's content
    input.addEventListener('focus', () => {
        if (input.value.length >= 2) {
            showSuggestions(input.value);
        }
    });
}

// Add subtle shake animation to CSS
const shakeStyles = `
@keyframes subtle-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
}
`;

// Inject the shake animation
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeStyles;
document.head.appendChild(styleSheet);

// Clean AI Suggestions Function (duplicate without shimmer background)
function initCleanAISuggestions() {
    const input = document.getElementById('clean-ai-input');
    const suggestionsContainer = document.getElementById('clean-suggestions-container');
    const inputLoader = document.getElementById('clean-input-loader');
    
    let typingTimeout;
    let isTyping = false;
    
    const suggestionSets = {
        'how': [
            { title: 'How to learn JavaScript?', subtitle: 'Programming fundamentals and best practices', icon: '🚀' },
            { title: 'How to design better?', subtitle: 'UI/UX principles and design systems', icon: '🎨' },
            { title: 'How to optimize performance?', subtitle: 'Web performance and optimization tips', icon: '⚡' }
        ],
        'what': [
            { title: 'What is React?', subtitle: 'Modern JavaScript library for UI', icon: '⚛️' },
            { title: 'What are design tokens?', subtitle: 'Scalable design system foundations', icon: '🎯' },
            { title: 'What is Three.js?', subtitle: '3D graphics library for the web', icon: '🌟' }
        ],
        'why': [
            { title: 'Why use TypeScript?', subtitle: 'Type safety and better experience', icon: '🛡️' },
            { title: 'Why design systems matter?', subtitle: 'Consistency and scalability benefits', icon: '🏗️' },
            { title: 'Why learn frontend?', subtitle: 'Career opportunities and creativity', icon: '💡' }
        ],
        'best': [
            { title: 'Best practices for CSS?', subtitle: 'Modern CSS techniques and patterns', icon: '💎' },
            { title: 'Best UI animation libraries?', subtitle: 'Smooth and performant animations', icon: '✨' },
            { title: 'Best learning resources?', subtitle: 'Curated tutorials and documentation', icon: '📚' }
        ],
        'javascript': [
            { title: 'JavaScript ES6+ features', subtitle: 'Modern syntax and capabilities', icon: '🔥' },
            { title: 'JavaScript async/await', subtitle: 'Handling asynchronous operations', icon: '⏰' },
            { title: 'JavaScript frameworks comparison', subtitle: 'React, Vue, Angular overview', icon: '🏆' }
        ],
        'css': [
            { title: 'CSS Grid vs Flexbox', subtitle: 'Layout techniques comparison', icon: '📐' },
            { title: 'CSS animations guide', subtitle: 'Keyframes and transitions', icon: '🎭' },
            { title: 'CSS custom properties', subtitle: 'CSS variables and theming', icon: '🎨' }
        ]
    };
    
    function showInputLoader() {
        inputLoader.classList.add('active');
        input.classList.add('ai-thinking');
    }
    
    function hideInputLoader() {
        inputLoader.classList.remove('active');
        input.classList.remove('ai-thinking');
    }
    
    function createSuggestionElement(suggestion, index) {
        return `
            <div class="suggestion-item" style="animation-delay: ${index * 0.1}s">
                <div class="suggestion-icon">${suggestion.icon}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${suggestion.title}</div>
                    <div class="suggestion-subtitle">${suggestion.subtitle}</div>
                </div>
                <div class="suggestion-sparkle"></div>
            </div>
        `;
    }
    
    function showSuggestions(query) {
        const lowerQuery = query.toLowerCase().trim();
        let suggestions = [];
        
        // Find matching suggestions based on keywords
        for (const [keyword, suggestionList] of Object.entries(suggestionSets)) {
            if (lowerQuery.includes(keyword)) {
                suggestions = suggestionList;
                break;
            }
        }
        
        // Default suggestions if no match
        if (suggestions.length === 0) {
            suggestions = [
                { title: 'Popular frontend topics', subtitle: 'Trending questions and tutorials', icon: '🔥' },
                { title: 'Design inspiration', subtitle: 'Beautiful UI patterns and examples', icon: '💫' },
                { title: 'Code challenges', subtitle: 'Practice problems and solutions', icon: '🧩' }
            ];
        }
        
        // Create suggestions HTML
        const suggestionsHTML = suggestions.map(createSuggestionElement).join('');
        suggestionsContainer.innerHTML = suggestionsHTML;
        
        // Show the container first
        suggestionsContainer.classList.add('active');
        
        // Animate in with slow stagger and progressive opacity
        setTimeout(() => {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    // Dramatic opacity progression: much more contrast
                    const baseOpacity = 0.05 + (index * 0.475); // 0.05, 0.525, 1.0
                    item.style.setProperty('--base-opacity', baseOpacity);
                    
                    // Add custom CSS for this specific item
                    item.style.opacity = baseOpacity;
                    item.style.transition = `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`;
                    
                    // Trigger the animation
                    item.classList.add('animate-in');
                    
                    // Snappy opacity fade-in with fewer stages
                    setTimeout(() => {
                        item.style.opacity = 0.6 + (index * 0.2); // Quick mid-stage
                    }, 80);
                    
                    // Final dramatic reveal
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.filter = 'brightness(1.15)'; // Brighter flash
                        setTimeout(() => {
                            item.style.filter = 'brightness(1)'; // Return to normal
                        }, 60);
                    }, 200);
                }, index * 120); // Much faster stagger: 120ms between items
            });
        }, 100);
        
        // Add click handlers with timeout to ensure elements exist
        setTimeout(() => {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    const title = item.querySelector('.suggestion-title').textContent;
                    input.value = title;
                    hideSuggestions();
                    
                    // Delight moment - shake input slightly
                    input.style.animation = 'none';
                    setTimeout(() => {
                        input.style.animation = 'subtle-shake 0.5s ease-in-out';
                    }, 10);
                });
            });
        }, 150);
    }
    
    function hideSuggestions() {
        hideInputLoader();
        suggestionsContainer.classList.remove('active');
        setTimeout(() => {
            suggestionsContainer.innerHTML = '';
        }, 400);
    }
    
    // Input event handlers
    input.addEventListener('input', (e) => {
        const query = e.target.value;
        
        clearTimeout(typingTimeout);
        
        if (query.length === 0) {
            hideSuggestions();
            isTyping = false;
            return;
        }
        
        if (query.length >= 2) {
            if (!isTyping) {
                showInputLoader();
                isTyping = true;
            }
            
            // Clear previous timeout
            clearTimeout(typingTimeout);
            
            // Show suggestions after AI loader has time to play
            typingTimeout = setTimeout(() => {
                showSuggestions(query);
                
                // Keep loader for a bit longer even after showing suggestions
                setTimeout(() => {
                    hideInputLoader();
                    isTyping = false;
                }, 600 + Math.random() * 400); // Extra time for AI thinking effect
            }, 800 + Math.random() * 600); // Longer initial delay: 800-1400ms
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            hideSuggestions();
        }
    });
    
    // Show suggestions on focus if there's content
    input.addEventListener('focus', () => {
        if (input.value.length >= 2) {
            showSuggestions(input.value);
        }
    });
}

function initFilledAISuggestions() {
    const input = document.getElementById('filled-ai-input');
    const suggestionsContainer = document.getElementById('filled-suggestions-container');
    const inputLoader = document.getElementById('filled-input-loader');
    
    let typingTimeout;
    let isTyping = false;
    
    const suggestionSets = {
        'how': [
            { title: 'How to learn JavaScript?', subtitle: 'Programming fundamentals and best practices', icon: '🚀' },
            { title: 'How to design better?', subtitle: 'UI/UX principles and design systems', icon: '🎨' },
            { title: 'How to optimize performance?', subtitle: 'Web performance and optimization tips', icon: '⚡' }
        ],
        'what': [
            { title: 'What is React?', subtitle: 'Modern JavaScript library for UI', icon: '⚛️' },
            { title: 'What are design tokens?', subtitle: 'Scalable design system foundations', icon: '🎯' },
            { title: 'What is Three.js?', subtitle: '3D graphics library for the web', icon: '🌟' }
        ],
        'why': [
            { title: 'Why use TypeScript?', subtitle: 'Type safety and better experience', icon: '🛡️' },
            { title: 'Why design systems matter?', subtitle: 'Consistency and scalability benefits', icon: '🏗️' },
            { title: 'Why learn frontend?', subtitle: 'Career opportunities and creativity', icon: '💡' }
        ],
        'best': [
            { title: 'Best practices for CSS?', subtitle: 'Modern CSS techniques and patterns', icon: '💎' },
            { title: 'Best UI animation libraries?', subtitle: 'Smooth and performant animations', icon: '✨' },
            { title: 'Best learning resources?', subtitle: 'Curated tutorials and documentation', icon: '📚' }
        ],
        'javascript': [
            { title: 'JavaScript ES6+ features', subtitle: 'Modern syntax and capabilities', icon: '🔥' },
            { title: 'JavaScript async/await', subtitle: 'Handling asynchronous operations', icon: '⏰' },
            { title: 'JavaScript frameworks comparison', subtitle: 'React, Vue, Angular overview', icon: '🏆' }
        ],
        'css': [
            { title: 'CSS Grid vs Flexbox', subtitle: 'Layout techniques comparison', icon: '📐' },
            { title: 'CSS animations guide', subtitle: 'Keyframes and transitions', icon: '🎭' },
            { title: 'CSS custom properties', subtitle: 'CSS variables and theming', icon: '🎨' }
        ]
    };
    
    function showInputLoader() {
        inputLoader.classList.add('active');
        input.classList.add('ai-thinking');
    }
    
    function hideInputLoader() {
        inputLoader.classList.remove('active');
        input.classList.remove('ai-thinking');
    }
    
    function createSuggestionElement(suggestion, index) {
        return `
            <div class="suggestion-item" style="animation-delay: ${index * 0.1}s">
                <div class="suggestion-icon">${suggestion.icon}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${suggestion.title}</div>
                    <div class="suggestion-subtitle">${suggestion.subtitle}</div>
                </div>
                <div class="suggestion-sparkle"></div>
            </div>
        `;
    }
    
    function showSuggestions(query) {
        const lowerQuery = query.toLowerCase().trim();
        let suggestions = [];
        
        // Find matching suggestions based on keywords
        for (const [keyword, suggestionList] of Object.entries(suggestionSets)) {
            if (lowerQuery.includes(keyword)) {
                suggestions = suggestionList;
                break;
            }
        }
        
        // Default suggestions if no match
        if (suggestions.length === 0) {
            suggestions = [
                { title: 'Popular frontend topics', subtitle: 'Trending questions and tutorials', icon: '🔥' },
                { title: 'Design inspiration', subtitle: 'Beautiful UI patterns and examples', icon: '💫' },
                { title: 'Code challenges', subtitle: 'Practice problems and solutions', icon: '🧩' }
            ];
        }
        
        // Create suggestions HTML
        const suggestionsHTML = suggestions.map(createSuggestionElement).join('');
        suggestionsContainer.innerHTML = suggestionsHTML;
        
        // Show the container first
        suggestionsContainer.classList.add('active');
        
        // Animate in with slow stagger and progressive opacity
        setTimeout(() => {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    // Dramatic opacity progression: much more contrast
                    const baseOpacity = 0.05 + (index * 0.475); // 0.05, 0.525, 1.0
                    item.style.setProperty('--base-opacity', baseOpacity);
                    
                    // Add custom CSS for this specific item
                    item.style.opacity = baseOpacity;
                    item.style.transition = `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`;
                    
                    // Trigger the animation
                    item.classList.add('animate-in');
                    
                    // Snappy opacity fade-in with fewer stages
                    setTimeout(() => {
                        item.style.opacity = 0.6 + (index * 0.2); // Quick mid-stage
                    }, 80);
                    
                    // Final dramatic reveal
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.filter = 'brightness(1.15)'; // Brighter flash
                        setTimeout(() => {
                            item.style.filter = 'brightness(1)'; // Return to normal
                        }, 60);
                    }, 200);
                }, index * 120); // Much faster stagger: 120ms between items
            });
        }, 100);
        
        // Add click handlers with timeout to ensure elements exist
        setTimeout(() => {
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    const title = item.querySelector('.suggestion-title').textContent;
                    input.value = title;
                    hideSuggestions();
                    
                    // Delight moment - shake input slightly
                    input.style.animation = 'none';
                    setTimeout(() => {
                        input.style.animation = 'subtle-shake 0.5s ease-in-out';
                    }, 10);
                });
            });
        }, 150);
    }
    
    function hideSuggestions() {
        hideInputLoader();
        suggestionsContainer.classList.remove('active');
        setTimeout(() => {
            suggestionsContainer.innerHTML = '';
        }, 400);
    }
    
    // Input event handlers
    input.addEventListener('input', (e) => {
        const query = e.target.value;
        
        clearTimeout(typingTimeout);
        
        if (query.length === 0) {
            hideSuggestions();
            isTyping = false;
            return;
        }
        
        if (query.length >= 2) {
            if (!isTyping) {
                showInputLoader();
                isTyping = true;
            }
            
            // Clear previous timeout
            clearTimeout(typingTimeout);
            
            // Show suggestions after AI loader has time to play
            typingTimeout = setTimeout(() => {
                showSuggestions(query);
                
                // Keep loader for a bit longer even after showing suggestions
                setTimeout(() => {
                    hideInputLoader();
                    isTyping = false;
                }, 600 + Math.random() * 400); // Extra time for AI thinking effect
            }, 800 + Math.random() * 600); // Longer initial delay: 800-1400ms
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            hideSuggestions();
        }
    });
    
    // Show suggestions on focus if there's content
    input.addEventListener('focus', () => {
        if (input.value.length >= 2) {
            showSuggestions(input.value);
        }
    });
}

// Export for potential module use later
// (This prepares for when you learn about modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createCard, initThreeJS, initRoomScene };
}