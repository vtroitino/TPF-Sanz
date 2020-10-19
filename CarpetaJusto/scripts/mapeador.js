//Listeners del resize
mapear()
window.addEventListener('resize',mapear)
function mapear(){
	document.getElementById("contbotones").style.left = document.documentElement.scrollWidth - document.getElementById("contbotones").offsetWidth - 10;
	document.getElementById("contbotones").style.top = document.documentElement.scrollHeight - document.getElementById("contbotones").offsetHeight - 10;
}

//Listeners del mouse
document.getElementById("canvaspace").addEventListener("mousedown", mouseDown);
document.getElementById("canvaspace").addEventListener("mouseup", mouseUp);

function mouseDown() {
  body.style.cursor = 'grab';
  event.preventDefault();
}

function mouseUp() {
  body.style.cursor = 'default';
  event.preventDefault();
}