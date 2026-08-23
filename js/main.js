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
