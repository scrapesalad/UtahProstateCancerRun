// Update script.js with enhanced gradient effect
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (hero && scrollIndicator) {
        // More dramatic gradient transition
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const scrollPercent = Math.min(scrollPosition / heroHeight, 1);
            
            // Calculate color stops for the gradient
            const startColor = `rgba(14, 77, 146, ${1 - scrollPercent * 0.7})`;
            const midColor = `rgba(42, 109, 180, ${0.8 - scrollPercent * 0.6})`;
            const endColor = `rgba(26, 26, 46, ${0.9 - scrollPercent * 0.5})`;
            
            hero.style.background = `linear-gradient(135deg, 
                ${startColor} 0%, 
                ${midColor} 50%, 
                ${endColor} 100%)`;
            
            // Parallax effect
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            
            // Fade out scroll indicator
            scrollIndicator.style.opacity = `${1 - scrollPercent * 2}`;
            
            // Add slight scale effect to hero content
            const scaleValue = 1 - scrollPercent * 0.1;
            document.querySelector('.hero-content').style.transform = `scale(${Math.max(scaleValue, 0.9)})`;
        });
    }
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .event-card, .travel-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.section-title, .event-card, .travel-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Newsletter form submission for embedded bar
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send the email to your backend
            alert('Thank you for subscribing! We will keep you updated.');
            this.reset();
        });
    }

    // --- Hero Slider Functionality ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlider() {
        sliderInterval = setInterval(nextSlide, 7000);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            stopSlider();
            startSlider();
        });
    });

    showSlide(0);
    startSlider();

    // Modal pop-out for course map
    const courseMapImg = document.getElementById('courseMapImg');
    const mapModal = document.getElementById('mapModal');
    const mapModalImg = document.getElementById('mapModalImg');
    const closeMapModal = document.getElementById('closeMapModal');

    if (courseMapImg && mapModal && mapModalImg && closeMapModal) {
        courseMapImg.addEventListener('click', function() {
            mapModal.style.display = 'flex';
            mapModalImg.src = this.src;
        });
        closeMapModal.addEventListener('click', function() {
            mapModal.style.display = 'none';
        });
        mapModal.addEventListener('click', function(e) {
            if (e.target === mapModal) {
                mapModal.style.display = 'none';
            }
        });
    }
});