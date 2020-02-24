const body = document.querySelector("body");

setInterval(createZombie, 500);

function createZombie() {
  let zombie = document.createElement("img");
  zombie.src = "zombie.png";
  zombie.alt = "zombie-image";
  let randomY = Math.floor(Math.random() * (body.offsetHeight - zombie.offsetHeight));
  zombie.style.top = randomY + "px";
  zombie.style.left = "-10px";
  body.appendChild(zombie);
  
  setTimeout(moveZombie, 100, zombie);
  
}

function moveZombie(zombie) {
  let value = parseInt(zombie.style.left); 
  zombie.style.left = value + 50 + "px";
  if(value < body.offsetWidth) {
    setTimeout(moveZombie, 100, zombie);
  } else {
    zombie.remove();
  }
}