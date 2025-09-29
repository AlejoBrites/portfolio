import './style.css'

// Funciones para el menú hamburguesa
function alternarMenu(hamburguesa, menuNav) {
    menuNav.classList.toggle('active');
}

function cerrarMenu(hamburguesa, menuNav) {
    hamburguesa.classList.remove('active');
    menuNav.classList.remove('active');
}

function manejarClickAfuera(e, hamburguesa, menuNav) {
    if (!hamburguesa.contains(e.target) && !menuNav.contains(e.target)) {
        cerrarMenu(hamburguesa, menuNav);
    }
}

function manejarCambioTamaño(hamburguesa, menuNav) {
    if (window.innerWidth > 768) {
        cerrarMenu(hamburguesa, menuNav);
    }
}

// Inicialización del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburguesa = document.getElementById('hamburger');
    const menuNav = document.getElementById('nav-menu');
    
    if (hamburguesa && menuNav) {
        // Alternar menú al hacer click en hamburguesa
        hamburguesa.addEventListener('click', () => alternarMenu(hamburguesa, menuNav));
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(enlace => {
            enlace.addEventListener('click', () => cerrarMenu(hamburguesa, menuNav));
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => manejarClickAfuera(e, hamburguesa, menuNav));
        
        // Cerrar menú al redimensionar ventana a escritorio
        window.addEventListener('resize', () => manejarCambioTamaño(hamburguesa, menuNav));
    }
});

// Función para descargar el CV
function descargarCV(boton) {
    const urlCV = '/curriculum-vitae/cv-alejo-brites-full-stack.pdf';
    
    // Crear enlace temporal para descarga
    const enlace = document.createElement('a');
    enlace.href = urlCV;
    enlace.download = 'cv-alejo-brites-full-stack.pdf';
    enlace.target = '_blank';
    
    // Agregar al DOM, hacer click y remover
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    
    // Mostrar retroalimentación visual
    mostrarRetroalimentacionDescarga(boton);
}

// Función para mostrar retroalimentación visual
function mostrarRetroalimentacionDescarga(boton) {
    const textoOriginal = boton.innerHTML;
    
    boton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/>
        </svg>
        Descargado
    `;
    
    setTimeout(() => {
        boton.innerHTML = textoOriginal;
    }, 2000);
}

// Event listener para el botón Descargar CV
document.addEventListener('DOMContentLoaded', function() {
    const botonCV = document.querySelector('.cv-download-btn');
    if (botonCV) {
        botonCV.addEventListener('click', function(e) {
            e.preventDefault();
            descargarCV(this);
        });
    }
});