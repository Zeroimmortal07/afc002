/**
 * Modern Modal Component (2026 Standard)
 * 
 * Features:
 * - Accessibility: ARIA roles, Focus Trap, Escape key support.
 * - Interactivity: Close on backdrop click, configurable timeout.
 * - Configuration: JSON-based configuration.
 */

export class Modal {
    constructor(modalId, options = {}) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) {
            console.error(`Modal with ID '${modalId}' not found.`);
            return;
        }

        this.options = {
            closeOnBackdrop: true,
            closeOnEscape: true,
            onOpen: null,
            onClose: null,
            ...options
        };

        this.isOpen = false;
        this.focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        this.previousActiveElement = null;

        this.init();
    }

    init() {
        // ARIA Setup
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');

        // Event Listeners
        this.modal.addEventListener('click', (e) => this.handleBackdropClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Close buttons
        const closeButtons = this.modal.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => btn.addEventListener('click', () => this.close()));
    }

    open() {
        if (this.isOpen) return;

        this.previousActiveElement = document.activeElement;
        this.isOpen = true;

        this.modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before adding opacity class for transition
        requestAnimationFrame(() => {
            this.modal.classList.add('open');
        });

        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        this.trapFocus();

        if (typeof this.options.onOpen === 'function') {
            this.options.onOpen();
        }
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.modal.classList.remove('open');

        // Wait for transition to finish
        this.modal.addEventListener('transitionend', () => {
            if (!this.isOpen) {
                this.modal.classList.add('hidden');
            }
        }, { once: true });

        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }

        if (typeof this.options.onClose === 'function') {
            this.options.onClose();
        }
    }

    handleBackdropClick(e) {
        if (this.options.closeOnBackdrop && e.target === this.modal) {
            this.close();
        }
    }

    handleKeyDown(e) {
        if (!this.isOpen) return;

        if (this.options.closeOnEscape && e.key === 'Escape') {
            this.close();
        }

        if (e.key === 'Tab') {
            this.handleFocusTrap(e);
        }
    }

    trapFocus() {
        const focusableElements = this.modal.querySelectorAll(this.focusableElementsString);
        if (focusableElements.length > 0) {
            this.firstFocusableElement = focusableElements[0];
            this.lastFocusableElement = focusableElements[focusableElements.length - 1];
            this.firstFocusableElement.focus();
        }
    }

    handleFocusTrap(e) {
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === this.firstFocusableElement) {
                e.preventDefault();
                this.lastFocusableElement.focus();
            }
        } else { // Tab
            if (document.activeElement === this.lastFocusableElement) {
                e.preventDefault();
                this.firstFocusableElement.focus();
            }
        }
    }
}
