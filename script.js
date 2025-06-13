document.addEventListener('DOMContentLoaded', function() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const backBtn = document.getElementById('sliderBack');
    const nextBtn = document.getElementById('sliderNext');
    
    const slideImages = [
        'assets/1998 Selo Nobel José Saramago.png',
        'assets/Selo Nobel José Saramago 2.png',
        'assets/1998 Selo Nobel José Saramago.png',
        'assets/Selo Nobel José Saramago 2.png',
        'assets/1998 Selo Nobel José Saramago.png',
        'assets/Selo Nobel José Saramago 2.png'
    ];

    // Create slides (original + clones for looping)
    function createSlides() {
        // First add clones of the last few slides at beginning
        for (let i = slideImages.length - 3; i < slideImages.length; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${slideImages[i]}">`;
            slidesWrapper.appendChild(slide);
        }
        
        // Add all original slides
        slideImages.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${img}">`;
            slidesWrapper.appendChild(slide);
        });
        
        // Add clones of first few slides at end
        for (let i = 0; i < 3; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${slideImages[i]}">`;
            slidesWrapper.appendChild(slide);
        }
    }

    createSlides();
    
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 3; // Start at first original slide
    let isTransitioning = false;
    const slideWidth = 100 / 3; // Each slide takes 1/3 of viewport
    
    updateSliderPosition();

    function updateSliderPosition() {
        // Update classes for preview/center slides
        slides.forEach((slide, index) => {
            slide.classList.remove('slide-preview', 'slide-center');
            
            if (index === currentIndex - 1) {
                slide.classList.add('slide-preview');
            } else if (index === currentIndex) {
                slide.classList.add('slide-center');
            } else if (index === currentIndex + 1) {
                slide.classList.add('slide-preview');
            }
        });
        
        // Calculate and apply transform
        const offset = currentIndex * slideWidth;
        slidesWrapper.style.transform = `translateX(-${offset}%)`;
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex = index;
        slidesWrapper.style.transition = 'transform 0.5s ease';
        updateSliderPosition();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    slidesWrapper.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        // Check if we need to loop (forward)
        if (currentIndex >= slides.length - 3) {
            slidesWrapper.style.transition = 'none';
            currentIndex = 3; // Jump to first original slide
            updateSliderPosition();
            setTimeout(() => {
                slidesWrapper.style.transition = 'transform 0.5s ease';
            }, 10);
        }
        // Check if we need to loop (backward)
        else if (currentIndex <= 2) {
            slidesWrapper.style.transition = 'none';
            currentIndex = slides.length - 6; // Jump to last original slide
            updateSliderPosition();
            setTimeout(() => {
                slidesWrapper.style.transition = 'transform 0.5s ease';
            }, 10);
        }
    });

    nextBtn.addEventListener('click', nextSlide);
    backBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
});