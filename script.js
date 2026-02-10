// Slider functionality
let currentSlide = 1;
const totalSlides = 3;
let autoSlideInterval;

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    startAutoSlide();
    
    // Add click event to indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index + 1;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});

// Show specific slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const counter = document.querySelector('.slider-counter');
    
    // Wrap around
    if (n > totalSlides) {
        currentSlide = 1;
    }
    if (n < 1) {
        currentSlide = totalSlides;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    slides[currentSlide - 1].classList.add('active');
    
    // Update counter
    counter.textContent = `${currentSlide} / ${totalSlides}`;
}

// Next slide
function nextSlide() {
    stopAutoSlide();
    currentSlide++;
    showSlide(currentSlide);
    startAutoSlide();
}

// Previous slide
function previousSlide() {
    stopAutoSlide();
    currentSlide--;
    showSlide(currentSlide);
    startAutoSlide();
}

// Auto slide every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Stop auto slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Navbar active state
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href');
        
        // Smooth scroll would go here if you have other sections
        // For now, just update the active state
    });
});

// Optional: Add mouse wheel support for slider
const slider = document.querySelector('.slider');
if (slider) {
    let isScrolling = false;
    
    slider.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        isScrolling = true;
        
        if (e.deltaY > 0) {
            nextSlide();
        } else if (e.deltaY < 0) {
            previousSlide();
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    });
}

// Optional: Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (slider) {
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        previousSlide();
    }
}
