document.addEventListener('DOMContentLoaded', function() {
    // === PROTECCIÓN CONTRA COPIA Y DESCARGA ===
    // Bloquea el menú contextual (clic derecho)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Bloquea la selección de texto
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Bloquea arrastrar imágenes y enlaces
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Bloquea atajos de teclado (Ctrl+C, Ctrl+U, F12, etc.)
    document.addEventListener('keydown', function(e) {
        // Bloquear Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+C, etc.
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            return false;
        }
        // Bloquear F12 (DevTools)
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
    });

    // Desactiva la navegación por teclado (Tab)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    });

    // === PROTECCIÓN DE IMÁGENES ===
    // Evita que las imágenes se descarguen
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
    });

    // === PROTECCIÓN DEL VIDEO ===
    // Ocultar controles nativos de YouTube
    function hideYouTubeUI() {
        const iframe = document.getElementById('youtube-video');
        iframe.style.pointerEvents = 'none';
    }

    // Llama a esta función después de cargar el iframe
    document.getElementById('youtube-video').addEventListener('load', function() {
        hideYouTubeUI();
        // Forzar ocultamiento cada segundo por si YouTube lo vuelve a mostrar
        setInterval(hideYouTubeUI, 1000);
    });

    // === ANIMACIÓN DE LLUVIA (igual que antes) ===
    const canvas = document.getElementById('rain-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let drops = [];
    const dropCount = 150;
    
    for (let i = 0; i < dropCount; i++) {
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 5 + 5,
            opacity: Math.random() * 0.6 + 0.2
        });
    }
    
    function drawRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        
        drops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.lineWidth = 1;
            ctx.globalAlpha = drop.opacity;
            ctx.stroke();
            
            drop.y += drop.speed;
            
            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(drawRain);
    }
    
    drawRain();

    // === TOGGLE DE TEMA (igual que antes) ===
    const themeToggle = document.getElementById('theme-toggle');
    
    function detectSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        const themeIcon = document.querySelector('.theme-icon');
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = detectSystemTheme();
        const initialTheme = savedTheme || systemTheme;
        applyTheme(initialTheme);
    }
    
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'light' : 'dark');
        }
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    initTheme();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    const profilePic = document.querySelector('.profile-pic');
    profilePic.addEventListener('mouseenter', () => {
        profilePic.style.transform = 'scale(1.05)';
    });
    profilePic.addEventListener('mouseleave', () => {
        profilePic.style.transform = 'scale(1)';
    });

    // === CONTROLADORES DE VIDEO (igual que antes) ===
    const youtubeVideo = document.getElementById('youtube-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const unmuteBtn = document.getElementById('unmute-btn');
    const replayBtn = document.getElementById('replay-btn');

    let isPlaying = true;
    let isMuted = true;

    function postToYouTube(command, args) {
        youtubeVideo.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: command,
            args: args || []
        }), '*');
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            postToYouTube('pauseVideo');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Reproducir';
        } else {
            postToYouTube('playVideo');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        }
        isPlaying = !isPlaying;
    });

    unmuteBtn.addEventListener('click', () => {
        if (isMuted) {
            postToYouTube('unMute');
            unmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Silenciar';
        } else {
            postToYouTube('mute');
            unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Quitar silencio';
        }
        isMuted = !isMuted;
    });

    replayBtn.addEventListener('click', () => {
        postToYouTube('seekTo', [0, true]);
        postToYouTube('playVideo');
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
    });
});