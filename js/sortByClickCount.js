/**
 * Sort buttons based on user click count
 * Buttons/links should have a data-key attribute for localStorage tracking
 */

function initializeClickTracking() {
    // Get all clickable elements (buttons, links, etc.)
    const clickableElements = document.querySelectorAll('[data-key]');
    
    clickableElements.forEach(element => {
        // Initialize click count in localStorage if not exists
        const key = element.getAttribute('data-key');
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '0');
        }
        
        // Add click event listener
        element.addEventListener('click', function() {
            const currentCount = parseInt(localStorage.getItem(key)) || 0;
            localStorage.setItem(key, currentCount + 1);
            // Update display if element has a counter display
            updateCountDisplay(element);
        });
        
        // Display initial count
        updateCountDisplay(element);
    });
}

function updateCountDisplay(element) {
    const key = element.getAttribute('data-key');
    const count = localStorage.getItem(key) || '0';
    const countDisplay = element.querySelector('.click-count');
    if (countDisplay) {
        countDisplay.textContent = `(${count})`;
    }
}

function sortButtonsByClickCount(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }
    
    // Get all clickable elements within container
    const elements = Array.from(container.querySelectorAll('[data-key]'));
    
    // Sort by click count in descending order
    elements.sort((a, b) => {
        const countA = parseInt(localStorage.getItem(a.getAttribute('data-key'))) || 0;
        const countB = parseInt(localStorage.getItem(b.getAttribute('data-key'))) || 0;
        return countB - countA;
    });
    
    // Reorder elements in DOM
    elements.forEach(element => {
        container.appendChild(element);
    });
}

function sortAllButtonsByClickCount() {
    // Sort buttons within their parent containers
    const containers = document.querySelectorAll('[data-sortable="true"]');
    containers.forEach(container => {
        const elements = Array.from(container.querySelectorAll('[data-key]'));
        
        elements.sort((a, b) => {
            const countA = parseInt(localStorage.getItem(a.getAttribute('data-key'))) || 0;
            const countB = parseInt(localStorage.getItem(b.getAttribute('data-key'))) || 0;
            return countB - countA;
        });
        
        elements.forEach(element => {
            container.appendChild(element);
        });
    });
}

function getClickStats() {
    const elements = document.querySelectorAll('[data-key]');
    const stats = [];
    
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        const count = parseInt(localStorage.getItem(key)) || 0;
        const label = element.textContent.trim();
        stats.push({ key, label, count });
    });
    
    return stats.sort((a, b) => b.count - a.count);
}

function clearClickCounts() {
    if (confirm('Are you sure you want to clear all click counts?')) {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            localStorage.removeItem(key);
            updateCountDisplay(element);
        });
        console.log('Click counts cleared');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeClickTracking);
