//Listeners del resize
// mapear()
// window.addEventListener('resize',mapear)
// function mapear(){
// 	document.getElementById("contbotones").style.left = document.documentElement.scrollWidth - document.getElementById("contbotones").offsetWidth - 10;
// 	document.getElementById("contbotones").style.top = document.documentElement.scrollHeight - document.getElementById("contbotones").offsetHeight - 10;
// }

//Listeners del mouse
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);

function mouseDown() {
  document.style.cursor = 'grab';
}

function mouseUp() {
  document.style.cursor = 'default';
}