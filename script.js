document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const beachVideo = document.getElementById('beach-video');
    const rainVideo = document.getElementById('rain-video');
    const beachAudio = document.getElementById('beach-audio');
    const rainAudio = document.getElementById('rain-audio');
    const timeDisplay = document.querySelector('.time-display');
    const playButton = document.querySelector('.play');
    const timeButtons = document.querySelectorAll('.time-select button');
    const soundButtons = document.querySelectorAll('.sound-picker button');
    
    // State variables
    let currentVideo = beachVideo;
    let currentAudio = beachAudio;
    let isPlaying = false;
    let meditationTime = 600; // 10 minutes in seconds (10 * 60)
    let timerInterval = null;
    
    // Format time function
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs}`;
    }
    
    // Update time display
    function updateTimeDisplay() {
        timeDisplay.textContent = formatTime(meditationTime);
    }
    
    // Start meditation timer
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            if (meditationTime > 0) {
                meditationTime--;
                updateTimeDisplay();
            } else {
                // Time's up - pause meditation
                pauseMeditation();
                alert('Meditation complete!');
            }
        }, 1000);
    }
    
    // Pause meditation
    function pauseMeditation() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        currentVideo.pause();
        currentAudio.pause();
        isPlaying = false;
        playButton.textContent = '▶';
    }
    
    // Play meditation
    function playMeditation() {
        currentVideo.play();
        currentAudio.play();
        startTimer();
        isPlaying = true;
        playButton.textContent = '⏸';
    }
    
    // Switch meditation mode (video and sound)
    function switchMeditationMode(mode) {
        // Pause current meditation if playing
        if (isPlaying) {
            pauseMeditation();
        }
        
        // Hide all videos
        beachVideo.style.display = 'none';
        rainVideo.style.display = 'none';
        
        // Show and set current video
        if (mode === 'beach') {
            beachVideo.style.display = 'block';
            currentVideo = beachVideo;
            currentAudio = beachAudio;
        } else {
            rainVideo.style.display = 'block';
            currentVideo = rainVideo;
            currentAudio = rainAudio;
        }
        
        // Update active button states
        soundButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        if (mode === 'beach') {
            document.getElementById('beach-sound').classList.add('active');
        } else {
            document.getElementById('rain-sound').classList.add('active');
        }
        
        // If was playing, resume with new mode
        if (isPlaying) {
            playMeditation();
        }
    }
    
    // Event Listeners
    
    // Play/Pause button
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseMeditation();
        } else {
            playMeditation();
        }
    });
    
    // Time selection buttons
    timeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const minutes = parseInt(e.target.dataset.time);
            meditationTime = minutes * 60;
            updateTimeDisplay();
            
            // If currently playing, restart timer with new time
            if (isPlaying) {
                pauseMeditation();
                playMeditation();
            }
        });
    });
    
    // Sound picker buttons
    document.getElementById('beach-sound').addEventListener('click', () => {
        switchMeditationMode('beach');
    });
    
    document.getElementById('rain-sound').addEventListener('click', () => {
        switchMeditationMode('rain');
    });
    
    // Initialize with beach mode
    beachVideo.style.display = 'block';
    rainVideo.style.display = 'none';
    currentVideo = beachVideo;
    currentAudio = beachAudio;
    updateTimeDisplay();
    
    // Ensure videos are muted by default and play when possible
    beachVideo.muted = true;
    rainVideo.muted = true;
    
    // Preload videos
    beachVideo.load();
    rainVideo.load();
});