// DOM Elements
const searchForm = document.querySelector('.search-form');
const destinationInput = document.querySelector('.destination-input');
const datesInput = document.querySelector('.dates-input');
const travelersInput = document.querySelector('.travelers-input');
const carouselIndicators = document.querySelectorAll('.indicator');
const destinationCards = document.querySelectorAll('.destination-card');
const newsletterForm = document.querySelector('.newsletter-form');

// Search Form Functionality
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const destination = destinationInput.value.trim();
    const dates = datesInput.value.trim();
    const travelers = travelersInput.value.trim();
    
    if (!destination) {
        alert('Please enter a destination');
        destinationInput.focus();
        return;
    }
    
    // Simulate search functionality
    console.log('Searching for:', {
        destination,
        dates: dates || 'Flexible dates',
        travelers: travelers || '1 traveler'
    });
    
    // Add loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = 'SEARCHING...';
    searchBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Searching for trips to ${destination}!`);
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
    }, 2000);
});

// Input placeholders with dynamic text
const destinationPlaceholders = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'London, UK',
    'Bali, Indonesia'
];

const travelersOptions = [
    '1 traveler',
    '2 travelers',
    '3 travelers',
    '4+ travelers',
    'Family (2 adults, 2 children)'
];

let placeholderIndex = 0;

// Rotate destination placeholder
setInterval(() => {
    if (destinationInput && !destinationInput.value) {
        destinationInput.placeholder = destinationPlaceholders[placeholderIndex];
        placeholderIndex = (placeholderIndex + 1) % destinationPlaceholders.length;
    }
}, 3000);

// Date input functionality
datesInput.addEventListener('focus', function() {
    this.type = 'date';
});

datesInput.addEventListener('blur', function() {
    if (!this.value) {
        this.type = 'text';
        this.placeholder = 'Dates';
    }
});

// Travelers dropdown simulation
travelersInput.addEventListener('focus', function() {
    // Create a simple dropdown effect
    this.placeholder = 'Select number of travelers';
});

travelersInput.addEventListener('click', function() {
    // Simulate dropdown options
    const travelers = prompt('How many travelers?\n1. 1 traveler\n2. 2 travelers\n3. 3 travelers\n4. 4+ travelers\n\nEnter number (1-4):');
    if (travelers && travelers >= 1 && travelers <= 4) {
        this.value = travelersOptions[parseInt(travelers) - 1];
    }
});

// Carousel functionality
let currentSlide = 0;
const totalSlides = carouselIndicators.length;

function updateCarousel() {
    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update hero background (simulate different images)
    const heroBackground = document.querySelector('.hero-background');
    const gradients = [
        'linear-gradient(135deg, rgba(255, 107, 107, 0.8) 0%, rgba(255, 140, 66, 0.8) 25%, rgba(78, 84, 200, 0.8) 75%, rgba(45, 52, 54, 0.9) 100%)',
        'linear-gradient(135deg, rgba(78, 84, 200, 0.8) 0%, rgba(107, 255, 107, 0.8) 25%, rgba(255, 140, 66, 0.8) 75%, rgba(45, 52, 54, 0.9) 100%)',
        'linear-gradient(135deg, rgba(255, 140, 66, 0.8) 0%, rgba(78, 84, 200, 0.8) 25%, rgba(255, 107, 107, 0.8) 75%, rgba(45, 52, 54, 0.9) 100%)',
        'linear-gradient(135deg, rgba(107, 255, 107, 0.8) 0%, rgba(255, 107, 107, 0.8) 25%, rgba(78, 84, 200, 0.8) 75%, rgba(45, 52, 54, 0.9) 100%)',
        'linear-gradient(135deg, rgba(255, 107, 255, 0.8) 0%, rgba(107, 255, 255, 0.8) 25%, rgba(255, 255, 107, 0.8) 75%, rgba(45, 52, 54, 0.9) 100%)'
    ];
    
    heroBackground.style.background = gradients[currentSlide];
}

// Carousel indicators click
carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-advance carousel
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Destination cards interaction
destinationCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title').textContent;
        destinationInput.value = title;
        destinationInput.focus();
        
        // Smooth scroll to search form
        document.querySelector('.search-container').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Newsletter form
const newsletterBtn = document.querySelector('.newsletter-btn');
const newsletterInput = document.querySelector('.newsletter-input');

if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            newsletterInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            newsletterInput.focus();
            return;
        }
        
        // Simulate subscription
        const originalText = this.textContent;
        this.textContent = 'SIGNING UP...';
        this.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            newsletterInput.value = '';
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Search icon functionality
document.querySelector('.search-icon').addEventListener('click', function() {
    destinationInput.focus();
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation for page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (placeholder for future implementation)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.style.display = 'none';

// Add mobile menu button to navigation
const navContainer = document.querySelector('.nav-container');
if (navContainer) {
    navContainer.appendChild(mobileMenuBtn);
}

// Show mobile menu button on small screens
function checkScreenSize() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        if (navMenu) navMenu.style.display = 'none';
    } else {
        mobileMenuBtn.style.display = 'none';
        if (navMenu) navMenu.style.display = 'flex';
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// Initialize carousel
updateCarousel();

console.log('Travel booking homepage loaded successfully!');