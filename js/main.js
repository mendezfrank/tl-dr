// Mobile nav toggle
(function(){
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  if (!navToggle || !navList) return;
  navToggle.addEventListener('click', function(){
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){ navList.classList.remove('open'); });
  });
})();

// Ambient particle trail + noise grain
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('particle-canvas');
  if (reduceMotion || !canvas) { if(canvas) canvas.remove(); return; }
  var ctx = canvas.getContext('2d');
  var w, h, particles = [];
  var colors = ['#C06A32', '#DDAA4E', '#8FA06B'];
  function resize(){
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resize();
  window.addEventListener('resize', resize);
  var lastSpawn = 0;
  function hexToRgb(hex){
    return {
      r: parseInt(hex.slice(1,3),16),
      g: parseInt(hex.slice(3,5),16),
      b: parseInt(hex.slice(5,7),16)
    };
  }
  var colorRgb = colors.map(hexToRgb);
  window.addEventListener('mousemove', function(e){
    var now = performance.now();
    if (now - lastSpawn < 28) return; // throttle spawn rate
    lastSpawn = now;
    var x = e.clientX * devicePixelRatio;
    var y = e.clientY * devicePixelRatio;
    // chaos: 2-3 particles scatter outward at random
    var count = 2 + Math.floor(Math.random() * 2);
    for (var i = 0; i < count; i++){
      var angle = Math.random() * Math.PI * 2;
      var speed = (0.6 + Math.random() * 1.4) * devicePixelRatio;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.01, // settling toward calm
        size: (1.4 + Math.random() * 1.8) * devicePixelRatio,
        rgb: colorRgb[Math.floor(Math.random() * colorRgb.length)]
      });
    }
    if (particles.length > 160) particles.splice(0, particles.length - 160);
  }, { passive: true });
  function tick(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = particles.length - 1; i >= 0; i--){
      var p = particles[i];
      // scatter decelerates — chaos settling into stillness
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0){ particles.splice(i, 1); continue; }
      var c = p.rgb;
      var radius = p.size * (2.2 + (1 - p.life) * 1.4);
      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      grad.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (p.life * 0.65) + ')');
      grad.addColorStop(0.6, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (p.life * 0.22) + ')');
      grad.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
