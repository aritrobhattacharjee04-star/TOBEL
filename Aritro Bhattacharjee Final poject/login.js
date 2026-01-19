// Material Design Login Form JavaScript
class MaterialLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.material-btn');
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.social-btn');
        
        // Target page for successful login
        this.redirectUrl = 'dashboard.html'; 
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupSocialButtons();
        this.setupRippleEffects();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', (e) => {
            this.createRipple(e, this.passwordToggle.querySelector('.toggle-ripple'));
            
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            
            const icon = this.passwordToggle.querySelector('.toggle-icon');
            icon.classList.toggle('show-password', type === 'text');
        });
    }
    
    setupSocialButtons() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const provider = button.classList.contains('google-material') ? 'Google' : 'Facebook';
                this.createRipple(e, button.querySelector('.social-ripple'));
                this.handleSocialLogin(provider, button);
            });
        });
    }
    
    setupRippleEffects() {
        // Setup ripples for main button
        this.submitButton.addEventListener('click', (e) => {
            this.createRipple(e, this.submitButton.querySelector('.btn-ripple'));
        });
        
        // Setup checkbox ripple
        const checkboxWrapper = document.querySelector('.checkbox-wrapper');
        checkboxWrapper.addEventListener('mousedown', (e) => {
            const rippleContainer = checkboxWrapper.querySelector('.checkbox-ripple');
            this.createRipple(e, rippleContainer, true); // Added 'isCheckbox' flag
        });
        
        // Setup ripples for inputs (Focus on input wrapper)
        [this.emailInput, this.passwordInput].forEach(input => {
            input.addEventListener('mousedown', (e) => {
                const rippleContainer = input.closest('.input-wrapper').querySelector('.ripple-container');
                this.createRipple(e, rippleContainer);
            });
        });
    }
    
    createRipple(event, container, isCheckbox = false) {
        if (event.button !== 0) return; // Only process left clicks

        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * (isCheckbox ? 2 : 1);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        container.innerHTML = ''; 
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('email', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('email', 'Enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            return false;
        }
        
        this.clearError('password');
        return true;
    }
    
    showError(field, message) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        const input = document.getElementById(field);
        input.style.animation = 'materialShake 0.4s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 400);
    }
    
    clearError(field) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 200);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            this.submitButton.style.animation = 'materialPulse 0.3s ease';
            setTimeout(() => {
                this.submitButton.style.animation = '';
            }, 300);
            return;
        }
        
        this.setLoading(true);
        
        try {
            // 1. Simulate authentication delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // ******************************************************
            // ⚠️ সংযোজন: Local Storage-এ ব্যবহারকারীর নাম সেভ করা
            // ইমেলের @ এর আগের অংশটি নাম হিসেবে ব্যবহার করা হচ্ছে
            const userName = this.emailInput.value.trim().split('@')[0];
            localStorage.setItem('userName', userName);
            // ******************************************************
            
            // 2. Authentication Success Animation
            this.showMaterialSuccess();
            
        } catch (error) {
            this.showError('password', 'Sign in failed. Please try again.');
        } finally {
            // Loading state will be removed inside showMaterialSuccess
        }
    }
    
    async handleSocialLogin(provider, button) {
        console.log(`Initiating ${provider} sign-in...`);
        
        // Add Material loading state
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log(`Redirecting to ${provider} authentication...`);
        } catch (error) {
            console.error(`${provider} authentication failed: ${error.message}`);
        } finally {
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
        }
    }
    
    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
        
        this.socialButtons.forEach(button => {
            button.style.pointerEvents = loading ? 'none' : 'auto';
            button.style.opacity = loading ? '0.6' : '1';
        });
    }
    
    showMaterialSuccess() {
        this.setLoading(false);

        // Hide main login elements with Material motion
        document.querySelector('.login-header').style.display = 'none';
        this.form.style.transform = 'translateY(-16px) scale(0.95)';
        this.form.style.opacity = '0';
        document.querySelector('.divider').style.opacity = '0';
        document.querySelector('.social-login').style.opacity = '0';
        document.querySelector('.signup-link').style.opacity = '0';

        setTimeout(() => {
            // Hide all elements completely after motion
            document.querySelector('.login-header').style.display = 'none';
            this.form.style.display = 'none';
            document.querySelector('.divider').style.display = 'none';
            document.querySelector('.social-login').style.display = 'none';
            document.querySelector('.signup-link').style.display = 'none';
            
            // Show success message
            this.successMessage.classList.add('show');
            
            const successIcon = this.successMessage.querySelector('.success-icon');
            successIcon.style.animation = 'materialSuccessScale 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
        }, 300);
        
        // 3. Final Redirect
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
            window.location.href = this.redirectUrl; 
        }, 2500);
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MaterialLoginForm();
});