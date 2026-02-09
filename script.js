// ================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Developer: Godwin Abiri
// ================================

'use strict';

// ================================
// NAVIGATION FUNCTIONALITY
// ================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ================================
// SMOOTH SCROLLING
// ================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// SCROLL TO TOP BUTTON
// ================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// TYPING EFFECT
// ================================

const typingTexts = document.querySelectorAll('.typing-text');

if (typingTexts.length > 0) {
    let currentIndex = 0;
    const texts = Array.from(typingTexts).map(el => el.textContent);
    
    function typeWriter(text, element, charIndex = 0) {
        if (charIndex < text.length) {
            element.textContent = text.substring(0, charIndex + 1);
            setTimeout(() => typeWriter(text, element, charIndex + 1), 100);
        } else {
            setTimeout(() => {
                eraseText(element, text.length);
            }, 2000);
        }
    }
    
    function eraseText(element, charIndex) {
        if (charIndex > 0) {
            element.textContent = element.textContent.substring(0, charIndex - 1);
            setTimeout(() => eraseText(element, charIndex - 1), 50);
        } else {
            currentIndex = (currentIndex + 1) % texts.length;
            setTimeout(() => {
                typeWriter(texts[currentIndex], typingTexts[currentIndex]);
            }, 500);
        }
    }
    
    // Start typing effect after page load
    setTimeout(() => {
        typeWriter(texts[0], typingTexts[0]);
    }, 1000);
}

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.style.getPropertyValue('--progress');
                    bar.style.width = progress;
                });
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll(
    '.section-header, .about-content, .project-card, .skill-category, .service-card, .contact-content'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ================================
// CONTACT FORM HANDLING
// ================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    try {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        showMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
        // Reset button
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        showMessage('Oops! Something went wrong. Please try again.', 'error');
        
        // Reset button
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.querySelector('span').textContent = 'Send Message';
        submitBtn.disabled = false;
    }
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ================================
// CURSOR GLOW EFFECT (Optional)
// ================================

let cursorGlow = null;

function createCursorGlow() {
    cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent);
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
        z-index: 9999;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursorGlow);
}

// Only enable cursor glow on desktop
if (window.innerWidth > 1024) {
    createCursorGlow();
    
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        }
    });
    
    document.addEventListener('mouseleave', () => {
        if (cursorGlow) {
            cursorGlow.style.opacity = '0';
        }
    });
}

// ================================
// PARTICLE BACKGROUND (Optional)
// ================================

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 184, 0, 0.3)'};
            border-radius: 50%;
            left: ${startX}%;
            bottom: -10px;
            animation: float-particle ${duration}s linear ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.insertBefore(particlesContainer, document.body.firstChild);
}

// Add particle float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Only create particles on desktop
if (window.innerWidth > 768) {
    createParticles();
}

// ================================
// PROJECT CARD TILT EFFECT
// ================================

const projectCards = document.querySelectorAll('.project-card, .service-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ================================
// PRELOADER (Optional)
// ================================

window.addEventListener('load', () => {
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
});

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cLooking for something? Check out the source code!', 'font-size: 14px; color: #ffb800;');
console.log('%c💼 Godwin Abiri - Frontend Developer & Web3 Enthusiast', 'font-size: 12px; color: #00d4ff;');

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations go here
    });
}, { passive: true });

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a[href], button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

// ================================
// EASTER EGG
// ================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 3s linear infinite';
    
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterEggStyle);
    
    console.log('%c🎉 Easter Egg Activated!', 'font-size: 24px; font-weight: bold; color: #ff00ff;');
    
    setTimeout(() => {
        document.body.style.animation = '';
        easterEggStyle.remove();
    }, 10000);
}

// ================================
// INITIALIZATION COMPLETE
// ================================

console.log('%c✅ Portfolio initialized successfully', 'color: #22c55e; font-weight: bold;');