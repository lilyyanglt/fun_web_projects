
const redDoor = document.querySelector("#btn-orange-img")
const greyDoor = document.querySelector("#btn-grey-img")
const cyanDoor = document.querySelector("#btn-cyan-img")
const output = document.querySelector("#output")

let images = ["images/candy.png", "images/zombie.png", "images/zombie.png"]

for (let i = 0; i < images.length; i++) {
  let randomIndex = Math.floor(Math.random() * 3)
  let temp = images[i]
  images[i] = images[randomIndex]
  images[randomIndex] = temp
}

redDoor.onclick = function(e) {
  changeImage(redDoor, 0)
}

greyDoor.onclick = function(e) {
  changeImage(greyDoor, 1)
}

cyanDoor.onclick = function(e) {
  changeImage(cyanDoor, 2)
}

function changeImage(element, index) {
  element.src = images[index]
  if (images[index] == "images/candy.png") {
      output.innerText = "CONGRATS! You found the Treat!"
  } else {
      output.innerText = "So Close!!! Try again!"
  }
}

document.querySelector("#btn-orange").onclick = function(e) {
  redDoor.src = images[0]
}

document.querySelector("#btn-grey").onclick = function(e) {
  greyDoor.src = images[1]
}

document.querySelector("#btn-cyan").onclick = function(e) {
  cyanDoor.src = images[2]
}

