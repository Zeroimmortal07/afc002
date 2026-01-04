// Admin-Frontend Sync Module
// Add this script via <script src="sync.js"></script> in both admin.html and index.html

// Toast notification system
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        bottom: ${type === 'admin' ? '30px' : '100px'};
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Notify frontend that menu was updated
function triggerMenuUpdate() {
    localStorage.setItem('menuUpdated', 'true');
    localStorage.setItem('menuUpdateTime', new Date().toISOString());
}

// Check if menu was updated (for frontend)
function checkMenuUpdate() {
    return localStorage.getItem('menuUpdated') === 'true';
}

// Clear update flag
function clearMenuUpdate() {
    localStorage.removeItem('menuUpdated');
}

// Auto-refresh mechanism for frontend
if (window.location.href.includes('index.html')) {
    // Frontend code
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && checkMenuUpdate()) {
            clearMenuUpdate();
            window.location.reload();
            setTimeout(() => showToast('✅ Menu updated!'), 500);
        }
    });

    // Check every 30 seconds
    setInterval(() => {
        if (!document.hidden && checkMenuUpdate()) {
            clearMenuUpdate();
            window.location.reload();
            setTimeout(() => showToast('✅ Menu updated!'), 500);
        }
    }, 30000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

console.log('🔄 Admin-Frontend sync module loaded');
