document.addEventListener("DOMContentLoaded", () => {
  
  // 1. DYNAMIC YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. CLICK SQUISH ANIMATION
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".click-animate");
    if (!target) return;
    target.classList.remove("clicked");
    void target.offsetWidth;
    target.classList.add("clicked");
    setTimeout(() => target.classList.remove("clicked"), 180);
  });

  // 3. RIPPLE EFFECT
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn.ripple");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement("span");
    circle.classList.add("ripple-circle");
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 450);
  });

  // 4. SCROLL REVEAL
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealEls.forEach((el) => obs.observe(el));
  }

  // 5. 3D TILT & 6. MAGNETIC BUTTONS
  const tiltCards = document.querySelectorAll(".tilt-card");
  const magBtns = document.querySelectorAll(".btn.magnetic");
  
  if (tiltCards.length) {
    tiltCards.forEach(card => {
      let ticking = false;
      card.addEventListener("mousemove", (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
            card.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
            card.style.setProperty("--tz", "12px");
            ticking = false;
          });
          ticking = true;
        }
      });
      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); card.style.setProperty("--tz", "0px");
      });
    });
  }

  if (magBtns.length) {
    magBtns.forEach(btn => {
      let ticking = false;
      btn.addEventListener("mousemove", (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            btn.style.setProperty("--tx", `${((x / rect.width) * 12).toFixed(2)}px`);
            btn.style.setProperty("--ty", `${((y / rect.height) * 12).toFixed(2)}px`);
            ticking = false;
          });
          ticking = true;
        }
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.setProperty("--tx", "0px"); btn.style.setProperty("--ty", "0px");
      });
    });
  }

  // 7. TRAP LOGIC
  const trigger = document.getElementById("trap-trigger");
  if (trigger) {
    let trapRunning = false;
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (trapRunning) return;
      trapRunning = true;
      
      // PHASE 1: CHAOS (Shaking)
      document.body.classList.add("chaos-mode");

      // PHASE 2: GAME (Freeze Background + Show Overlay after 2s)
      setTimeout(() => {
        activateSnakeTrap(() => { trapRunning = false; });
      }, 2000);
    });
  }
});

/* =========================================
   SNAKE SURVIVAL ENGINE (FINAL)
   ========================================= */
function activateSnakeTrap(onExit) {
  // FREEZE BACKGROUND
  document.body.classList.add("game-active");

  const overlay = document.createElement("div");
  overlay.className = "trap-overlay";
  overlay.innerHTML = `
    <div class="snake-container">
      <div class="trap-message glitch-text" data-text="IT'S A TRAP!">IT'S A TRAP!</div>
      
      <div class="game-instructions">
        <h3>MISSION: REACH SCORE 10 TO ESCAPE</h3>
        <p>Collect Data (Green). Avoid Hackers (Spy). Don't Crash.</p>
      </div>

      <div class="snake-score">SCORE: 0</div>
      <canvas id="snake-canvas" width="400" height="400"></canvas>
    </div>
  `;
  document.body.appendChild(overlay);

  const canvas = document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.querySelector(".snake-score");
  
  const gridSize = 20; 
  const tileCountX = canvas.width / gridSize;
  const tileCountY = canvas.height / gridSize;
  
  let score = 0;
  let velocity = { x: 0, y: 0 };
  let player = [];
  let food = {};
  let obstacles = []; 
  let gameInterval;
  
  function resetGame() {
    score = 0;
    scoreEl.innerText = "SCORE: 0";
    velocity = { x: 0, y: 0 };
    player = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];
    obstacles = [];
    spawnFood();
    spawnObstacle();
    spawnObstacle();
  }

  function keyPush(evt) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(evt.code) > -1) {
        evt.preventDefault();
    }
    switch(evt.key) {
      case "ArrowLeft": if (velocity.x !== 1) velocity = { x: -1, y: 0 }; break;
      case "ArrowUp": if (velocity.y !== 1) velocity = { x: 0, y: -1 }; break;
      case "ArrowRight": if (velocity.x !== -1) velocity = { x: 1, y: 0 }; break;
      case "ArrowDown": if (velocity.y !== -1) velocity = { x: 0, y: 1 }; break;
    }
  }
  document.addEventListener("keydown", keyPush);

  function gameLoop() {
    if (velocity.x !== 0 || velocity.y !== 0) {
      const head = { x: player[0].x + velocity.x, y: player[0].y + velocity.y };

      // Check Death
      if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY ||
          player.some(p => p.x === head.x && p.y === head.y) ||
          obstacles.some(o => o.x === head.x && o.y === head.y)) {
        return handleDeath();
      }

      player.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.innerText = "SCORE: " + score;
        spawnFood();
        spawnObstacle();
        if(score % 2 === 0) document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
      } else {
        player.pop();
      }
    }

    // DRAWING
    ctx.fillStyle = "rgba(10, 12, 16, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Hackers (Emoji)
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let obs of obstacles) {
      ctx.fillText('🕵️', obs.x * gridSize + gridSize/2, obs.y * gridSize + gridSize/2 + 1);
    }

    // Draw Food (Green Block)
    ctx.fillStyle = "#22c55e"; 
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#22c55e";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    ctx.shadowBlur = 0;

    // Draw Snake (Yellow)
    ctx.fillStyle = "#f6e05e";
    for (let part of player) {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    }
  }

  function spawnFood() {
    food = { x: Math.floor(Math.random() * tileCountX), y: Math.floor(Math.random() * tileCountY) };
    if (isColliding(food)) spawnFood();
  }

  function spawnObstacle() {
    let obs = { x: Math.floor(Math.random() * tileCountX), y: Math.floor(Math.random() * tileCountY) };
    let head = player[0];
    if (isColliding(obs) || (Math.abs(obs.x - head.x) < 4 && Math.abs(obs.y - head.y) < 4)) {
      spawnObstacle();
    } else {
      obstacles.push(obs);
    }
  }

  function isColliding(pos) {
    return player.some(p => p.x === pos.x && p.y === pos.y) ||
           obstacles.some(o => o.x === pos.x && o.y === pos.y) ||
           (food.x === pos.x && food.y === pos.y && pos !== food);
  }

  function handleDeath() {
    if (score >= 10) {
      clearInterval(gameInterval);
      alert("CONGRATULATIONS. YOU'VE ESCAPED THE ATTACKERS.\n\nSYSTEM RESTORING...");
      closeGame();
    } else {
      alert("ACCESS DENIED. SCORE TOO LOW (" + score + "/10). TRY AGAIN.");
      resetGame();
    }
  }

  function closeGame() {
    clearInterval(gameInterval);
    document.removeEventListener("keydown", keyPush);
    document.body.classList.remove("chaos-mode");
    document.body.classList.remove("game-active");
    document.body.style.filter = "";
    if (overlay) overlay.remove();
    if (onExit) onExit();
  }

  resetGame();
  gameInterval = setInterval(gameLoop, 85); // Speed: 85ms
}