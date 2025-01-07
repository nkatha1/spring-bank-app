// Smooth scrolling
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href').substring(1); // Get target ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust for header height
                behavior: 'smooth' // Smooth scroll effect
            });
        }
    });
});

// Highlight active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // All sections
    const navLinks = document.querySelectorAll('nav ul li a'); // All nav links

    let currentSection = '';

    // Determine the currently visible section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Offset for fixed header
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id'); // Get section ID
        }
    });

    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active'); // Add active class to the current link
        }
    });
});

// Skills tab functionality
function showSkills(tab) {
    const tabs = document.querySelectorAll('.skills-tab');
    const links = document.querySelectorAll('.tab-links');

    // Hide all skill tabs
    tabs.forEach((tabContent) => tabContent.style.display = 'none');

    // Remove active-link class from all tabs
    links.forEach((link) => link.classList.remove('active-link'));

    // Show the selected tab and mark it active
    document.getElementById(tab).style.display = 'block';
    event.target.classList.add('active-link');
}

function openTab(tabName) {
    // Get all elements with class "tab-content" and hide them
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Get all elements with class "tab-links" and remove the "active-link" class
    const tabLinks = document.getElementsByClassName('tab-links');
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active-link');
    }

    // Show the current tab and add "active-link" to the clicked tab
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active-link');
}

// Add default tab behavior (optional)
window.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('.tab-links');
    if (defaultTab) {
        defaultTab.click(); // Trigger a click on the first tab by default
    }
});