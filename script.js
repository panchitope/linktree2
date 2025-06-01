document.addEventListener('DOMContentLoaded', function() {
    // Configuración del canvas para la lluvia
    const canvas = document.getElementById('rain-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Variables para la lluvia
    let drops = [];
    const dropCount = 150;
    
    // Crear gotas de lluvia
    for (let i = 0; i < dropCount; i++) {
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 5 + 5,
            opacity: Math.random() * 0.6 + 0.2
        });
    }
    
    // Función para dibujar la lluvia
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
    
    // Iniciar animación de lluvia
    drawRain();
    
    // Cambiar tema
    const themeToggle = document.getElementById('theme-toggle');
    
    // Función para detectar preferencia de color del sistema
    function detectSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    // Función para aplicar tema
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Actualizar aria-label
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        
        // Actualizar icono
        const themeIcon = document.querySelector('.theme-icon');
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Función para alternar tema
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    // Inicializar tema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = detectSystemTheme();
        
        // Usar tema guardado o tema del sistema
        const initialTheme = savedTheme || systemTheme;
        applyTheme(initialTheme);
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'light' : 'dark');
        }
    });
    
    // Configurar evento del botón
    themeToggle.addEventListener('click', toggleTheme);
    
    // Inicializar
    initTheme();
    
    // Redimensionar canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Efecto de hover para la foto de perfil
    const profilePic = document.querySelector('.profile-pic');
    
    profilePic.addEventListener('mouseenter', () => {
        profilePic.style.transform = 'scale(1.05)';
    });
    
    profilePic.addEventListener('mouseleave', () => {
        profilePic.style.transform = 'scale(1)';
    });
});