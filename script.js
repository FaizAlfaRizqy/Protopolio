// Page navigation
let currentPage = 1;
const totalPages = 4;

// Slider functionality (Hero page)
let currentSlide = 1;
const totalSlides = 3;
let autoSlideInterval;

// Project slider functionality
let currentProject = 1;
const totalProjects = 4;
let currentProjectImages = {}; // Track current image index for each project

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slider
    showSlide(currentSlide);
    startAutoSlide();
    
    // Initialize project images tracking
    for (let i = 1; i <= totalProjects; i++) {
        currentProjectImages[i] = 0; // Start at first image for each project
    }
    
    // Show first project by default
    showProject(1);
    
    const contentWrapper = document.querySelector('.content-wrapper');
    const videoBackground = document.querySelector('.video-background');
    
    // Add click event to hero slide indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index + 1;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });
    
    // Add click event to project list items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const projectNum = parseInt(item.getAttribute('data-project'));
            if (projectNum && projectNum <= totalProjects) {
                currentProject = projectNum;
                showProject(currentProject);
            }
        });
    });
    
    // Scroll event listener to update page counter and video background
    let scrollTimeout;
    contentWrapper.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updatePageFromScroll();
        }, 100);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentPage === 1) {
                previousSlide();
            }
        } else if (e.key === 'ArrowRight') {
            if (currentPage === 1) {
                nextSlide();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            scrollToPage(currentPage + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            scrollToPage(currentPage - 1);
        }
    });
});

// Update page based on scroll position
function updatePageFromScroll() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const sections = document.querySelectorAll('.page-section');
    const videoBackground = document.querySelector('.video-background');
    const pageCounter = document.querySelector('.page-counter');
    
    let closestSection = 1;
    let minDistance = Infinity;
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        if (distance < minDistance) {
            minDistance = distance;
            closestSection = index + 1;
        }
    });
    
    if (closestSection !== currentPage) {
        currentPage = closestSection;
        pageCounter.textContent = `${currentPage} / ${totalPages}`;
        updateNavbar();
        
        // Toggle video background
        if (currentPage > 1) {
            videoBackground.classList.add('active');
        } else {
            videoBackground.classList.remove('active');
        }
    }
}

// Scroll to specific page
function scrollToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    
    const sections = document.querySelectorAll('.page-section');
    const targetSection = sections[pageNum - 1];
    
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateNavbar() {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (navLinks[currentPage - 1]) {
        navLinks[currentPage - 1].classList.add('active');
    }
}

// Hero Slider Functions
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
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
}

function nextSlide() {
    stopAutoSlide();
    currentSlide++;
    showSlide(currentSlide);
    startAutoSlide();
}

function previousSlide() {
    stopAutoSlide();
    currentSlide--;
    showSlide(currentSlide);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Project Slider Functions
function showProject(n) {
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Wrap around
    if (n > totalProjects) {
        currentProject = 1;
    }
    if (n < 1) {
        currentProject = totalProjects;
    }
    
    // Hide all project slides
    projectSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current project slide
    if (projectSlides[currentProject - 1]) {
        projectSlides[currentProject - 1].classList.add('active');
    }
    
    // Update project list active state
    projectItems.forEach(item => {
        item.classList.remove('active');
        const itemProject = parseInt(item.getAttribute('data-project'));
        if (itemProject === currentProject) {
            item.classList.add('active');
        }
    });
}

// Project Image Navigation Functions
function showProjectImage(projectNum, imageIndex) {
    const projectSlide = document.querySelector(`.project-slide[data-project="${projectNum}"]`);
    if (!projectSlide) return;
    
    const images = projectSlide.querySelectorAll('.project-image');
    const dots = projectSlide.querySelectorAll('.image-dot');
    
    // Update current image index
    currentProjectImages[projectNum] = imageIndex;
    
    // Hide all images
    images.forEach(img => img.classList.remove('active'));
    
    // Show selected image
    if (images[imageIndex]) {
        images[imageIndex].classList.add('active');
    }
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[imageIndex]) {
        dots[imageIndex].classList.add('active');
    }
}

function nextProjectImage(projectNum) {
    const projectSlide = document.querySelector(`.project-slide[data-project="${projectNum}"]`);
    if (!projectSlide) return;
    
    const images = projectSlide.querySelectorAll('.project-image');
    let currentIndex = currentProjectImages[projectNum];
    currentIndex = (currentIndex + 1) % images.length;
    
    showProjectImage(projectNum, currentIndex);
}

function previousProjectImage(projectNum) {
    const projectSlide = document.querySelector(`.project-slide[data-project="${projectNum}"]`);
    if (!projectSlide) return;
    
    const images = projectSlide.querySelectorAll('.project-image');
    let currentIndex = currentProjectImages[projectNum];
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    
    showProjectImage(projectNum, currentIndex);
}

// Navbar click handling
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll to corresponding page
        scrollToPage(index + 1);
    });
});

// Mouse wheel support for hero slider
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
    
    // Touch/swipe support for mobile (slider only, not page navigation)
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSliderSwipe();
    });
    
    function handleSliderSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}
