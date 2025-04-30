// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navRegister = document.querySelector('.nav-register');

    mobileMenuBtn.addEventListener('click', function() {
        // Toggle mobile menu visibility
        navLinks.classList.toggle('active');
        navRegister.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navRegister.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
});

// Course Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
});

// Registration Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('registrationModal');
    const registerButtons = document.querySelectorAll('.register-btn, .nav-register, .primary-btn');
    const closeModal = document.querySelector('.close-modal');
    const registrationForm = document.getElementById('registrationForm');
    const teamGroup = document.getElementById('teamGroup');
    const fundraisingCheckbox = document.getElementById('fundraising');

    // Show modal when clicking any register button
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Toggle team name field based on fundraising checkbox
    fundraisingCheckbox.addEventListener('change', function() {
        teamGroup.style.display = this.checked ? 'block' : 'none';
    });

    // Handle form submission
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const formData = {
            raceType: document.getElementById('raceType').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            fundraising: document.getElementById('fundraising').checked,
            teamName: document.getElementById('teamName').value
        };

        // Here you would typically send the data to your server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Registration successful! We will contact you shortly with more details.');
        
        // Close modal and reset form
        modal.style.display = 'none';
        document.body.style.overflow = '';
        registrationForm.reset();
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 