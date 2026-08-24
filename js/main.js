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

// Dyslexia-friendly font toggle — preference persists via localStorage
(function(){
  var toggle = document.getElementById('dyslexiaToggle');
  if (!toggle) return;

  function apply(on){
    document.body.classList.toggle('dyslexia-mode', on);
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  var saved = false;
  try { saved = localStorage.getItem('dyslexiaFont') === 'on'; } catch (e) { /* storage unavailable, default off */ }
  apply(saved);

  toggle.addEventListener('click', function(){
    var next = !document.body.classList.contains('dyslexia-mode');
    apply(next);
    try { localStorage.setItem('dyslexiaFont', next ? 'on' : 'off'); } catch (e) { /* ignore */ }
  });
})();
