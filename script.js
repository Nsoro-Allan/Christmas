document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const welcomeScreen = document.getElementById('welcomeScreen');
    const startButton = document.getElementById('startButton');
    const christmasScene = document.getElementById('christmasScene');
    const audioControl = document.getElementById('audioControl');
    const audioButton = document.getElementById('audioButton');
    const christmasAudio = document.getElementById('christmasAudio');
    const audioTooltip = document.querySelector('.audio-tooltip');
    const speakerIcon = document.querySelector('.speaker-icon');
    const muteIcon = document.querySelector('.mute-icon');
    const starsContainer = document.getElementById('starsContainer');
    const snowfall = document.getElementById('snowfall');

    let isPlaying = false;

    // Initialize effects
    createStars(120);
    createSnowflakes(60);
    createFireflies(15);

    // Start button click
    startButton.addEventListener('click', (event) => {
        // Add click effect
        createClickSparkles(event);
        
        // Hide welcome screen
        welcomeScreen.classList.add('hidden');

        // Show Christmas scene after a short delay
        setTimeout(() => {
            christmasScene.classList.add('visible');
            
            // Show audio control
            setTimeout(() => {
                audioControl.classList.add('visible');
            }, 800);

            // Create celebration effects
            createCelebrationBurst();
            createConfetti();
            addExtraSnow();

            // Try to autoplay music
            christmasAudio.volume = 0.5;
            christmasAudio.play()
                .then(() => {
                    isPlaying = true;
                    updateAudioButton();
                })
                .catch(() => {
                    isPlaying = false;
                    updateAudioButton();
                });
        }, 400);
    });

    // Audio toggle
    audioButton.addEventListener('click', (e) => {
        createClickSparkles(e);
        
        if (isPlaying) {
            christmasAudio.pause();
            isPlaying = false;
        } else {
            christmasAudio.volume = 0.5;
            christmasAudio.play()
                .then(() => {
                    isPlaying = true;
                    updateAudioButton();
                })
                .catch(err => {
                    console.log('Audio play failed:', err);
                });
        }
        updateAudioButton();
    });

    function updateAudioButton() {
        if (isPlaying) {
            audioButton.classList.add('playing');
            speakerIcon.classList.add('hidden');
            muteIcon.classList.add('hidden');
            audioTooltip.textContent = '🔇 Click to mute';
        } else {
            audioButton.classList.remove('playing');
            speakerIcon.classList.remove('hidden');
            muteIcon.classList.add('hidden');
            audioTooltip.textContent = '🎵 Click to play music';
        }
    }

    // Create twinkling stars
    function createStars(count) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 60 + '%';
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
            star.style.animationDelay = Math.random() * 5 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Create snowflakes
    function createSnowflakes(count) {
        const flakes = ['❄', '❅', '❆', '✻', '•'];
        
        for (let i = 0; i < count; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
            flake.style.left = Math.random() * 100 + '%';
            flake.style.fontSize = (Math.random() * 14 + 8) + 'px';
            flake.style.animationDuration = (Math.random() * 10 + 8) + 's';
            flake.style.animationDelay = Math.random() * 15 + 's';
            snowfall.appendChild(flake);
        }
    }

    // Create fireflies/magic dust
    function createFireflies(count) {
        for (let i = 0; i < count; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefly.style.left = Math.random() * 100 + '%';
            firefly.style.top = Math.random() * 100 + '%';
            firefly.style.animationDelay = Math.random() * 8 + 's';
            firefly.style.animationDuration = (Math.random() * 5 + 6) + 's';
            document.body.appendChild(firefly);
        }
    }

    // Add extra snow on scene reveal
    function addExtraSnow() {
        const flakes = ['❄', '❅', '❆', '✨', '⭐', '🌟'];
        
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const flake = document.createElement('div');
                flake.className = 'snowflake';
                flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
                flake.style.left = Math.random() * 100 + '%';
                flake.style.fontSize = (Math.random() * 18 + 12) + 'px';
                flake.style.animationDuration = (Math.random() * 4 + 3) + 's';
                flake.style.animationDelay = '0s';
                snowfall.appendChild(flake);
                
                setTimeout(() => flake.remove(), 7000);
            }, i * 80);
        }
    }

    // Celebration burst effect
    function createCelebrationBurst() {
        const sparkles = ['✨', '⭐', '🌟', '💫', '✦', '❄', '🎄', '🎁'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 30 + 15}px;
                    left: ${Math.random() * 100}vw;
                    top: ${Math.random() * 100}vh;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0;
                    animation: sparkleFloat 3s ease-out forwards;
                `;
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 3000);
            }, i * 40);
        }
    }

    // Confetti effect
    function createConfetti() {
        const colors = ['#c41e3a', '#ffd700', '#165b33', '#4dabf7', '#a78bfa', '#ff6b6b'];
        
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    animation-duration: ${Math.random() * 2 + 2}s;
                    animation-delay: ${Math.random() * 0.5}s;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    }

    // Click sparkles effect
    function createClickSparkles(e) {
        const sparkles = ['✨', '⭐', '💫'];
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX || rect.left + rect.width / 2;
        const y = e.clientY || rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'magic-sparkle';
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            sparkle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                font-size: ${Math.random() * 15 + 10}px;
                transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px);
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Add sparkle animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg) translateY(0);
            }
            20% {
                opacity: 1;
                transform: scale(1) rotate(90deg) translateY(-20px);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) rotate(360deg) translateY(-100px);
            }
        }
        
        .speaker-icon.hidden,
        .mute-icon.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Continuous snow generation
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            const flakes = ['❄', '❅', '❆'];
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
            flake.style.left = Math.random() * 100 + '%';
            flake.style.fontSize = (Math.random() * 12 + 8) + 'px';
            flake.style.animationDuration = (Math.random() * 10 + 8) + 's';
            flake.style.animationDelay = '0s';
            snowfall.appendChild(flake);
            
            // Remove old snowflakes to prevent memory issues
            const allFlakes = snowfall.querySelectorAll('.snowflake');
            if (allFlakes.length > 120) {
                allFlakes[0].remove();
            }
        }
    }, 250);

    // Mouse move sparkle trail (subtle)
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime > 100 && Math.random() > 0.7) {
            lastSparkleTime = now;
            const sparkle = document.createElement('div');
            sparkle.className = 'magic-sparkle';
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 12px;
                pointer-events: none;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    });

    // Periodic magic effects
    setInterval(() => {
        if (christmasScene.classList.contains('visible') && Math.random() > 0.6) {
            // Random sparkle burst somewhere on screen
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.7;
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'magic-sparkle';
                    sparkle.textContent = ['✨', '⭐', '🌟'][Math.floor(Math.random() * 3)];
                    sparkle.style.cssText = `
                        left: ${x + (Math.random() - 0.5) * 50}px;
                        top: ${y + (Math.random() - 0.5) * 50}px;
                        font-size: ${Math.random() * 15 + 10}px;
                    `;
                    document.body.appendChild(sparkle);
                    setTimeout(() => sparkle.remove(), 1000);
                }, i * 100);
            }
        }
    }, 4000);
});
