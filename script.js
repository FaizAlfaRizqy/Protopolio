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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slider
    showSlide(currentSlide);
    startAutoSlide();
    
    // Initialize page
    showPage(currentPage);
    
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
    
    // Add click event to project dots
    const projectDots = document.querySelectorAll('.project-dot');
    projectDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProject = index + 1;
            showProject(currentProject);
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
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const heroSection = document.querySelector('.hero-section');
        const projectsSection = document.querySelector('.projects-section');
        
        if (heroSection && !heroSection.classList.contains('hidden')) {
            // Hero page navigation
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        } else if (projectsSection && projectsSection.classList.contains('active')) {
            // Projects page navigation
            if (e.key === 'ArrowLeft') {
                previousProject();
            } else if (e.key === 'ArrowRight') {
                nextProject();
            }
        }
        
        // Page navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            previousPage();
        }
    });
});

// Page Navigation Functions
function showPage(pageNum) {
    const heroSection = document.querySelector('.hero-section');
    const projectsSection = document.querySelector('.projects-section');
    const videoBackground = document.querySelector('.video-background');
    const pageCounter = document.querySelector('.page-counter');
    
    // Update page counter
    pageCounter.textContent = `${pageNum} / ${totalPages}`;
    currentPage = pageNum;
    
    // Hide all sections
    heroSection.classList.add('hidden');
    projectsSection.classList.remove('active');
    
    // Show appropriate section
    if (pageNum === 1) {
        heroSection.classList.remove('hidden');
        videoBackground.classList.remove('active');
    } else if (pageNum === 2) {
        projectsSection.classList.add('active');
        videoBackground.classList.add('active');
    }
    // Add more pages here (3 = experiences, 4 = contact)
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateNavbar();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateNavbar();
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

function nextProject() {
    currentProject++;
    showProject(currentProject);
}

function previousProject() {
    currentProject--;
    showProject(currentProject);
}

// Navbar click handling
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Navigate to corresponding page
        currentPage = index + 1;
        showPage(currentPage);
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
}

// Touch/swipe support for mobile
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
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        previousSlide();
    }
}
