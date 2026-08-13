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
        liveCounter.textContent = val;
    });
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initMockupControls() {
    const toggleBtn = document.getElementById('demo-toggle-btn');
    const statusText = document.getElementById('status-tag-text');
    let isRunning = true;

    if (!toggleBtn || !statusText) return;

    toggleBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        if (isRunning) {
            toggleBtn.textContent = 'Stop (F6)';
            toggleBtn.style.background = 'var(--accent-crimson)';
            statusText.textContent = 'Running (Synced 240Hz)';
        } else {
            toggleBtn.textContent = 'Start (F6)';
            toggleBtn.style.background = 'var(--accent-blue)';
            statusText.textContent = 'Stopped';
        }
    });

    const segmentBtns = document.querySelectorAll('.mockup-body .segment-btn');
    segmentBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const soundType = btn.getAttribute('data-sound');
            if (soundType) {
                playWebAudioSound(soundType);
            }
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
