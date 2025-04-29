const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const articlesContainer = document.querySelector('.articles-container');

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        const targetId = link.getAttribute('href').substring(1); 
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

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