document.addEventListener('DOMContentLoaded', () => {
  // Live CPS Simulator Logic
  const cpsSlider = document.getElementById('sim-cps-slider');
  const cpsValDisplay = document.getElementById('sim-cps-val');
  const dutySlider = document.getElementById('sim-duty-slider');
  const dutyValDisplay = document.getElementById('sim-duty-val');
  const clickTargetBtn = document.getElementById('click-target-btn');

  const liveCpsStat = document.getElementById('live-cps-stat');
  const totalClicksStat = document.getElementById('total-clicks-stat');

  let totalClicks = 0;
  let autoClickInterval = null;
  let isAutoClicking = false;
  let clicksInCurrentSecond = 0;

  // Slider Updates
  if (cpsSlider && cpsValDisplay) {
    cpsSlider.addEventListener('input', (e) => {
      cpsValDisplay.textContent = parseFloat(e.target.value).toFixed(2) + ' CPS';
      if (isAutoClicking) {
        restartSimulator();
      }
    });
  }

  if (dutySlider && dutyValDisplay) {
    dutySlider.addEventListener('input', (e) => {
      dutyValDisplay.textContent = parseFloat(e.target.value).toFixed(2) + ' %';
    });
  }

  // Interactive Target Clicker
  if (clickTargetBtn) {
    clickTargetBtn.addEventListener('click', () => {
      triggerClickAnimation();
      totalClicks++;
      clicksInCurrentSecond++;
      updateStatsUI();
    });
  }

  function triggerClickAnimation() {
    clickTargetBtn.style.transform = 'scale(0.97)';
    clickTargetBtn.style.borderColor = 'var(--accent-green)';
    setTimeout(() => {
      clickTargetBtn.style.transform = 'scale(1)';
      clickTargetBtn.style.borderColor = 'var(--accent-cyan)';
    }, 80);
  }

  function updateStatsUI() {
    if (totalClicksStat) {
      totalClicksStat.textContent = totalClicks.toLocaleString();
    }
  }

  // CPS Counter Measurement Loop
  setInterval(() => {
    if (liveCpsStat) {
      liveCpsStat.textContent = clicksInCurrentSecond.toFixed(1);
    }
    clicksInCurrentSecond = 0;
  }, 1000);

  // AutoClicker Simulation Switch Toggle
  const simToggleBtn = document.getElementById('sim-toggle-btn');
  if (simToggleBtn) {
    simToggleBtn.addEventListener('click', () => {
      if (isAutoClicking) {
        stopSimulator();
      } else {
        startSimulator();
      }
    });
  }

  function startSimulator() {
    isAutoClicking = true;
    if (simToggleBtn) {
      simToggleBtn.textContent = '⏹ Stop Simulator';
      simToggleBtn.style.background = 'linear-gradient(135deg, #e63946, #b00020)';
    }

    const cps = parseFloat(cpsSlider ? cpsSlider.value : 50);
    const intervalMs = Math.max(10, 1000 / cps);

    autoClickInterval = setInterval(() => {
      triggerClickAnimation();
      totalClicks++;
      clicksInCurrentSecond++;
      updateStatsUI();
    }, intervalMs);
  }

  function stopSimulator() {
    isAutoClicking = false;
    if (autoClickInterval) {
      clearInterval(autoClickInterval);
      autoClickInterval = null;
    }
    if (simToggleBtn) {
      simToggleBtn.textContent = '▶ Test AutoClicker Engine';
      simToggleBtn.style.background = 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))';
    }
  }

  function restartSimulator() {
    stopSimulator();
    startSimulator();
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const isVisible = answer.style.display === 'block';
      
      // Close all
      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      
      if (!isVisible) {
        answer.style.display = 'block';
      }
    });
  });
});
