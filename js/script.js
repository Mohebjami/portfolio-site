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
    mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active') ? 'true' : 'false');
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
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
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

// Project screenshot viewer
const screenshotModal = document.querySelector('#screenshot-modal');
const modalImage = document.querySelector('#screenshot-modal-image');
const modalCaption = document.querySelector('#screenshot-modal-caption');
const modalThumbnails = document.querySelector('#screenshot-modal-thumbnails');
const closeModalButton = document.querySelector('.screenshot-modal-close');
const previousScreenshotButton = document.querySelector('.screenshot-modal-prev');
const nextScreenshotButton = document.querySelector('.screenshot-modal-next');
const projectShots = [...document.querySelectorAll('.project-shot')];
const projectViewButtons = [...document.querySelectorAll('.project-view-button')];
let activeProjectShots = [];
let activeScreenshotIndex = 0;
let lastFocusedElement = null;

const showScreenshot = () => {
    const shot = activeProjectShots[activeScreenshotIndex];
    modalImage.src = shot.dataset.image;
    modalImage.alt = shot.dataset.alt;
    modalCaption.textContent = `${activeScreenshotIndex + 1} of ${activeProjectShots.length} — ${shot.dataset.alt}`;
    modalThumbnails.querySelectorAll('button').forEach((thumbnail, index) => {
        const isActive = index === activeScreenshotIndex;
        thumbnail.classList.toggle('is-active', isActive);
        thumbnail.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
};

const renderModalThumbnails = () => {
    modalThumbnails.replaceChildren();
    activeProjectShots.forEach((shot, index) => {
        const thumbnail = document.createElement('button');
        thumbnail.type = 'button';
        thumbnail.setAttribute('role', 'tab');
        thumbnail.setAttribute('aria-label', `Show screenshot ${index + 1}: ${shot.dataset.alt}`);
        thumbnail.setAttribute('aria-selected', index === activeScreenshotIndex ? 'true' : 'false');
        thumbnail.innerHTML = `<img src="${shot.dataset.image}" alt="">`;
        thumbnail.addEventListener('click', () => {
            activeScreenshotIndex = index;
            showScreenshot();
        });
        modalThumbnails.appendChild(thumbnail);
    });
};

const closeScreenshotModal = () => {
    screenshotModal.classList.remove('is-open');
    screenshotModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus();
};

const openScreenshotViewer = (shot, returnFocusElement = shot) => {
    activeProjectShots = projectShots.filter((item) => item.dataset.project === shot.dataset.project);
    activeScreenshotIndex = activeProjectShots.indexOf(shot);
    lastFocusedElement = returnFocusElement;
    renderModalThumbnails();
    showScreenshot();
    screenshotModal.classList.add('is-open');
    screenshotModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeModalButton.focus();
};

projectShots.forEach((shot) => {
    shot.addEventListener('click', () => {
        openScreenshotViewer(shot);
    });
});

projectViewButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const featuredShot = projectShots.find((shot) => shot.dataset.project === button.dataset.projectTrigger && shot.classList.contains('project-shot-featured'));
        if (featuredShot) openScreenshotViewer(featuredShot, button);
    });
});

previousScreenshotButton.addEventListener('click', () => {
    activeScreenshotIndex = (activeScreenshotIndex - 1 + activeProjectShots.length) % activeProjectShots.length;
    showScreenshot();
});

nextScreenshotButton.addEventListener('click', () => {
    activeScreenshotIndex = (activeScreenshotIndex + 1) % activeProjectShots.length;
    showScreenshot();
});

closeModalButton.addEventListener('click', closeScreenshotModal);

screenshotModal.addEventListener('click', (event) => {
    if (event.target === screenshotModal) closeScreenshotModal();
});

document.addEventListener('keydown', (event) => {
    if (!screenshotModal.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeScreenshotModal();
    if (event.key === 'ArrowLeft') previousScreenshotButton.click();
    if (event.key === 'ArrowRight') nextScreenshotButton.click();
});




// dart 
