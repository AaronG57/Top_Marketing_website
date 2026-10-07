document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu & Dropdown Logic ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if(mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => mainNav.classList.toggle('show'));
    }

    const dropdownLink = document.querySelector('.dropdown > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownLink && dropdownMenu) {
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show-mobile');
            }
        });
    }

    // --- 2. Contact Form Logic (Only runs if form exists) ---
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Remove when linking to a real backend like Formspree
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.backgroundColor = '#94a3b8';
            submitBtn.disabled = true;

            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.style.backgroundColor = '#10b981';
                submitBtn.disabled = false;
                formStatus.style.color = '#10b981';
                formStatus.innerText = 'Thank you! Your message has been sent successfully.';
                setTimeout(() => {
                    submitBtn.style.backgroundColor = '#dc2626';
                    formStatus.innerText = '';
                }, 5000);
            }, 2000);
        });
    }

    // --- 3. Chatbot Logic ---
    const chatToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const chatClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatbotMessages');

    if(chatToggle) {
        chatToggle.addEventListener('click', () => chatWindow.classList.add('active'));
        chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

        const faqDatabase = [
            { keywords: ["hour", "open", "time", "close"], answer: "Our business hours are Monday through Friday, from 8:00 AM to 4:00 PM." },
            { keywords: ["where", "location", "address", "visit"], answer: "We are located at ul. Kołacińska 35, 03-171 Warszawa, Poland." },
            { keywords: ["phone", "call", "number"], answer: "You can reach us by phone at +48 22 811 57 02." },
            { keywords: ["services", "offer", "do you do"], answer: "We specialize in Custom Promotional Sweets, unique Gift Sets, Manufacturing of boxes, and Co-packing services!" },
            { keywords: ["co-packing", "packing", "copacking"], answer: "Yes, we offer professional co-packing and packaging of goods. Please head to our Contact page for a quote!" }
        ];

        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
            msgDiv.innerText = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function generateBotResponse(userInput) {
            let lowerInput = userInput.toLowerCase();
            let foundResponse = "I'm not exactly sure, but if you fill out the contact form on our website, our team will get back to you quickly!";
            for (let item of faqDatabase) {
                if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
                    foundResponse = item.answer;
                    break;
                }
            }
            setTimeout(() => appendMessage(foundResponse, 'bot'), 600);
        }

        function handleSend() {
            const text = chatInput.value.trim();
            if (text === '') return;
            appendMessage(text, 'user');
            chatInput.value = '';
            generateBotResponse(text);
        }

        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
    }
});