console.log("✅ script.js is loaded!");



  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_mdlc8qj', 'template_4fpn6aw', this)
      .then(function(response) {
         alert('Message sent successfully!');
      }, function(error) {
         alert('Failed to send message. Please try again.');
      });
  });



const toggle = document.querySelector('.theme-toggle');
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Save preference to localStorage
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        
        // Load saved theme
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if (savedTheme === 'light') {
                document.body.classList.add('light-mode');
            }
        });



// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    if (navLinks.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            bar.style.width = bar.getAttribute('data-width');
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Initialize on load

// Phone drag rotation
const phoneContainer = document.querySelector('.phone-container');
const phoneElement = document.querySelector('.hero-phone');
let isDragging = false;
let startX, startY;
let rotationX = 10;
let rotationY = -15;

phoneElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    phoneElement.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    
    // Constrain vertical rotation to prevent flipping
    rotationX = Math.max(-80, Math.min(80, rotationX));
    
    phoneContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    phoneElement.style.cursor = 'grab';
});

// Touch support for mobile devices
phoneElement.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    
    // Constrain vertical rotation to prevent flipping
    rotationX = Math.max(-80, Math.min(80, rotationX));
    
    phoneContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
});

document.addEventListener('touchend', () => {
    isDragging = false;
});


// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});




// dart 
