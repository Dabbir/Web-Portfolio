// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Get all the elements we need to work with
    const header = document.querySelector('header');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const skillLevels = document.querySelectorAll('.skill-level');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contact-form');
    const menuToggle = document.getElementById('menu-toggle');
    const navItems = document.querySelectorAll('nav ul li a');
    
    // Typing effect for the landing title
    const textElement = document.querySelector('.typing-effect');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Adjust typing speed here
            }
        };
        
        setTimeout(typeWriter, 1000); // Start typing after 1 second
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        // Add/remove 'scrolled' class to header based on scroll position
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Animate skill bars when in viewport
        animateSkillBars();
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Animate skill bars when they come into viewport
    function animateSkillBars() {
        skillLevels.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillPosition < screenPosition) {
                const width = skill.getAttribute('data-width');
                skill.style.width = width;
            }
        });
    }
    
    // Trigger initial animation for skill bars
    setTimeout(animateSkillBars, 1000);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (menuToggle.checked) {
                menuToggle.checked = false;
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Close mobile menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Back to top button functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Tab switching for experience section
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show target content
            const targetContent = document.getElementById(this.getAttribute('data-target'));
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
    
    // Portfolio filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (name && email && subject && message) {
                // Here you would normally send the data to a server
                // For demo purposes, we'll just show an alert
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // CV Download functionality
    const downloadCV = document.getElementById('download-cv');
    if (downloadCV) {
        downloadCV.addEventListener('click', function(e) {
            // You can track downloads with this event listener
            console.log('CV download initiated');
            
            // If you want to show a message
            setTimeout(() => {
                alert('Thank you for downloading my CV!');
            }, 1000);
            
            // The download will happen automatically because of the 'download' attribute
        });
    }
    
    // Add animations with GSAP
    // Animate the logo
    gsap.from('.logo', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Animate the navigation
    gsap.from('nav ul li', {
        duration: 1,
        y: -50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.7
    });
    
    // Parallax effect on scroll for landing section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const landingBg = document.querySelector('.landing-bg');
        
        if (landingBg) {
            landingBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
    
    // Project hover effect with GSAP
    const portfolioCards = document.querySelectorAll('.portfolio-item');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.portfolio-image'), {
                duration: 0.4,
                scale: 1.1,
                ease: 'power1.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.portfolio-image'), {
                duration: 0.4,
                scale: 1,
                ease: 'power1.out'
            });
        });
    });
});