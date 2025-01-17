// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('.contact-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (validateForm(name, email, message)) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }

    // Form validation
    function validateForm(name, email, message) {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.trim() === '') {
            showNotification('Please enter your name', 'error');
            isValid = false;
        }

        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            isValid = false;
        }

        if (message.trim() === '') {
            showNotification('Please enter a message', 'error');
            isValid = false;
        }

        return isValid;
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.color = '#fff';
        notification.style.zIndex = '1000';

        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        }

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.project-card, .about-section p, .contact-section form');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Typing animation for home section
    const welcomeText = document.querySelector('.home-section h1');
    if (welcomeText) {
        const text = welcomeText.textContent;
        welcomeText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                welcomeText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }

    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';

        nav.insertBefore(menuButton, nav.firstChild);

        menuButton.addEventListener('click', () => {
            const ul = nav.querySelector('ul');
            ul.classList.toggle('show');
        });

        // Responsive menu handling
        function handleResponsiveMenu() {
            const ul = nav.querySelector('ul');
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
                ul.classList.add('mobile');
            } else {
                menuButton.style.display = 'none';
                ul.classList.remove('mobile');
                ul.classList.remove('show');
            }
        }

        window.addEventListener('resize', handleResponsiveMenu);
        handleResponsiveMenu();
    };

    createMobileMenu();

    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
        }

        nav ul.mobile {
            display: none;
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        nav ul.mobile.show {
            display: block;
        }

        nav ul.mobile li {
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #eee;
        }
    `;
    document.head.appendChild(style);
});

