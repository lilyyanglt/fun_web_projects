const canvas = document.getElementById('painting_area');

document.getElementById('color_1').ondragstart = function(e) {
  console.log(e.target.outerHTML);
  console.log(this);
  e.dataTransfer.setData('application/my-app', e.target.id);
  e.dataTransfer.dropEffect = 'copy';
}

canvas.ondragover = function(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy'; 
}

canvas.ondrop = function(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('application/my-app');
  console.log(document.getElementById(data));
  e.target.appendChild(document.getElementById(data));
}

