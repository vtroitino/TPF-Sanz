const menuBtn = document.querySelector('.sidebar-boton'),
      sidebar = document.getElementById('mySidebar');
let menuOpen = false,
    sidebarWidth = window.innerWidth * (1/4); 

sidebar.style.width = sidebarWidth + "px";
sidebar.style.transform = "translateX(-" + sidebarWidth + "px)";
menuBtn.style.marginLeft = sidebarWidth + 15 + "px";

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;

        menuBtn.style.marginLeft = "15px";
        sidebar.style.left = sidebarWidth + "px";
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
        
        menuBtn.style.marginLeft = sidebarWidth + 15 + "px";
        sidebar.style.left = "0";
    }
})