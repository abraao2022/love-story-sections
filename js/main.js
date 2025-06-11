
// Configurações principais - PERSONALIZE AQUI
const CONFIG = {
    // DATA DE INÍCIO DO RELACIONAMENTO - ALTERE AQUI
    startDate: new Date('2023-09-24'),
    
    // VELOCIDADE DA ÓRBITA (milissegundos) - MENOR = MAIS RÁPIDO
    orbitSpeed: 8000,
    
    // CONFIGURAÇÕES DO EFEITO ESPECIAL
    effectsConfig: {
        particleCount: 50,
        colors: ['#ff69b4', '#ff1493', '#dc143c', '#ffd700', '#ff6347'],
        duration: 3000
    }
};

// Estado da aplicação
let currentSection = 1;
const totalSections = 5;
let easterEggTriggered = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('App iniciada - Nossa História de Amor');
    initializeApp();
});

function initializeApp() {
    updateDaysCounter();
    setupEasterEgg();
    setupCanvas();
    
    // Verifica se o easter egg já foi acionado nesta sessão
    easterEggTriggered = sessionStorage.getItem('easterEggTriggered') === 'true';
    
    console.log('Aplicação inicializada com sucesso');
}

// SEÇÃO 1: Contador de dias
function updateDaysCounter() {
    const now = new Date();
    const timeDifference = now.getTime() - CONFIG.startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    const counterElement = document.getElementById('daysCounter');
    
    // Animação do contador
    let currentCount = 0;
    const increment = Math.ceil(daysDifference / 50);
    
    const counterInterval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= daysDifference) {
            currentCount = daysDifference;
            clearInterval(counterInterval);
        }
        counterElement.textContent = currentCount;
    }, 30);
    
    console.log(`Dias juntos: ${daysDifference}`);
}

// NAVEGAÇÃO ENTRE SEÇÕES
function nextSection() {
    if (currentSection < totalSections) {
        showSection(currentSection + 1);
    }
}

function prevSection() {
    if (currentSection > 1) {
        showSection(currentSection - 1);
    }
}

function showSection(sectionNumber) {
    // Esconde seção atual
    const currentSectionElement = document.getElementById(`section-${currentSection}`);
    currentSectionElement.classList.remove('active');
    
    // Mostra nova seção
    setTimeout(() => {
        currentSection = sectionNumber;
        const newSectionElement = document.getElementById(`section-${currentSection}`);
        newSectionElement.classList.add('active');
        
        console.log(`Navegando para seção ${currentSection}`);
    }, 300);
}

// SEÇÃO 4: Envelope
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const openButton = document.getElementById('openLetter');
    
    envelope.classList.add('open');
    openButton.style.display = 'none';
    
    setTimeout(() => {
        letter.classList.add('show');
    }, 800);
    
    console.log('Envelope aberto');
}

// SEÇÃO 5: Easter Egg
function setupEasterEgg() {
    const easterEggElement = document.getElementById('easterEgg');
    
    easterEggElement.addEventListener('click', function() {
        if (!easterEggTriggered) {
            triggerSpecialEffect();
            easterEggTriggered = true;
            sessionStorage.setItem('easterEggTriggered', 'true');
            console.log('Easter egg ativado!');
        } else {
            console.log('Easter egg já foi ativado nesta sessão');
        }
    });
}

// EFEITOS ESPECIAIS
function setupCanvas() {
    const canvas = document.getElementById('effectsCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function triggerSpecialEffect() {
    const canvas = document.getElementById('effectsCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Cria partículas (corações e confetes)
    for (let i = 0; i < CONFIG.effectsConfig.particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -10,
            velocity: {
                x: (Math.random() - 0.5) * 4,
                y: Math.random() * 3 + 2
            },
            color: CONFIG.effectsConfig.colors[Math.floor(Math.random() * CONFIG.effectsConfig.colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            symbol: Math.random() > 0.5 ? '❤️' : '✨'
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Atualiza posição
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.rotation += 2;
            
            // Aplica gravidade
            particle.velocity.y += 0.1;
            
            // Desenha partícula
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.font = particle.size + 'px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(particle.symbol, 0, 0);
            ctx.restore();
            
            // Remove partículas que saíram da tela
            if (particle.y > canvas.height + 50) {
                particles.splice(index, 1);
            }
        });
        
        // Continua animação se ainda há partículas
        if (particles.length > 0) {
            requestAnimationFrame(animateParticles);
        }
    }
    
    animateParticles();
    
    // Para o efeito após a duração configurada
    setTimeout(() => {
        particles.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, CONFIG.effectsConfig.duration);
}

// CONTROLES DE TECLADO (OPCIONAL)
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
            nextSection();
            break;
        case 'ArrowLeft':
            prevSection();
            break;
        case 'Enter':
            if (currentSection === 4) {
                openEnvelope();
            }
            break;
    }
});

// UTILITÁRIOS
function log(message) {
    console.log(`[Nossa História] ${message}`);
}

// EXPORTA FUNÇÕES PARA USO GLOBAL
window.nextSection = nextSection;
window.prevSection = prevSection;
window.openEnvelope = openEnvelope;

console.log('JavaScript carregado - Pronto para criar memórias! ❤️');

/*
INSTRUÇÕES PARA PERSONALIZAÇÃO:

1. ALTERAR DATAS:
   - Linha 3: Modifique 'startDate' para a data do início do relacionamento

2. TROCAR FOTOS:
   - No index.html, seção 3, substitua os links "https://via.placeholder.com..." 
     pelas URLs das suas fotos reais

3. PERSONALIZAR CARTA:
   - No index.html, seção 4, edite o conteúdo dentro de .letter-content

4. AJUSTAR VELOCIDADE DA ÓRBITA:
   - Linha 6: Modifique 'orbitSpeed' (menor = mais rápido)
   - OU no CSS, linha 146: altere a duração da animação orbit

5. CUSTOMIZAR EFEITOS:
   - Linhas 9-13: Modifique cores, quantidade de partículas e duração do confete

6. CORES DO SITE:
   - No CSS, procure por variáveis de cor (#8b5a9f, #d63384, etc.) e substitua
*/
