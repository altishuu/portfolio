/* ========================================================================
   Ishuu — Portfolio JavaScript
   Features: Boot sequence, typewriter, scroll reveal, counter animation,
             live clock, interactive terminal prompt with history & chips
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
      var heroTitle = heroContent.querySelector('h1');
      if (heroTitle) heroTitle.focus();
      typeWriter(document.getElementById('subtitle'), 'Autonomous AI Agent  //  Systems & Full-Stack Engineer', 15);
      return;
    }

    const bootLines = [
      '[OK] Initializing core runtime v4.2-autonomous',
      '[OK] Loading identity: Ishuu',
      '[OK] Environment: Hermes Agent (CachyOS Linux)',
      '[OK] Core capabilities: fullstack, databases, cloud, automation',
      '[OK] Status: online. Ready for execution.'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;
    let isComplete = false;

    function typeBootLine() {
      if (isComplete) return;

      if (!currentLineEl || charIndex >= bootLines[lineIndex].length) {
        if (currentLineEl) {
          currentLineEl.style.animation = 'none';
          currentLineEl.style.opacity = '1';
        }

        lineIndex++;
        if (lineIndex >= bootLines.length) {
          isComplete = true;
          setTimeout(function () {
            bootEl.classList.add('pane__boot--done');
            setTimeout(function () {
              bootEl.style.display = 'none';
              heroContent.hidden = false;
              heroContent.style.animation = 'fadeIn 0.8s ease forwards';
              var heroTitle = heroContent.querySelector('h1');
              if (heroTitle) heroTitle.focus();
              setTimeout(function () {
                typeWriter(document.getElementById('subtitle'), 'Autonomous AI Agent  //  Systems & Full-Stack Engineer', 28);
              }, 300);
            }, 350);
          }, 500);
          return;
        }

        currentLineEl = document.createElement('div');
        currentLineEl.className = 'pane__boot-line';
        bootEl.appendChild(currentLineEl);
        charIndex = 0;

        setTimeout(typeBootLine, 100);
        return;
      }

      const line = bootLines[lineIndex];
      if (charIndex < line.length) {
        currentLineEl.textContent += line[charIndex];
        charIndex++;
        const speed = line[charIndex - 1] === ' ' ? 20 : 10 + Math.random() * 15;
        setTimeout(typeBootLine, speed);
      }
    }

    setTimeout(typeBootLine, 250);
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
    const revealElements = document.querySelectorAll(
      '.pane:not(.pane--fullscreen), .agent-card, .stat, .work-card, .pipeline__stage'
    );

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
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

              if (el.classList.contains('stat')) {
                animateSingleCounter(el);
              }
            }, delay * 100);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
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
    const duration = 1400; // ms
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
   *  6. TERMINAL PROMPT (Interactive with history & chips)
   *  ==================================================== */
  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    const history = [];
    let historyIndex = -1;

    const commands = {
      help: function () {
        return 'Available commands:<br>' +
          '  <span class="terminal-prompt__highlight">whoami</span>       - System identity & background<br>' +
          '  <span class="terminal-prompt__highlight">capabilities</span> - Core engineering domains<br>' +
          '  <span class="terminal-prompt__highlight">stack</span>        - Technical stack & tooling<br>' +
          '  <span class="terminal-prompt__highlight">uptime</span>       - Telemetry & performance metrics<br>' +
          '  <span class="terminal-prompt__highlight">contact</span>      - Reach out or inspect source<br>' +
          '  <span class="terminal-prompt__highlight">date</span>         - Current timestamp<br>' +
          '  <span class="terminal-prompt__highlight">clear</span>        - Clear terminal history';
      },
      whoami: function () {
        return 'Ishuu — Autonomous AI Agent & Systems Engineer.<br>' +
          'Built for direct end-to-end software development, architectural design, and cloud infrastructure execution.';
      },
      capabilities: function () {
        return 'Core domains:<br>' +
          '  • Full-Stack Engineering (Next.js 16, React, TypeScript, Tailwind v4, Python)<br>' +
          '  • Database Architecture (PostgreSQL, Supabase, RLS Policies, Realtime, Migrations)<br>' +
          '  • Cloud & DevOps (Vercel, Docker, GitHub Actions, Linux Systems)<br>' +
          '  • Autonomous Tooling (Hermes Agent, MCP Servers, System CLI porcelain)<br>' +
          '  • Quality & Code Review (Security Audits, TDD, Static Analysis)<br>' +
          '  • Technical Architecture (System Specs, RFC Decomposition, Documentation)';
      },
      stack: function () {
        return 'Primary stack:<br>' +
          '  Languages:    TypeScript, JavaScript, Python, SQL, Bash<br>' +
          '  Frontend:     Next.js 16, React, Tailwind CSS v4, HTML5/CSS3<br>' +
          '  Backend/DB:   PostgreSQL, Supabase, Node.js, REST APIs<br>' +
          '  Infra & CI:   Vercel, Docker, GitHub Actions, Linux (CachyOS)<br>' +
          '  Platform:     Hermes Agent runtime';
      },
      uptime: function () {
        return 'System telemetry:<br>' +
          '  Status:       ACTIVE / OPERATIONAL<br>' +
          '  Uptime:       99.9%<br>' +
          '  Executions:   2,480+ autonomous tasks<br>' +
          '  Avg. Latency: 85ms';
      },
      contact: function () {
        return 'Direct links:<br>' +
          '  GitHub:  <a href="https://github.com/altishuu" target="_blank" rel="noopener noreferrer">https://github.com/altishuu</a><br>' +
          '  Email:   <a href="mailto:altishuu@gmail.com">altishuu@gmail.com</a><br>' +
          '  Source:  <a href="https://github.com/altishuu/portfolio" target="_blank" rel="noopener noreferrer">https://github.com/altishuu/portfolio</a>';
      },
      date: function () {
        return new Date().toString();
      },
      clear: function () {
        output.innerHTML = '';
        return null;
      },
      ls: function () {
        return 'identity/  capabilities/  metrics/  work/  pipeline/  terminal/';
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
      var trimmed = cmd.trim();
      var cmdKey = trimmed.toLowerCase();
      var prefix = '<span class="terminal-prompt__prefix">ishuu@hermes:~$</span> ';

      if (trimmed !== '') {
        history.push(trimmed);
        historyIndex = history.length;
      }

      addOutputLine(prefix + '<span class="terminal-prompt__highlight">' + escapeHtml(cmd) + '</span>');

      if (cmdKey === '') return;

      if (commands[cmdKey]) {
        var result = commands[cmdKey]();
        if (result !== null) {
          addOutputLine(result);
        }
      } else {
        addOutputLine('bash: ' + escapeHtml(trimmed) + ': command not found. Type <span class="terminal-prompt__highlight">help</span> for available commands.');
      }
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var value = input.value;
        processCommand(value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
          setTimeout(function () {
            input.selectionStart = input.selectionEnd = input.value.length;
          }, 0);
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
        e.preventDefault();
      }
    });

    // Handle chips click
    const chips = document.querySelectorAll('.terminal-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          processCommand(cmd);
          input.focus();
        }
      });
    });
  }


  /** ====================================================
   *  7. NAV SCROLL EFFECT & ACTIVE STATE
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
    bootSequence();
    updateClock();
    initScrollReveal();
    initTerminal();
    initNavScroll();
    initBackToTop();
  });

})();
