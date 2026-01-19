// dashboard-script.js

document.addEventListener('DOMContentLoaded', () => {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutButton = document.getElementById('logoutButton');
    
    // 1. লোকাল স্টোরেজ থেকে ব্যবহারকারীর নাম লোড করা
    const storedUserName = localStorage.getItem('userName');
    
    if (storedUserName) {
        // যদি নাম পাওয়া যায়, তবে ড্যাশবোর্ডে দেখান
        userNameDisplay.textContent = storedUserName;
    } else {
        // যদি কোনো নাম না থাকে (সরাসরি ড্যাশবোর্ডে এলে), তবে লগইন পেজে ফিরিয়ে দিন
        userNameDisplay.textContent = 'User'; 
        // alert('Session Expired or Not Logged In. Redirecting to Login.');
        // window.location.href = 'index.html'; // লগইন পেজ
    }

    // 2. লগআউট ফাংশন
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userName'); // স্টোরেজ থেকে নাম মুছে দিন
        alert('You have been logged out.');
        window.location.href = 'index.html'; // লগইন পেজে রিডাইরেক্ট করুন
    });
});