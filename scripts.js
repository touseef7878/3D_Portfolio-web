// DOM Elements
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

// Menu toggle functionality
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Create particles for background
function createParticles() {
    const scene = document.getElementById('scene');
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size (2px to 6px)
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration (10s to 20s)
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay (0s to 5s)
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color variation
        const hue = 250 + Math.random() * 20 - 10; // Purple hue range
        particle.style.background = `hsl(${hue}, 80%, 70%)`;
        
        scene.appendChild(particle);
    }
}

// Animate sections on scroll
function animateOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Animate cubes in about and resume sections
function animateCubes() {
    const cubes = document.querySelectorAll('.cube');
    
    cubes.forEach(cube => {
        let rotationX = 0;
        let rotationY = 0;
        let rotationZ = 0;
        
        // Random rotation direction
        const rotateX = Math.random() > 0.5;
        const rotateY = Math.random() > 0.5;
        const rotateZ = Math.random() > 0.5;
        
        // Random rotation speed
        const speedX = Math.random() * 0.5 + 0.1;
        const speedY = Math.random() * 0.5 + 0.1;
        const speedZ = Math.random() * 0.5 + 0.1;
        
        function animate() {
            if (rotateX) rotationX += speedX;
            if (rotateY) rotationY += speedY;
            if (rotateZ) rotationZ += speedZ;
            
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Handle contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Add hover effects to project items
function setupProjectHover() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const imgContainer = item.querySelector('.project-img-container');
        const overlay = item.querySelector('.project-overlay');
        
        item.addEventListener('mouseenter', () => {
            imgContainer.style.transform = 'scale(1.05)';
            overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            imgContainer.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });
}

// 3D Scene with Three.js
function initScene() {
    const sceneEl = document.getElementById('scene');
    
    // Only initialize if Three.js is loaded and element exists
    if (!sceneEl || !window.THREE) return;
    
    // Set dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    sceneEl.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create 3D objects
    createFloatingShapes(scene);
    
    // Camera position
    camera.position.z = 15;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate objects
        scene.children.forEach(child => {
            if (child.userData.rotate) {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

function createFloatingShapes(scene) {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6c5ce7,
        transparent: true,
        opacity: 0.6,
        shininess: 100,
        specular: 0x111111
    });
    
    for (let i = 0; i < 10; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        mesh.scale.setScalar(Math.random() * 2 + 1);
        mesh.userData.rotate = true; // Enable rotation
        scene.add(mesh);
    } 
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateOnScroll();
    animateCubes();
    setupContactForm();
    setupProjectHover();
    
    // Initialize Three.js scene
    if (window.THREE) {
        initScene();
    } else {
        // If Three.js hasn't loaded yet, wait for it
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initScene;
        document.body.appendChild(script);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});