// =========================================
// 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
// =========================================
const themeToggleBtn = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
    if (document.body.classList.contains('theme-light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});


// =========================================
// 2. СЛАЙДЕР (ЗАПУСКАЕТСЯ ТОЛЬКО ПОСЛЕ ЗАГРУЗКИ HTML)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Если кнопок нет на странице, скрипт просто остановится (не будет ошибки)
    if (!sliderTrack || !prevBtn || !nextBtn) {
        console.log("Элементы слайдера не найдены на этой странице");
        return; 
    }

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slider__slide').length;

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= totalSlides) { currentSlide = 0; }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) { currentSlide = totalSlides - 1; }
        updateSlider();
    });
});

// =========================================
// 3. ПОИСК ПО ЖАНРАМ С ПОДСКАЗКАМИ
// =========================================
const genreInput = document.getElementById('genreInput');
const genreSuggestions = document.getElementById('genreSuggestions');

// Наш список жанров (в будущем его можно брать из базы данных)
const genresList = ['Экшен', 'RPG', 'Стратегии', 'Инди', 'Хорроры', 'Симуляторы', 'Спортивные'];

if (genreInput && genreSuggestions) {
    // Слушаем ввод пользователя
    genreInput.addEventListener('input', () => {
        const value = genreInput.value.toLowerCase(); // Приводим к нижнему регистру для удобства
        
        // Очищаем предыдущие подсказки
        genreSuggestions.innerHTML = '';
        
        // Если поле пустое — скрываем список
        if (value.length === 0) {
            genreSuggestions.classList.remove('active');
            return;
        }

        // Ищем совпадения
        const matches = genresList.filter(genre => 
            genre.toLowerCase().includes(value)
        );

        // Если есть совпадения — показываем их
        if (matches.length > 0) {
            genreSuggestions.classList.add('active');
            
            matches.forEach(match => {
                const li = document.createElement('li');
                li.textContent = match;
                li.classList.add('genres__suggestion-item');
                
                // При клике на подсказку — подставляем её в поле и переходим
                li.addEventListener('click', () => {
                    genreInput.value = match;
                    genreSuggestions.classList.remove('active');
                    // В будущем тут можно сделать переход в каталог с фильтром
                    // window.location.href = `catalog.html?genre=${match}`;
                });
                
                genreSuggestions.appendChild(li);
            });
        } else {
            genreSuggestions.classList.remove('active');
        }
    });

    // Скрываем подсказки, если кликнули мимо поля
    document.addEventListener('click', (e) => {
        if (!genreInput.contains(e.target) && !genreSuggestions.contains(e.target)) {
            genreSuggestions.classList.remove('active');
        }
    });
}