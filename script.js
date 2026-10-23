function route() {
  var isMenu = location.hash === '#cardapio';
  document.getElementById('home').hidden = isMenu;
  document.getElementById('cardapio').hidden = !isMenu;
  window.scrollTo(0, 0);
}

function updateStatus() {
  var box = document.getElementById('status');
  var txt = document.getElementById('statusText');
  try {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', hour12: false
    }).formatToParts(new Date());
    var wd = parts.find(function (p) { return p.type === 'weekday'; }).value;
    var h = parseInt(parts.find(function (p) { return p.type === 'hour'; }).value, 10) % 24;
    var openDays = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var open = openDays.indexOf(wd) > -1 && h >= 15 && h < 22;
    box.className = 'status ' + (open ? 'open' : 'closed');
    txt.textContent = open ? 'Aberto agora, até as 22h' : 'Fechado agora';
  } catch (e) {
    box.style.display = 'none';
  }
}

window.addEventListener('hashchange', route);
route();
updateStatus();