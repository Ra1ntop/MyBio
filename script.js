/**
 * Switches between Home and About sections
 * @param {string} sectionId - The ID of the section to display
 */
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the target section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll-reveal animation for cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Apply initial styles and start observing cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });
});


// Function to animate metrics when they come into view
const animateMetrics = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "countUp 1s ease-out forwards";
            observer.unobserve(entry.target);
        }
    });
};

const metricsObserver = new IntersectionObserver(animateMetrics, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
    metricsObserver.observe(card);
});


// Function to handle roadmap visibility on scroll
const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.roadmap-item').forEach(item => {
        roadmapObserver.observe(item);
    });
});


/* --- SLIDER LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    // Если слайдера нет на странице, выходим, чтобы не было ошибок
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    let currentSlideIndex = 0;
    let autoPlayInterval;

    // Функция для обновления позиции слайдера
    const updateSliderPosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * currentSlideIndex) + 'px)';
    };

    // Переключение на следующий слайд
    const moveToNextSlide = () => {
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        updateSliderPosition();
    };

    // Переключение на предыдущий слайд
    const moveToPrevSlide = () => {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        updateSliderPosition();
    };

    // Обработчики кнопок
    nextButton.addEventListener('click', () => {
        moveToNextSlide();
        resetAutoPlay(); // Сбрасываем таймер при ручном переключении
    });

    prevButton.addEventListener('click', () => {
        moveToPrevSlide();
        resetAutoPlay();
    });

    // Автоматическое переключение каждые 5 секунд
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(moveToNextSlide, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Обновляем позицию при изменении размера окна
    window.addEventListener('resize', updateSliderPosition);

    // Запускаем автопрокрутку
    startAutoPlay();
});