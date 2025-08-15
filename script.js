// Set current date
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Image modal functionality
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImg.src = element.querySelector('img').src;
    captionText.innerHTML = element.querySelector('img').alt;
    
    // Add animation
    modalImg.style.transform = 'scale(0.8)';
    modalImg.style.opacity = '0';
    
    setTimeout(() => {
        modalImg.style.transform = 'scale(1)';
        modalImg.style.opacity = '1';
        modalImg.style.transition = 'all 0.3s ease';
    }, 50);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modalImg.style.transform = 'scale(0.8)';
    modalImg.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Video placeholder functionality
// script.js - replace the old playVideo() with this full block
let currentVideoElement = null; // to track the playing video
let currentVideoBox = null;     // to track which box is playing

function playVideo(videoNumber) {
    const videoFiles = {
        1: "photos/nvid3.mp4",
        2: "photos/nvid2.mp4",
        3: "photos/nvid1.mp4"
    };

    const box = document.getElementById(`videoBox${videoNumber}`);
    const src = videoFiles[videoNumber];

    if (!src) {
        alert(`No video found for ${videoNumber}`);
        return;
    }

    // If another video is currently playing, stop and restore its placeholder
    if (currentVideoElement && currentVideoBox) {
        currentVideoElement.pause();
        currentVideoBox.innerHTML = `
            <div class="play-button" onclick="playVideo(${currentVideoBox.dataset.videoNum})">▶️</div>
            <p>${currentVideoBox.dataset.videoTitle}</p>
        `;
        currentVideoElement = null;
        currentVideoBox = null;
    }

    // Save data attributes so we can restore later
    box.dataset.videoNum = videoNumber;
    box.dataset.videoTitle = box.querySelector("p")?.innerText || "";

    // Replace placeholder with <video>
    box.innerHTML = `
        <video width="100%" controls autoplay>
            <source src="${src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    // Track the current playing video
    currentVideoElement = box.querySelector("video");
    currentVideoBox = box;
}



// Random birthday wishes
const birthdayWishes = [
    "🎉 May your birthday be filled with sunshine, smiles, laughter, love, and like all the happiness you bring into your lives! 🌟",
    "🎂 Another year older, another year wiser, and another year more amazing! Happy Birthday! ✨",
    "🎈 On your special day, I wish you all the very best, all the joy you can ever have and may you be blessed abundantly today, tomorrow and the days to come! 🌈",
    "🎁 May this birthday bring you lots of joy and fun. May all your birthday wishes come true! 🎊",
    "🌟 Wishing you a day filled with happiness and a year filled with joy. Happy birthday! 🎉",
    "🎂 May your birthday be the start of a year filled with good luck, good health and much happiness! 💖",
    "🎈 Another adventure filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor! 🎪",
    "✨ Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday! 🌺",
    "🎉 May you live all the days of your life and may today be the most special one! 🌟",
    "🎁 Birthdays are a new start, a fresh beginning and a time to pursue new endeavors with new goals. Move forward with confidence and courage! 🚀"
];

function showRandomWish() {
    const randomWishElement = document.getElementById('random-wish');
    const randomIndex = Math.floor(Math.random() * birthdayWishes.length);
    const selectedWish = birthdayWishes[randomIndex];
    
    // Add fade out effect
    randomWishElement.style.opacity = '0';
    randomWishElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        randomWishElement.textContent = selectedWish;
        randomWishElement.style.opacity = '1';
        randomWishElement.style.transform = 'translateY(0)';
        randomWishElement.style.transition = 'all 0.5s ease';
        
        // Add sparkle effect
        createSparkles(randomWishElement);
    }, 300);
}

// Create sparkle animation
function createSparkles(element) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        sparkle.animate([
            { transform: 'translateY(0px) scale(0)', opacity: 1 },
            { transform: 'translateY(-50px) scale(1)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Add scroll animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.memory-card, .gallery-item, .video-item');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.memory-card, .gallery-item, .video-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Check initial state
});

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(heart);
    
    heart.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'ease-out'
    }).onfinish = () => {
        heart.remove();
    };
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add birthday countdown (optional)
function updateCountdown() {
    const now = new Date().getTime();
    const birthday = new Date();
    birthday.setMonth(birthday.getMonth() + 1); // Next month for demo
    birthday.setDate(1); // Set to first day of next month
    
    const distance = birthday - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // You can add a countdown display if needed
        console.log(`Next birthday in: ${days}d ${hours}h ${minutes}m`);
    }
}


// Update countdown every minute
setInterval(updateCountdown, 60000);