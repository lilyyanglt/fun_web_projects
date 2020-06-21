const canvas = document.getElementById('painting-area');
const circles = document.querySelectorAll('.circle');

for(const div of circles) {
  div.ondragstart = function(e) {
    e.dataTransfer.setData('text/plain', e.target.style.backgroundColor);
    e.dataTransfer.dropEffect = 'copy';
  }
}
canvas.ondragover = function(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy'; 
}

canvas.ondrop = function(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text');
  e.target.style.backgroundColor = data;
  e.target.style.border = "none";
}

