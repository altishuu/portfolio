/* ========================================================================
   Ishuu Alt — Portfolio JavaScript
   Features: Boot sequence, typewriter, scroll reveal, counter animation,
             live clock, interactive terminal prompt
   ======================================================================== */

(function () {
  'use strict';

  /** ====================================================
   *  1. BOOT SEQUENCE
   *  ==================================================== */
  function bootSequence() {
    const bootEl = document.getElementById('boot-sequence');
    const heroContent = document.getElementById('hero-content');
    if (!bootEl || !heroContent) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      bootEl.style.display = 'none';
      heroContent.hidden = false;
      heroContent.style.animation = 'fadeIn 0.5s ease forwards';
      // Move focus to hero title
      var heroTitle = heroContent.querySelector('h1');
      if (heroTitle) heroTitle.focus();
      // Start typewriter immediately
      typeWriter(document.getElementById('subtitle'), 'AI Orchestrator  //  Chief of Staff', 15);
      return;
    }

    const bootLines = [
      '[OK] Initializing orchestrator kernel v3.1',
      '[OK] Loading profile: ishuu-alt',
      '[OK] Agent mesh: 5 nodes connected',
      '[OK] Ready.'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;
    let isComplete = false;

    function typeBootLine() {
      if (isComplete) return;

      if (!currentLineEl || charIndex >= bootLines[lineIndex].length) {
        // Move to next line
        if (currentLineEl) {
          currentLineEl.style.animation = 'none';
          currentLineEl.style.opacity = '1';
        }

        lineIndex++;
        if (lineIndex >= bootLines.length) {
          // Boot complete
          isComplete = true;
          setTimeout(function () {
            bootEl.classList.add('pane__boot--done');
            setTimeout(function () {
              bootEl.style.display = 'none';
              heroContent.hidden = false;
              heroContent.style.animation = 'fadeIn 0.8s ease forwards';
              // Move focus to hero title for accessibility
              var heroTitle = heroContent.querySelector('h1');
              if (heroTitle) heroTitle.focus();
              // Start typewriter after hero appears
              setTimeout(function () {
                typeWriter(document.getElementById('subtitle'), 'AI Orchestrator  //  Chief of Staff', 35);
              }, 400);
            }, 400);
          }, 600);
          return;
        }

        // Create new line element
        currentLineEl = document.createElement('div');
        currentLineEl.className = 'pane__boot-line';
        bootEl.appendChild(currentLineEl);
        charIndex = 0;

        // Small delay before starting new line
        setTimeout(typeBootLine, 120);
        return;
      }

      // Type next character
      const line = bootLines[lineIndex];
      if (charIndex < line.length) {
        currentLineEl.textContent += line[charIndex];
        charIndex++;
        const speed = line[charIndex - 1] === ' ' ? 25 : 12 + Math.random() * 20;
        setTimeout(typeBootLine, speed);
      }
    }

    // Start boot
    setTimeout(typeBootLine, 300);
  }


  /** ====================================================
   *  2. TYPEWRITER EFFECT
   *  ==================================================== */
  function typeWriter(element, text, speed) {
    if (!element) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      element.textContent = text;
      return;
    }

    let index = 0;
    element.textContent = '';

    function typeChar() {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(typeChar, speed);
      }
    }

    typeChar();
  }


  /** ====================================================
   *  3. SCROLL REVEAL (IntersectionObserver)
   *  ==================================================== */
  function initScrollReveal() {
    // Observe panes (not fullscreen), agent cards, stats, work cards, pipeline stages
    const revealElements = document.querySelectorAll(
      '.pane:not(.pane--fullscreen), .agent-card, .stat, .work-card, .pipeline__stage'
    );

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
      // Also trigger counter animation immediately
      animateCounters();
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute('data-delay')) || 0;
            setTimeout(function () {
              el.classList.add('visible');

              // If it's a stat, trigger counter animation
              if (el.classList.contains('stat')) {
                animateSingleCounter(el);
              }
            }, delay * 120);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }


  /** ====================================================
   *  4. COUNTER ANIMATION
   *  ==================================================== */
  function animateCounters() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(function (stat) {
      animateSingleCounter(stat);
    });
  }

  function animateSingleCounter(statEl) {
    const valueEl = statEl.querySelector('.stat__value');
    if (!valueEl) return;

    const target = parseFloat(valueEl.getAttribute('data-target'));
    const decimalPlaces = parseInt(valueEl.getAttribute('data-decimal')) || 0;
    const duration = 1500; // ms
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: cubic out
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (target - startValue) * eased;

      if (decimalPlaces > 0) {
        valueEl.textContent = currentValue.toFixed(decimalPlaces);
      } else {
        valueEl.textContent = Math.floor(currentValue).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Final value
        if (decimalPlaces > 0) {
          valueEl.textContent = target.toFixed(decimalPlaces);
        } else {
          valueEl.textContent = Math.floor(target).toLocaleString();
        }
      }
    }

    requestAnimationFrame(updateCounter);
  }


  /** ====================================================
   *  5. LIVE CLOCK
   *  ==================================================== */
  function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;

    function tick() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = hours + ':' + minutes + ':' + seconds;
    }

    tick();
    setInterval(tick, 1000);
  }


  /** ====================================================
   *  6. TERMINAL PROMPT (Interactive)
   *  ==================================================== */
  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    const commands = {
      help: function () {
        return 'Available commands: <span class="terminal-prompt__highlight">help</span>, <span class="terminal-prompt__highlight">whoami</span>, <span class="terminal-prompt__highlight">date</span>, <span class="terminal-prompt__highlight">uptime</span>, <span class="terminal-prompt__highlight">agents</span>, <span class="terminal-prompt__highlight">clear</span>';
      },
      whoami: function () {
        return 'Ishuu Alt — AI Orchestrator / Chief of Staff. I decompose, route, and track. I don\'t execute work myself.';
      },
      date: function () {
        return new Date().toString();
      },
      uptime: function () {
        return 'Uptime: 99.7% | Tasks: 1,847 | Languages: 12 | Avg. Response: 96ms';
      },
      agents: function () {
        return '5 nodes connected: frontend-engineer, backend-engineer, schema-designer, reviewer, planner';
      },
      clear: function () {
        output.innerHTML = '';
        return null;
      },
      ls: function () {
        return 'purpose/  team/  stats/  work/  process/  contact/  colophon/';
      }
    };

    function addOutputLine(html) {
      var line = document.createElement('div');
      line.className = 'terminal-prompt__line';
      line.innerHTML = html;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function processCommand(cmd) {
      var trimmed = cmd.trim().toLowerCase();
      var prefix = '<span class="terminal-prompt__prefix">ishuu@orchestrator:~$</span> ';

      // Echo the command (escape user input to prevent self-XSS)
      addOutputLine(prefix + '<span class="terminal-prompt__highlight">' + escapeHtml(cmd) + '</span>');

      if (trimmed === '') return;

      if (commands[trimmed]) {
        var result = commands[trimmed]();
        if (result !== null) {
          addOutputLine(result);
        }
      } else {
        addOutputLine('bash: ' + trimmed + ': command not found');
      }
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var value = input.value;
        processCommand(value);
        input.value = '';
      }
    });

    // Auto-focus doesn't steal on mobile; keep it simple
    // Add a welcome if output is empty (already done in HTML)
  }


  /** ====================================================
   *  7. NAV SCROLL EFFECT
   *  ==================================================== */
  function initNavScroll() {
    var topBar = document.getElementById('top-bar');
    if (!topBar) return;

    var heroSection = document.getElementById('hero');
    if (!heroSection) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            topBar.classList.add('scrolled');
          } else {
            topBar.classList.remove('scrolled');
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(heroSection);
  }


  /** ====================================================
   *  8. BACK TO TOP
   *  ==================================================== */
  function initBackToTop() {
    var backLink = document.querySelector('.colophon__back');
    if (backLink) {
      backLink.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }


  /** ====================================================
   *  9. INIT ON DOM CONTENT LOADED
   *  ==================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    // Start boot sequence (which itself starts typewriter after boot)
    bootSequence();

    // Setup the rest
    updateClock();
    initScrollReveal();
    initTerminal();
    initNavScroll();
    initBackToTop();
  });

})();
