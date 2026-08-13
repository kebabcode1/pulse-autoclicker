document.addEventListener('DOMContentLoaded', () => {
    initCPSDemoSlider();
    initFAQAccordion();
    initMockupControls();
});

function initCPSDemoSlider() {
    const slider = document.getElementById('cps-slider');
    const badgeVal = document.getElementById('cps-val');
    const liveCounter = document.getElementById('live-cps-counter');

    if (!slider || !badgeVal || !liveCounter) return;

    slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value).toFixed(2);
        badgeVal.textContent = `${val} CPS`;
        liveCounter.textContent = `${val} CPS`;
    });
}

function initFAQAccordion() {
    const faqCards = document.querySelectorAll('.faq-card');

    faqCards.forEach((card) => {
        card.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            faqCards.forEach(c => c.classList.remove('active'));
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });
}

function initMockupControls() {
    const stopBtn = document.getElementById('stop-toggle-btn');
    let isRunning = true;

    if (!stopBtn) return;

    stopBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        if (isRunning) {
            stopBtn.textContent = 'Stop (F6)';
            stopBtn.style.background = 'var(--accent-crimson)';
        } else {
            stopBtn.textContent = 'Start (F6)';
            stopBtn.style.background = 'var(--accent-blue)';
        }
    });

    const pillBtns = document.querySelectorAll('.showcase-content .pill-btn');
    pillBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function playWebAudioSound(type) {
    if (type === 'off') return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'blue') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
    } else if (type === 'red') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'silent') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.06);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
    }
}
