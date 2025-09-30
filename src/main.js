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

// Funcionalidad del carrusel de certificados
class CarruselCertificados {
    constructor() {
        this.contenedorCartas = document.querySelector('.certificados-wrapper');
        this.cartas = document.querySelectorAll('.certificado-card');
        this.botonAnterior = document.querySelector('.carousel-prev');
        this.botonSiguiente = document.querySelector('.carousel-next');
        this.indicadores = document.querySelectorAll('.indicator');
        
        this.indiceActual = 0;
        this.totalCartas = this.cartas.length;
        this.cartasVisibles = this.obtenerCartasVisibles();
        
        this.inicializar();
    }
    
    inicializar() {
        if (!this.contenedorCartas || !this.cartas.length) return;
        
        // Event listeners para navegación
        this.botonAnterior?.addEventListener('click', () => this.anterior());
        this.botonSiguiente?.addEventListener('click', () => this.siguiente());
        
        // Event listeners para indicadores
        this.indicadores.forEach((indicador, indice) => {
            indicador.addEventListener('click', () => this.irASlide(indice));
        });
        
        // Actualizar en redimensionamiento de ventana
        window.addEventListener('resize', () => {
            this.cartasVisibles = this.obtenerCartasVisibles();
            this.actualizarCarrusel();
        });
        
        // Inicializar posición
        this.actualizarCarrusel();
    }
    
    obtenerCartasVisibles() {
        const ancho = window.innerWidth;
        if (ancho <= 400) return 1;
        if (ancho <= 768) return 1;
        if (ancho <= 1200) return 2; // Laptops medianas: 2 tarjetas
        return 3; // Desktop: 3 tarjetas
    }
    
    anterior() {
        if (this.indiceActual > 0) {
            this.indiceActual--;
        } else {
            this.indiceActual = Math.max(0, this.totalCartas - this.cartasVisibles);
        }
        this.actualizarCarrusel();
    }
    
    siguiente() {
        const maxIndice = Math.max(0, this.totalCartas - this.cartasVisibles);
        if (this.indiceActual < maxIndice) {
            this.indiceActual++;
        } else {
            this.indiceActual = 0;
        }
        this.actualizarCarrusel();
    }
    
    irASlide(indice) {
        const maxIndice = Math.max(0, this.totalCartas - this.cartasVisibles);
        this.indiceActual = Math.min(indice, maxIndice);
        this.actualizarCarrusel();
    }
    
    actualizarCarrusel() {
        if (!this.contenedorCartas) return;
        
        // Calcular desplazamiento
        const carta = this.cartas[0];
        if (!carta) return;
        
        const anchoCarta = carta.offsetWidth;
        const estiloComputado = window.getComputedStyle(this.contenedorCartas);
        const gap = parseInt(estiloComputado.gap) || 20; // Obtener gap real del CSS
        const desplazamiento = -(this.indiceActual * (anchoCarta + gap));
        
        // Aplicar transformación
        this.contenedorCartas.style.transform = `translateX(${desplazamiento}px)`;
        
        // Actualizar indicadores
        this.actualizarIndicadores();
        
        // Actualizar botones de navegación
        this.actualizarBotonesNavegacion();
    }
    
    actualizarIndicadores() {
        this.indicadores.forEach((indicador, indice) => {
            const maxIndice = Math.max(0, this.totalCartas - this.cartasVisibles);
            if (indice <= maxIndice) {
                indicador.style.display = 'block';
                indicador.classList.toggle('active', indice === this.indiceActual);
            } else {
                indicador.style.display = 'none';
            }
        });
    }
    
    actualizarBotonesNavegacion() {
        const maxIndice = Math.max(0, this.totalCartas - this.cartasVisibles);
        
        if (this.botonAnterior) {
            this.botonAnterior.style.opacity = this.indiceActual === 0 ? '0.5' : '1';
        }
        
        if (this.botonSiguiente) {
            this.botonSiguiente.style.opacity = this.indiceActual === maxIndice ? '0.5' : '1';
        }
    }
}

// Funcionalidad para abrir certificados en nueva pestaña
function abrirCertificado(url, nombre) {
    if (url && url !== '#' && !url.includes('ejemplo.com')) {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        alert(`Por favor, configura el enlace real para ${nombre}`);
    }
}

// Inicializar carrusel y eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel
    new CarruselCertificados();
    
    // Agregar event listeners a todos los botones "Ver Certificado"
    const botonesCertificado = document.querySelectorAll('.ver-certificado-btn');
    botonesCertificado.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-cert-url');
            const nombre = this.getAttribute('data-cert-name');
            abrirCertificado(url, nombre);
        });
    });
});