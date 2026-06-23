/**
 * NEON RUNNER — Cyberpunk Dino-Style Game
 * Press SPACE / tap to jump. Avoid the glitch walls.
 */
(function() {
  'use strict';

  var canvas = document.getElementById('neon-runner');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  // --- Config ---
  var W, H;
  var groundY;
  var speed = 4;
  var maxSpeed = 14;
  var frame = 0;
  var score = 0;
  var highScore = parseInt(localStorage.getItem('neonRunnerHigh') || '0');
  var state = 'idle'; // idle | playing | over

  // --- Player ---
  var player = { x: 200, y: groundY, w: 24, h: 28, vy: 0, grounded: true };
  var gravity = 0.6;
  var jumpForce = -10;

  // --- Obstacles ---
  var obstacles = [];
  var spawnTimer = 0;
  var spawnGap = 70;

  // --- Particles ---
  var particles = [];

  // --- Scrolling Background ---
  var buildings = [];
  var dataDrops = [];
  var spaceships = [];
  var spaceshipTimer = 0;
  var planets = [];
  var gridOffset = 0;

  // --- Colors ---
  var neonCyan = '#00f0ff';
  var neonMagenta = '#ff00ff';
  var neonGreen = '#00ff41';
  var neonYellow = '#ffd700';
  var neonPurple = '#b347ea';

  // --- Scoring ---
  var scoreEl = document.getElementById('neon-score');
  var highEl = document.getElementById('neon-high');
  var msgEl = document.getElementById('neon-msg');

  // ==================== INIT ====================
  function init() {
    resize();
    window.addEventListener('resize', resize);
    initPlanets();
    initBuildings();
    updateUI();
    loop();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    groundY = H - 80; // slightly higher ground line
    player.y = groundY;
    initPlanets();
    initBuildings();
  }

  function initPlanets() {
    planets = [];
    var colors = [neonCyan, neonMagenta, neonYellow, neonPurple, '#ff6b35', '#00ff88'];
    var count = 4 + Math.floor(Math.random() * 4);
    for (var i = 0; i < count; i++) {
      var r = 30 + Math.random() * 80;
      planets.push({
        x: Math.random() * (W + 400) - 200,
        y: 20 + Math.random() * (groundY * 0.65),
        r: r,
        color: colors[Math.floor(Math.random() * colors.length)],
        hasRing: Math.random() < 0.35,
        ringColor: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function initBuildings() {
    buildings = [];
    var bx = 0;
    var maxB = Math.min(40, Math.ceil(W / 40));
    while (bx < W + 200 && buildings.length < maxB) {
      var bw = 40 + Math.random() * 100;
      var bh = 60 + Math.random() * Math.min(H * 0.6, 300);
      buildings.push({
        x: bx,
        w: bw,
        h: bh,
        color: Math.random() < 0.5 ? neonPurple : neonCyan,
        windows: Math.floor(Math.random() * 6) + 2
      });
      bx += bw + Math.random() * 60 + 20;
    }
  }

  // ==================== GAME LOOP ====================
  function loop() {
    frame++;
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // ==================== UPDATE ====================
  function update() {
    // Background scrolls during idle (demo) and playing; static only on game over
    var scrollSpeed = (state === 'over') ? 0.5 : speed;
    gridOffset = (gridOffset + scrollSpeed) % 40;

    // Data drops for ambiance
    if (Math.random() < 0.12) {
      dataDrops.push({
        x: W + Math.random() * 100,
        y: Math.random() * groundY,
        len: 4 + Math.random() * 12,
        life: 20 + Math.random() * 30
      });
    }

    // Move data drops
    for (var i = dataDrops.length - 1; i >= 0; i--) {
      dataDrops[i].x -= scrollSpeed * 0.8;
      dataDrops[i].life--;
      if (dataDrops[i].life <= 0 || dataDrops[i].x < -20) dataDrops.splice(i, 1);
    }

    // --- Spaceships ---
    spaceshipTimer--;
    if (spaceshipTimer <= 0) {
      // Random cooldown before next ship
      spaceshipTimer = 180 + Math.floor(Math.random() * 400);
      var shipY = 30 + Math.random() * (groundY * 0.55);
      var shipSize = 0.6 + Math.random() * 0.8;
      var shipSpeed = 1.5 + Math.random() * 3;
      var dir = Math.random() < 0.3 ? -1 : 1; // 30% chance fly leftwards
      spaceships.push({
        x: dir > 0 ? -80 : W + 80,
        y: shipY,
        size: shipSize,
        speed: shipSpeed * dir,
        color: [neonCyan, neonMagenta, neonYellow, neonPurple][Math.floor(Math.random() * 4)],
        type: Math.floor(Math.random() * 3), // 0-2 different ship shapes
        flicker: 0,
        trail: []
      });
    }

    // Move spaceships
    for (var i = spaceships.length - 1; i >= 0; i--) {
      var s = spaceships[i];
      s.x += s.speed;
      s.flicker = (s.flicker + 1) % 30;
      // Engine trail
      if (Math.random() < 0.5) {
        s.trail.push({ x: s.x - s.speed * 8, y: s.y + 4, life: 8 });
      }
      for (var j = s.trail.length - 1; j >= 0; j--) {
        s.trail[j].life--;
        if (s.trail[j].life <= 0) s.trail.splice(j, 1);
      }
      // Remove when off screen
      if ((s.speed > 0 && s.x > W + 120) || (s.speed < 0 && s.x < -120)) {
        spaceships.splice(i, 1);
      }
    }

    // Move planets (very slow parallax)
    for (var i = 0; i < planets.length; i++) {
      planets[i].x -= scrollSpeed * 0.15;
      if (planets[i].x + planets[i].r < -80) {
        planets[i].x = W + 80 + planets[i].r;
        planets[i].y = 20 + Math.random() * (groundY * 0.65);
      }
    }

    // Move buildings
    for (var i = 0; i < buildings.length; i++) {
      buildings[i].x -= scrollSpeed * 0.6;
    }
    // Recycle buildings
    if (buildings.length > 0 && buildings[0].x + buildings[0].w < -20) {
      buildings.shift();
      var last = buildings[buildings.length - 1];
      var bw = 30 + Math.random() * 60;
      var bh = 40 + Math.random() * 100;
      buildings.push({
        x: last.x + last.w + Math.random() * 40 + 20,
        w: bw,
        h: bh,
        color: Math.random() < 0.5 ? neonPurple : neonCyan,
        windows: Math.floor(Math.random() * 5) + 2
      });
    }

    // idle = AI auto-play demo, playing = real game. Both run physics/obstacles.
    if (state !== 'playing' && state !== 'idle') return;

    var isDemo = (state === 'idle');

    // Speed ramp (demo uses a calm fixed speed)
    speed = isDemo ? 5 : Math.min(maxSpeed, 4 + Math.floor(score / 200));

    // Player physics
    player.vy += gravity;
    player.y += player.vy;
    player.grounded = player.y >= groundY;
    if (player.grounded) { player.y = groundY; player.vy = 0; }

    // Spawn obstacles
    spawnTimer++;
    if (spawnTimer > spawnGap) {
      spawnTimer = 0;
      spawnGap = 50 + Math.floor(Math.random() * 50);
      var h = 20 + Math.floor(Math.random() * 20);
      obstacles.push({
        x: W + 20,
        y: groundY - h,
        w: 14 + Math.floor(Math.random() * 16),
        h: h,
        color: Math.random() > 0.5 ? neonMagenta : neonYellow
      });
    }

    // Move obstacles
    for (var i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= speed;
      if (obstacles[i].x < -40) {
        obstacles.splice(i, 1);
        if (!isDemo) { score += 10; updateUI(); }
      }
    }

    // AI auto-jump (demo mode): jump when an obstacle gets close
    if (isDemo && player.grounded) {
      for (var i = 0; i < obstacles.length; i++) {
        var o = obstacles[i];
        var dist = o.x - (player.x + player.w);
        if (dist > 0 && dist < 70) { jump(); break; }
      }
    }

    // Collision
    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      // Player bounding box
      var pLeft = player.x + 4; // slight padding
      var pRight = player.x + player.w - 4;
      var pTop = player.y - player.h + 6;
      var pBottom = player.y;

      // Obstacle bounding box
      var oLeft = o.x;
      var oRight = o.x + o.w;
      var oTop = o.y;
      var oBottom = o.y + o.h;

      if (pLeft < oRight && pRight > oLeft &&
          pTop < oBottom && pBottom > oTop) {
        if (isDemo) {
          // In demo the AI shouldn't die; clear the obstacle it failed to clear
          obstacles.splice(i, 1);
          i--;
        } else {
          gameOver(); return;
        }
      }
    }

    // Particles
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  // ==================== DRAW ====================
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // --- LAYER 0: Deep space planets ---
    for (var i = 0; i < planets.length; i++) {
      drawPlanet(planets[i]);
    }

    // --- LAYER 0.5: Spaceship trails ---
    for (var i = 0; i < spaceships.length; i++) {
      var s = spaceships[i];
      for (var j = 0; j < s.trail.length; j++) {
        var t = s.trail[j];
        ctx.fillStyle = s.color;
        ctx.globalAlpha = t.life / 10 * 0.35;
        ctx.fillRect(t.x, t.y, 2, 1);
      }
    }
    ctx.globalAlpha = 1;

    // --- LAYER 1: Distant buildings (skyline) ---
    for (var i = 0; i < buildings.length; i++) {
      var b = buildings[i];
      var by = groundY - b.h;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(b.x, by, b.w, b.h);
      ctx.strokeStyle = b.color;
      ctx.globalAlpha = 0.1;
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, by, b.w, b.h);
      ctx.fillStyle = b.color;
      ctx.globalAlpha = 0.06;
      for (var wy = by + 8; wy < by + b.h - 4; wy += 14) {
        for (var wx = b.x + 5; wx < b.x + b.w - 6; wx += 10) {
          if (Math.random() > 0.3) ctx.fillRect(wx, wy, 3, 2);
        }
      }
      ctx.globalAlpha = 1;
    }

    // --- LAYER 2: Scrolling grid ---
    ctx.strokeStyle = 'rgba(0,240,255,0.05)';
    ctx.lineWidth = 1;
    for (var gx = -gridOffset; gx < W + 60; gx += 60) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (var gy = 0; gy < H; gy += 60) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // --- LAYER 3: Data rain ---
    for (var i = 0; i < dataDrops.length; i++) {
      var d = dataDrops[i];
      ctx.strokeStyle = neonCyan;
      ctx.globalAlpha = Math.min(1, d.life / 40);
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y + d.len); ctx.stroke();
      ctx.fillStyle = neonGreen;
      ctx.globalAlpha = Math.min(0.6, d.life / 50);
      ctx.fillRect(d.x - 1, d.y + d.len - 1, 2, 2);
    }
    ctx.globalAlpha = 1;

    // --- LAYER 3.5: Spaceships ---
    for (var i = 0; i < spaceships.length; i++) {
      drawSpaceship(spaceships[i]);
    }

    // --- LAYER 4: Ground line ---
    ctx.strokeStyle = neonCyan;
    ctx.lineWidth = 2;
    ctx.shadowColor = neonCyan;
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
    ctx.shadowBlur = 0;

    // Ground data dots
    for (var i = 0; i < 20; i++) {
      var dx = ((frame * speed * 0.5 + i * 43) % (W + 120)) - 60;
      ctx.fillStyle = neonGreen;
      ctx.shadowColor = neonGreen;
      ctx.shadowBlur = 4;
      ctx.fillRect(dx, groundY - 4, 3, 3);
    }
    ctx.shadowBlur = 0;

    // --- LAYER 5: Obstacles ---
    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = o.color;
      ctx.shadowBlur = 8;
      ctx.strokeRect(o.x, o.y, o.w, o.h);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;
      ctx.beginPath(); ctx.moveTo(o.x, o.y + o.h * 0.3); ctx.lineTo(o.x + o.w, o.y + o.h * 0.3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(o.x, o.y + o.h * 0.7); ctx.lineTo(o.x + o.w, o.y + o.h * 0.7); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // --- LAYER 6: Player ---
    drawPlayer(player.x, player.y);

    // --- LAYER 7: Particles ---
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 15;
      ctx.fillRect(p.x, p.y, 3, 3);
    }
    ctx.globalAlpha = 1;

    // --- Messages ---
    if (state === 'idle') {
      ctx.fillStyle = neonCyan;
      ctx.font = '13px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.5 + Math.sin(frame * 0.08) * 0.3;
      ctx.shadowColor = neonCyan;
      ctx.shadowBlur = 10;
      ctx.fillText('[ AUTO-DEMO ] SPACEキー または タップでプレイ開始', W / 2, H - 90);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    if (state === 'over') {
      ctx.fillStyle = neonMagenta;
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.shadowColor = neonMagenta;
      ctx.shadowBlur = 12;
      ctx.fillText('GAME OVER', W / 2, H - 90);
      ctx.shadowBlur = 0;
    }
  }

  function drawPlanet(p) {
    var px = p.x, py = p.y, pr = p.r;
    ctx.save();

    // Planet body glow
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 35;

    // Main planet body - bright fill
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Neon outline - brighter
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    ctx.stroke();

    // Inner glow ring
    ctx.lineWidth = 4;
    ctx.globalAlpha = 0.15;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Surface detail - horizontal bands (brighter)
    ctx.strokeStyle = p.color;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 1.2;
    for (var b = -pr + 8; b < pr - 6; b += 12 + Math.random() * 6) {
      var halfW = Math.sqrt(Math.max(0, pr * pr - b * b)) * 0.8;
      ctx.beginPath();
      ctx.moveTo(px - halfW, py + b);
      ctx.lineTo(px + halfW, py + b);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Ring (Saturn-like) - brighter
    if (p.hasRing) {
      ctx.strokeStyle = p.ringColor;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 3;
      ctx.shadowColor = p.ringColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(px, py, pr * 1.55, pr * 0.28, -0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawSpaceship(s) {
    var sx = s.x, sy = s.y, sc = s.size;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(sc, sc);

    // Flicker effect
    if (s.flicker > 27 && s.flicker < 29) { ctx.restore(); return; }

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = s.color;
    ctx.shadowBlur = 10;

    if (s.type === 0) {
      // Classic saucer shape
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, -3, 10, 5, 0, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      // Cockpit glow
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(0, -2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (s.type === 1) {
      // Fighter / arrow shape
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(0, -8);
      ctx.lineTo(-12, -4);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-12, 4);
      ctx.lineTo(0, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Engine glow
      ctx.fillStyle = neonYellow;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(-14, -2, 4, 4);
      ctx.globalAlpha = 1;
    } else {
      // Cargo / blocky ship
      ctx.fillRect(-14, -5, 28, 10);
      ctx.strokeRect(-14, -5, 28, 10);
      ctx.fillRect(10, -3, 8, 6);
      ctx.strokeRect(10, -3, 8, 6);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(-4, -3, 6, 6);
      ctx.globalAlpha = 1;
    }

    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawPlayer(x, y) {
    var px = x, py = y - 28;
    ctx.fillStyle = neonCyan;
    ctx.shadowColor = neonCyan;
    ctx.shadowBlur = 12;
    ctx.fillRect(px + 4, py + 6, 16, 16);
    ctx.fillStyle = '#000';
    ctx.shadowBlur = 0;
    ctx.fillRect(px + 14, py + 8, 5, 4);
    ctx.fillStyle = neonGreen;
    ctx.fillRect(px + 14, py + 9, 3, 2);
    ctx.fillStyle = neonCyan;
    ctx.shadowColor = neonCyan;
    ctx.shadowBlur = 8;
    if (!player.grounded) {
      ctx.fillRect(px + 4, py + 22, 5, 6);
      ctx.fillRect(px + 15, py + 22, 5, 6);
    } else {
      var legOff = Math.sin(frame * 0.4) * 3;
      ctx.fillRect(px + 4, py + 22, 5, 6 + legOff);
      ctx.fillRect(px + 15, py + 22, 5, 6 - legOff);
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0,240,255,0.15)';
    ctx.fillRect(px - 8, py + 24, 8, 6);
  }

  // ==================== ACTIONS ====================
  function jump() {
    if (player.grounded) {
      player.vy = jumpForce;
      player.grounded = false;
      for (var i = 0; i < 5; i++) {
        particles.push({
          x: player.x + 12,
          y: player.y,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 + 1,
          life: 10 + Math.random() * 5,
          color: neonCyan
        });
      }
    }
  }

  function startGame() {
    if (state === 'playing') return;
    obstacles = [];
    particles = [];
    dataDrops = [];
    spaceships = [];
    spaceshipTimer = 60;
    planets = [];
    initPlanets();
    score = 0;
    speed = 4;
    spawnTimer = 0;
    gridOffset = 0;
    player.y = groundY;
    player.vy = 0;
    initBuildings();
    state = 'playing';
    msgEl.textContent = '';
    updateUI();
  }

  function gameOver() {
    state = 'over';
    // Explosion particles
    for (var i = 0; i < 20; i++) {
      particles.push({
        x: player.x + 12,
        y: player.y - 14,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 15 + Math.random() * 15,
        color: Math.random() > 0.5 ? neonMagenta : neonYellow
      });
    }
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('neonRunnerHigh', highScore);
    }
    updateUI();
    msgEl.textContent = '[ SPACEキー でリトライ ]';
  }

  function updateUI() {
    // Hidden in pure background mode
  }

  // ==================== INPUT ====================
  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (state === 'idle' || state === 'over') startGame();
      else jump();
    }
  });

  canvas.addEventListener('click', function() {
    if (state === 'idle' || state === 'over') startGame();
    else jump();
  });

  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    if (state === 'idle' || state === 'over') startGame();
    else jump();
  });

  // ==================== START ====================
  init();
})();
