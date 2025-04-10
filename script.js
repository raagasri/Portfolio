// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Scroll animations
        animateOnScroll();
        
        // Animate progress bars when in view
        animateProgressBars();
    });

    // Back to top button functionality
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, let's just show an alert
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Set initial state for animations
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.classList.remove('show');
    });

    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 300);

    // Animate elements on scroll
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        const triggerPosition = windowHeight * 0.85;

        document.querySelectorAll('.animate-on-scroll:not(.show)').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPosition) {
                element.classList.add('show');
            }
        });
    }

    // Animate progress bars when in view
    function animateProgressBars() {
        const skills = document.getElementById('skills');
        if (!skills) return;
        
        const skillsPosition = skills.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsPosition < windowHeight * 0.85) {
            document.querySelectorAll('.progress').forEach(progress => {
                const value = progress.getAttribute('data-value');
                progress.style.width = value + '%';
            });
        }
    }

    // Initialize typing animation for the hero section
    let typed;
    
    function initTyped() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle && !typed) {
            const originalText = heroTitle.textContent;
            heroTitle.innerHTML = "";
            
            let i = 0;
            const typeText = () => {
                if (i < originalText.length) {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                    setTimeout(typeText, 100);
                }
            };
            
            setTimeout(typeText, 500);
        }
    }

    // Call the typing animation after preloader
    setTimeout(initTyped, 1500);

    // Projects hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll reveal animations for timeline items
    function revealTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 300);
        });
    }

    // Check if timeline is visible
    window.addEventListener('scroll', function() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        const timelinePosition = timeline.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (timelinePosition < windowHeight * 0.75) {
            revealTimelineItems();
        }
    });

    // Initialize ParticleJS for hero background (if available)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('hero', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#1e90ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#1e90ff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});
