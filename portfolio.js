// ========================================
// NAVIGATION
// ========================================

// Toggle mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Navbar background on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
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

// ========================================
// SKILLS ANIMATION
// ========================================

// Animate skill bars when in viewport
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition - 100) {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                bar.style.width = progress + '%';
            }
        }
    });
};

// Trigger animation on scroll and load
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Initial trigger after short delay to ensure DOM is ready
setTimeout(animateSkills, 500);

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const observeElements = document.querySelectorAll('.skill-category, .project-card, .veille-category, .contact-card');
observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage('Veuillez remplir tous les champs.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulate form submission
        // In a real application, you would send this data to a server
        console.log('Form data:', formData);

        // Show success message
        showMessage('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');

        // Reset form
        contactForm.reset();

        // Create mailto link as fallback
        const mailtoLink = `mailto:alcindorshana972@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        
        // Open email client after a short delay
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000);
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ========================================
// SMOOTH SCROLL FOR ALL LINKS
// ========================================

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

// ========================================
// TYPING EFFECT (Optional Enhancement)
// ========================================

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================

const updateYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        const currentYear = new Date().getFullYear();
        el.innerHTML = el.innerHTML.replace(/\d{4}/, currentYear);
    });
};

updateYear();

// ========================================
// PRELOADER (Optional)
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// EXTERNAL LINKS IN NEW TAB
// ========================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ========================================
// COUNTER ANIMATION (For future stats)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// PARTICLES ANIMATION (Background Effect)
// ========================================

const createParticles = () => {
    const particlesContainer = document.querySelector('.hero-particles');
    
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(37, 99, 235, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
};

createParticles();

// ========================================
// LAZY LOADING FOR IMAGES (Future enhancement)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// THEME TOGGLE (Future enhancement)
// ========================================

// This can be implemented later if dark mode is needed
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%cPortfolio - Shana Alcindor', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cBTS SIO Option SISR', 'color: #64748b; font-size: 14px;');
console.log('%c🚀 Bienvenue sur mon portfolio !', 'color: #10b981; font-size: 16px;');

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Focus trap for mobile menu
const focusableElements = 'a[href], button, textarea, input, select';
const navModal = navMenu;

if (navModal) {
    const firstFocusableElement = navModal.querySelectorAll(focusableElements)[0];
    const focusableContent = navModal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && modal.classList.contains('active')) {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ========================================
// SERVICE WORKER REGISTRATION (Future PWA)
// ========================================

if ('serviceWorker' in navigator) {
    // Uncomment when ready to implement PWA
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
    */
}

// ========================================
// ANALYTICS (Placeholder for Google Analytics)
// ========================================

// Add your Google Analytics or tracking code here
// Example: gtag('config', 'GA_MEASUREMENT_ID');

// ========================================
// CERTIFICATIONS MANAGEMENT
// ========================================

// Certifications storage
let certifications = [];

// Load certifications from localStorage
function loadCertifications() {
    const stored = localStorage.getItem('certifications');
    if (stored) {
        certifications = JSON.parse(stored);
        displayCertifications();
    }
}

// Save certifications to localStorage
function saveCertifications() {
    localStorage.setItem('certifications', JSON.stringify(certifications));
}

// Display certifications
function displayCertifications() {
    const grid = document.getElementById('certificationsGrid');
    const empty = document.getElementById('certificationsEmpty');
    
    if (!grid) return;
    
    if (certifications.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    
    grid.innerHTML = certifications.map((cert, index) => {
        const obtainedDate = new Date(cert.date);
        const expiryDate = cert.expiry ? new Date(cert.expiry) : null;
        const isExpired = expiryDate && expiryDate < new Date();
        
        const formattedDate = obtainedDate.toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long'
        });
        
        const formattedExpiry = expiryDate ? expiryDate.toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long'
        }) : null;
        
        return `
            <div class="certification-card">
                ${cert.expiry ? `
                    <div class="cert-status ${isExpired ? 'expired' : 'active'}">
                        <i class="fas fa-${isExpired ? 'times-circle' : 'check-circle'}"></i>
                        ${isExpired ? 'Expirée' : 'Active'}
                    </div>
                ` : ''}
                
                <div class="cert-header">
                    <div class="cert-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <div class="cert-info">
                        <h3>${cert.name}</h3>
                        <p class="cert-organization">${cert.organization}</p>
                    </div>
                </div>
                
                <div class="cert-details">
                    <div class="cert-detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>Obtenu en ${formattedDate}</span>
                    </div>
                    ${formattedExpiry ? `
                        <div class="cert-detail-item">
                            <i class="fas fa-calendar-times"></i>
                            <span>Expire en ${formattedExpiry}</span>
                        </div>
                    ` : ''}
                </div>
                
                ${cert.description ? `
                    <p class="cert-description">${cert.description}</p>
                ` : ''}
                
                ${cert.certId ? `
                    <div class="cert-id">
                        <i class="fas fa-id-card"></i> ID: ${cert.certId}
                    </div>
                ` : ''}
                
                <div class="cert-actions">
                    ${cert.url ? `
                        <a href="${cert.url}" target="_blank" class="cert-btn cert-btn-verify">
                            <i class="fas fa-external-link-alt"></i> Vérifier
                        </a>
                    ` : ''}
                    <button onclick="deleteCertification(${index})" class="cert-btn cert-btn-delete">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Delete certification (global function for onclick)
window.deleteCertification = function(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) {
        certifications.splice(index, 1);
        saveCertifications();
        displayCertifications();
    }
};

// Modal management
const modal = document.getElementById('certificationModal');
const addBtn = document.getElementById('addCertificationBtn');
const closeBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const certForm = document.getElementById('certificationForm');

// Function to close modal (defined first)
function closeModal() {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (certForm) {
        certForm.reset();
    }
}

if (addBtn) {
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Button clicked!'); // Debug
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
}

// Close modal on outside click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Form submission
if (certForm) {
    certForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('certName').value,
            organization: document.getElementById('certOrganization').value,
            date: document.getElementById('certDate').value,
            expiry: document.getElementById('certExpiry').value || null,
            certId: document.getElementById('certId').value || null,
            description: document.getElementById('certDescription').value || null,
            url: document.getElementById('certUrl').value || null
        };
        
        certifications.push(formData);
        saveCertifications();
        displayCertifications();
        closeModal();
        
        // Show success message
        alert('✅ Certification ajoutée avec succès !');
    });
}

// Load certifications on page load
loadCertifications();

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('✅ Portfolio scripts loaded successfully!');