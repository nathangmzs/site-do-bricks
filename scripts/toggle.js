function toggleMode() {
    const body = document.body;
    const header = document.getElementById('main-header');  
    const logo = document.getElementById('background-logo');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');

    // alternar a logo de acordo com o modo
    if (body.classList.contains('dark-mode')) {
        logo.src = "Icons/logodark.png"; 
        sunIcon.classList.remove("active");
        moonIcon.classList.add("active");
    } else {
        logo.src = "Icons/logo.png";  
        moonIcon.classList.remove("active");
        sunIcon.classList.add("active");
    }
}
