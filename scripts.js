window.onscroll = function() {
    var navbar = document.querySelector(".navbar")
    if (window.pageYOffset >= 100) {
        navbar.classList.add('bg-dark')
    }else {
        navbar.classList.remove('bg-dark')
    }
}