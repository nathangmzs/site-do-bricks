function toggleMode() {
    const body = document.body;
    const header = document.getElementById('main-header');  
    const logo = document.getElementById('background-logo');
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        logo.src = "Icons/logodark.png"; 
    } else {
        logo.src = "Icons/logo.png";  
    }
}