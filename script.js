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
    // Set the active tab
    tabs.forEach(tab => {
        if (tab === callingElement)
            tab.classList.add('active');
        else
            tab.classList.remove('active');
        
        window.scrollY = 999;
    });

    // Hide all direction blocks
    directions.forEach(direction => {
        direction.style.display = 'none';
    });

    // Show the desired direction block
    document.getElementById(id).style.display = 'block';
}