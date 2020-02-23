
const door1 = document.querySelector("#btn-orange-img")
const door2 = document.querySelector("#btn-grey-img")
const door3 = document.querySelector("#btn-cyan-img")
const reloadButton = document.querySelector("#reload")
const output = document.querySelector("#output")

let images = ["images/candy.png", "images/zombie.png", "images/zombie.png"]

for (let i = 0; i < images.length; i++) {
  let randomIndex = Math.floor(Math.random() * 3)
  let temp = images[i]
  images[i] = images[randomIndex]
  images[randomIndex] = temp
}

door1.onclick = function(e) {
  changeImage(door1, 0)
}

door2.onclick = function(e) {
  changeImage(door2, 1)
}

door3.onclick = function(e) {
  changeImage(door3, 2)
}

reloadButton.onclick = function(e) {
  location.reload();
}

function changeImage(element, index) {
  element.src = images[index]
  if (images[index] == "images/candy.png") {
      output.innerText = "CONGRATS! You found the Treat!"
  } else {
      output.innerText = "So Close!!! Try again!"
  }
}



