// Crear animación de lluvia infinita mejorada
function createInfiniteRain() {
    const rainContainer = document.getElementById('rain');
    const dropsCount = 200; // Más gotas para efecto más denso
    
    // Función para crear una gota individual
    const createDrop = () => {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        
        // Posición aleatoria
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.top = Math.random() * -100 + 'px';
        
        // Tamaño aleatorio
        const height = Math.random() * 20 + 10;
        drop.style.height = height + 'px';
        drop.style.width = (height / 10) + 'px';
        
        // Velocidad aleatoria
        const duration = Math.random() * 1 + 0.5;
        drop.style.animationDuration = duration + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        
        // Eliminar la gota cuando termine su animación
        drop.addEventListener('animationend', function() {
            this.remove();
            createDrop(); // Crear nueva gota cuando una desaparece
        });
        
        rainContainer.appendChild(drop);
    };
    
    // Crear gotas iniciales
    for (let i = 0; i < dropsCount; i++) {
        createDrop();
    }
}

// Cambiar imagen de perfil
function changeProfilePic() {
    const profilePic = document.getElementById('profilePic');
    // Reemplaza esta URL con tu imagen personalizada
    profilePic.src = 'tufoto.jpg';
}

// Deshabilitar clic derecho y selección de texto
function disableCopy() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
}

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    createInfiniteRain();
    changeProfilePic();
    disableCopy();
    
    // Todos los enlaces se abren en nueva pestaña (ya está en el HTML con target="_blank")
    // El efecto hover para @Nanakura ya está en el CSS
});

// Bloquear solo la tecla F12
document.addEventListener('keydown', function(e) {
    if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.returnValue = false;
        return false;
    }
});