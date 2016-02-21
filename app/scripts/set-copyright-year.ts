window.addEventListener('load', function() {
    let copyrightContainer = <HTMLElement> document.querySelector('.copyright-year');
    copyrightContainer.innerHTML = String((new Date()).getFullYear());
});