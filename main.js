const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const articlesContainer = document.querySelector('.articles-container');
const form = document.querySelector('.form-group');
const successMessage = document.getElementById('success-message');

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


form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    clearErrors()

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let isValid = true;

    if (!name){
        showError('name-error', 'Name is required.');
        isValid = false;
    }

    if (!email) {
        showError('email-error', 'Email is required.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!subject) {
        showError('subject-error', 'Subject is required.');
        isValid = false;
    }

    if (isValid) {
        fetch('http://127.0.0.1:5000/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                phone: phone
            }),
        })
            .then(response => {
                if (response.ok) {
                    successMessage.textContent = 'Email sent successfully!';
                    successMessage.style.display = 'block';
                    form.reset(); 
                } else {
                    showError('form-error', 'Failed to send email. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showError('subject-error', 'An error occurred. Please try again later.');
            });
    }
    
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    });
}