const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const articlesContainer = document.querySelector('.articles-container');

prevBtn.addEventListener('click', () => {
    articlesContainer.scrollBy({
        left: -516, 
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    articlesContainer.scrollBy({
        left: 516, 
        behavior: 'smooth'
    });
});