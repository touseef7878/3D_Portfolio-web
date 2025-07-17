document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // DOM Elements
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('.section');
    const backToTopBtn = document.getElementById('back-to-top');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const contactForm = document.getElementById('contactForm');
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Loading overlay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
    
    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
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
        
        // Animate sections on scroll
        animateOnScroll();
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
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
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
        if (!contactForm) return;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const formSuccess = document.getElementById('form-success');
        
        function validateName() {
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block';
                return false;
            } else if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameError.style.display = 'block';
                return false;
            } else {
                nameError.style.display = 'none';
                return true;
            }
        }
        
        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailError.style.display = 'block';
                return false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email';
                emailError.style.display = 'block';
                return false;
            } else {
                emailError.style.display = 'none';
                return true;
            }
        }
        
        function validateMessage() {
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageError.style.display = 'block';
                return false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageError.style.display = 'block';
                return false;
            } else {
                messageError.style.display = 'none';
                return true;
            }
        }
        
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                // Here you would typically send the data to a server
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: messageInput.value.trim()
                };
                
                console.log('Form submitted:', formData);
                
                // Show success message
                formSuccess.textContent = 'Thank you for your message! I will get back to you soon.';
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
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
    
    // Initialize all functions
    createParticles();
    animateOnScroll();
    animateCubes();
    setupContactForm();
    setupProjectHover();
    initScene();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});