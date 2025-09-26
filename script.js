// Python Functions Reference Guide - JavaScript

// PDF Download Functionality
async function downloadPDF() {
    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.textContent;
    
    try {
        // Show loading state
        downloadBtn.textContent = '⏳ Generating PDF...';
        downloadBtn.disabled = true;
        
        // Create PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add title page
        pdf.setFontSize(24);
        pdf.setTextColor(44, 62, 80);
        pdf.text('Python Functions Reference Guide', 20, 30);
        
        pdf.setFontSize(14);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Complete reference for Python built-in functions and math module', 20, 45);
        
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        
        let yPosition = 70;
        const pageHeight = 297; // A4 height in mm
        const margin = 20;
        
        // Add table of contents
        pdf.setFontSize(16);
        pdf.setTextColor(44, 62, 80);
        pdf.text('Table of Contents', margin, yPosition);
        yPosition += 15;
        
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text('1. Python Built-in Functions ........................... 3', margin, yPosition);
        yPosition += 8;
        pdf.text('2. Python Math Module Functions .................... 15', margin, yPosition);
        yPosition += 8;
        pdf.text('3. Practical Usage Examples ......................... 25', margin, yPosition);
        yPosition += 8;
        pdf.text('4. Quick Reference Tips ............................. 28', margin, yPosition);
        
        // Add new page for content
        pdf.addPage();
        yPosition = 30;
        
        // Get all function cards
        const sections = document.querySelectorAll('.section');
        
        // Process each section
        sections.forEach((sectionElement, sectionIndex) => {
            const sectionHeader = sectionElement.querySelector('h2');
            if (!sectionHeader) return;
            
            // Add section header
            pdf.setFontSize(18);
            pdf.setTextColor(44, 62, 80);
            const sectionTitle = sectionHeader.textContent;
            pdf.text(sectionTitle, margin, yPosition);
            yPosition += 15;
            
            // Get function cards for this section
            const sectionCards = sectionElement.querySelectorAll('.function-card');
            
            sectionCards.forEach((card) => {
                // Check if we need a new page
                if (yPosition > pageHeight - 60) {
                    pdf.addPage();
                    yPosition = 30;
                }
                
                const functionName = card.querySelector('.function-name')?.textContent || '';
                const description = card.querySelector('.function-description')?.textContent || '';
                const syntax = card.querySelector('.function-syntax')?.textContent || '';
                const example = card.querySelector('.function-example')?.textContent || '';
                
                // Function name
                pdf.setFontSize(14);
                pdf.setTextColor(231, 76, 60);
                pdf.text(functionName, margin, yPosition);
                yPosition += 8;
                
                // Description
                pdf.setFontSize(10);
                pdf.setTextColor(85, 85, 85);
                const descLines = pdf.splitTextToSize(description, 170);
                pdf.text(descLines, margin, yPosition);
                yPosition += descLines.length * 5 + 3;
                
                // Syntax
                pdf.setFontSize(9);
                pdf.setTextColor(44, 62, 80);
                pdf.text('Syntax:', margin, yPosition);
                yPosition += 5;
                pdf.setTextColor(0, 0, 0);
                const syntaxLines = pdf.splitTextToSize(syntax, 170);
                pdf.text(syntaxLines, margin + 5, yPosition);
                yPosition += syntaxLines.length * 4 + 3;
                
                // Example
                pdf.setTextColor(39, 174, 96);
                pdf.text('Example:', margin, yPosition);
                yPosition += 5;
                pdf.setTextColor(0, 0, 0);
                const exampleLines = pdf.splitTextToSize(example, 170);
                pdf.text(exampleLines, margin + 5, yPosition);
                yPosition += exampleLines.length * 4 + 8;
            });
            
            yPosition += 10; // Space between sections
        });
        
        // Add footer to all pages
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text(`Page ${i} of ${pageCount}`, 170, 285);
            pdf.text('Python Functions Reference Guide', margin, 285);
        }
        
        // Save the PDF
        pdf.save('Python_Functions_Reference_Guide.pdf');
        
        // Success message
        downloadBtn.textContent = '✅ Downloaded!';
        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('PDF generation failed:', error);
        
        // Fallback to print dialog
        downloadBtn.textContent = '🖨️ Opening Print Dialog...';
        setTimeout(() => {
            window.print();
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
        }, 1000);
    }
}

// Search Functionality
function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="🔍 Search functions..." 
               autocomplete="off" aria-label="Search functions">
    `;
    
    const content = document.querySelector('.content');
    const firstChild = content.querySelector('.alphabet-nav');
    if (firstChild) {
        content.insertBefore(searchContainer, firstChild);
    } else {
        content.insertBefore(searchContainer, content.firstChild);
    }
    
    const searchInput = document.getElementById('searchInput');
    const functionCards = document.querySelectorAll('.function-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;
        
        functionCards.forEach(card => {
            const functionName = card.querySelector('.function-name')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.function-description')?.textContent.toLowerCase() || '';
            const syntax = card.querySelector('.function-syntax')?.textContent.toLowerCase() || '';
            
            if (searchTerm === '' || 
                functionName.includes(searchTerm) || 
                description.includes(searchTerm) ||
                syntax.includes(searchTerm)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update sections visibility
        updateSectionVisibility();
        
        // Show/hide "no results" message
        showNoResultsMessage(visibleCount === 0 && searchTerm !== '');
    });
    
    // Clear search on Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
            this.blur();
        }
    });
}

// Update section visibility based on search results
function updateSectionVisibility() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.function-card[style*="display: block"], .function-card:not([style*="display: none"])');
        const sectionHeader = section.querySelector('h2');
        
        if (visibleCards.length === 0) {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
}

// Show "no results" message
function showNoResultsMessage(show) {
    let noResultsMsg = document.getElementById('noResultsMessage');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'noResultsMessage';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>🔍 No functions found</h3>
                <p>Try adjusting your search terms or browse all functions below.</p>
            </div>
        `;
        document.querySelector('.content').appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('.alphabet-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 20;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Ctrl/Cmd + P to download PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            downloadPDF();
        }
    });
}

// Add copy functionality to code blocks
function setupCodeCopy() {
    const codeBlocks = document.querySelectorAll('.function-syntax, .function-example');
    
    codeBlocks.forEach(block => {
        block.style.position = 'relative';
        block.style.cursor = 'pointer';
        block.title = 'Click to copy';
        
        block.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalTitle = this.title;
                this.title = 'Copied!';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.title = originalTitle;
                    this.style.opacity = '1';
                }, 1000);
            }).catch(() => {
                console.log('Copy failed');
            });
        });
    });
}

// Theme toggle (if needed in future)
function setupThemeToggle() {
    // Reserved for future dark mode toggle functionality
}

// Analytics (if needed)
function trackEvent(eventName, properties = {}) {
    // Reserved for future analytics integration
    console.log('Event:', eventName, properties);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Python Functions Reference Guide loaded');
    
    // Initialize all functionality
    addSearchFunctionality();
    setupSmoothScrolling();
    setupKeyboardShortcuts();
    setupCodeCopy();
    
    // Track page load
    trackEvent('page_loaded', {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
});

// Service worker registration (for future PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Reserved for future PWA functionality
    });
}

// Utility functions
const utils = {
    // Debounce function for search
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Format text for better display
    formatText: function(text) {
        return text.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        downloadPDF,
        addSearchFunctionality,
        updateSectionVisibility,
        showNoResultsMessage,
        setupSmoothScrolling,
        setupKeyboardShortcuts,
        setupCodeCopy,
        setupThemeToggle,
        trackEvent,
        utils
    };
}