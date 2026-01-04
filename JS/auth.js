function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email');
        return false;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return false;
    }
    
    // Simulate login success
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'products.html';
    return false;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sendOTP() {
    const mobile = document.getElementById('mobile').value;
    if (!/^[6-9]\d{9}$/.test(mobile)) {
        alert('Please enter valid Mumbai mobile number');
        return;
    }
    
    // Simulate OTP send
    localStorage.setItem('otp', '123456'); // In real app, send to server
    document.querySelector('.otp-section').style.display = 'block';
}

function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;
    if (enteredOTP === localStorage.getItem('otp')) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Invalid OTP. Please try again.');
    }
} 