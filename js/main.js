// =========================================
// 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
// =========================================
const themeToggleBtns = document.querySelectorAll('.theme-toggle'); // Находим ВСЕ кнопки с этим классом
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
}

// Перебираем все найденные кнопки и вешаем на каждую событие
themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('theme-light');
        if (document.body.classList.contains('theme-light')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
});


// =========================================
// 2. СЛАЙДЕР
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


const genresList = ['Экшен', 'RPG', 'Стратегии', 'Инди', 'Хорроры', 'Симуляторы', 'Спортивные'];

if (genreInput && genreSuggestions) {
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

// =========================================
// 5. ПЕРЕКЛЮЧЕНИЕ ТАБОВ В ЛИЧНОМ КАБИНЕТЕ
// =========================================
const tabButtons = document.querySelectorAll('.profile-sidebar__link');
const tabs = document.querySelectorAll('.profile-tab');

if (tabButtons.length > 0 && tabs.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Убираем активный класс у всех кнопок и табов
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            // 2. Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            // 3. Находим ID таба и показываем его
            const tabId = button.getAttribute('data-tab');
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
}

// =========================================
// 6. ИМИТАЦИЯ АВТОРИЗАЦИИ (ПЕРЕХОДЫ)
// =========================================

// Обработка формы входа
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'profile.html'; 
    });
}

// Обработка формы регистрации
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
    
        
        window.location.href = 'login.html';
    });
}


// =========================================
// 7. МОБИЛЬНЫЙ ФИЛЬТР В КАТАЛОГЕ
// =========================================
const openFilterBtn = document.getElementById('openFilterBtn');
const closeFilterBtn = document.getElementById('closeFilterBtn');
const filterSidebar = document.getElementById('filterSidebar');

if (openFilterBtn && closeFilterBtn && filterSidebar) {
    openFilterBtn.addEventListener('click', () => {
        filterSidebar.classList.add('active');
    });

    closeFilterBtn.addEventListener('click', () => {
        filterSidebar.classList.remove('active');
    });
}