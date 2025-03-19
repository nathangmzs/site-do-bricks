function toggleMode() {
    const body = document.body;
    const header = document.getElementById('main-header');
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
}