/**
 * Main JavaScript File
 * Michi - Portfolio Website
 * Author: Ajiboye Michael
 * Description: Simple and clean JavaScript for portfolio functionality
 */

// ==================== DOCUMENT READY ====================
document.addEventListener('DOMContentLoaded', function() {
	console.log('Website loaded successfully');
	
	// Initialize all functions
	initNavigation();
	initContactForm();
	initCounter();
	animateOnScroll();
});

// ==================== NAVIGATION ====================
/**
 * Initialize smooth navigation menu
 */
function initNavigation() {
	const navLinks = document.querySelectorAll('.nav-menu a');
	
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			
			// Get the target section
			const targetId = this.getAttribute('href').substring(1);
			const targetSection = document.getElementById(targetId);
			
			if (targetSection) {
				// Smooth scroll to section
				targetSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}

// ==================== CONTACT FORM ====================
/**
 * Initialize contact form functionality
 */
function initContactForm() {
	const sendBtn = document.getElementById('send-message-btn');
	
	if (sendBtn) {
		sendBtn.addEventListener('click', function(e) {
			e.preventDefault();
			handleFormSubmit();
		});
	}
}

/**
 * Handle form submission and send to WhatsApp
 */
function handleFormSubmit() {
	// Get form field values
	const nameField = document.getElementById('contact-name');
	const emailField = document.getElementById('contact-email');
	const subjectField = document.getElementById('contact-subject');
	const messageField = document.getElementById('contact-message');
	
	// Trim whitespace
	const name = nameField.value.trim();
	const email = emailField.value.trim();
	const subject = subjectField.value.trim();
	const message = messageField.value.trim();
	
	// Validate that message is not empty
	if (!message) {
		showAlert('Please enter a message before sending.', 'error');
		return;
	}
	
	// Build the complete message text
	let completeMessage = buildMessage(name, email, subject, message);
	
	// Send to WhatsApp
	sendToWhatsApp(completeMessage);
}

/**
 * Build the complete message text for WhatsApp
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {string} subject - Message subject
 * @param {string} message - Main message
 * @return {string} - Formatted message
 */
function buildMessage(name, email, subject, message) {
	let text = '';
	
	if (name) {
		text += 'Name: ' + name + '\n';
	}
	
	if (email) {
		text += 'Email: ' + email + '\n';
	}
	
	if (subject) {
		text += 'Subject: ' + subject + '\n\n';
	}
	
	text += message;
	
	return text;
}

/**
 * Open WhatsApp with pre-filled message
 * @param {string} message - Message to send
 */
function sendToWhatsApp(message) {
	const whatsappNumber = '2348025147552'; // Business number
	const encodedMessage = encodeURIComponent(message);
	const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodedMessage;
	
	// Open WhatsApp
	window.location.href = whatsappUrl;
}

/**
 * Show alert message to user
 * @param {string} message - Message to display
 * @param {string} type - Alert type (success, error, info)
 */
function showAlert(message, type) {
	// For simplicity, use browser alert
	// In production, you might want to use a custom alert
	alert(message);
}

// ==================== COUNTER ANIMATION ====================
/**
 * Animate counter numbers when section comes into view
 */
function initCounter() {
	const counterSection = document.querySelector('.counter');
	
	if (!counterSection) return;
	
	// Use Intersection Observer to trigger animation
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				animateCounters();
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });
	
	observer.observe(counterSection);
}

/**
 * Animate counter numbers from 0 to target value
 */
function animateCounters() {
	const counters = document.querySelectorAll('.counter-number');
	const duration = 2000; // 2 seconds
	
	counters.forEach(counter => {
		const target = parseInt(counter.textContent);
		const increment = target / (duration / 16); // 60 FPS
		let current = 0;
		
		const updateCounter = () => {
			current += increment;
			if (current < target) {
				counter.textContent = Math.floor(current);
				requestAnimationFrame(updateCounter);
			} else {
				counter.textContent = target;
			}
		};
		
		updateCounter();
	});
}

// ==================== SCROLL ANIMATIONS ====================
/**
 * Animate elements as they come into view while scrolling
 */
function animateOnScroll() {
	// Get all elements that should animate
	const animateElements = document.querySelectorAll(
		'.skill-card, .service-card, .counter-item, .info-box'
	);
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Add animation class
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, { threshold: 0.1 });
	
	// Set initial state
	animateElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(20px)';
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(el);
	});
}

// ==================== UTILITY FUNCTIONS ====================
/**
 * Log browser console information
 */
function logInfo() {
	console.log('%cMichi Portfolio', 'font-size: 20px; font-weight: bold; color: #F96D00;');
	console.log('Website designed and developed by Ajiboye Michael');
	console.log('Email: michaelajiboye26@gmail.com');
	console.log('WhatsApp: +234 8025147552');
}

// Log info on page load
logInfo();
