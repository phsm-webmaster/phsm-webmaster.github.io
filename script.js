document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

const directions = document.querySelectorAll('.directions');
const tabs = document.querySelectorAll('.tab');

function showDirections(callingElement, id) {
    
    tabs.forEach(tab => {
        if(tab === callingElement)
            tab.classList.add('active');
        else
            tab.classList.remove('active');
    })
    
    directions.forEach(direction => {
        direction.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}