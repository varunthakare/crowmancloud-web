// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

// Email validation with sanitization
export function validateEmail(email: string): ValidationResult {
  const sanitized = email.trim().toLowerCase();
  
  // Basic email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!sanitized) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (sanitized.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }
  
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, sanitized };
}

// Name validation with sanitization
export function validateName(name: string): ValidationResult {
  const sanitized = name.trim().replace(/[<>\"'&]/g, ''); // Remove potentially dangerous characters
  
  if (!sanitized) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (sanitized.length > 100) {
    return { isValid: false, error: 'Name is too long (max 100 characters)' };
  }
  
  // Only allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(sanitized)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  return { isValid: true, sanitized };
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Password is too long (max 128 characters)' };
  }
  
  // Check for at least one uppercase, one lowercase, one number, and one special character
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!hasUppercase) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!hasLowercase) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!hasNumber) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  if (!hasSpecialChar) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }
  
  return { isValid: true };
}

// OTP validation
export function validateOTP(otp: string): ValidationResult {
  const sanitized = otp.trim().replace(/\D/g, ''); // Remove non-digits
  
  if (!sanitized) {
    return { isValid: false, error: 'OTP is required' };
  }
  
  if (sanitized.length !== 6) {
    return { isValid: false, error: 'OTP must be exactly 6 digits' };
  }
  
  return { isValid: true, sanitized };
}

// Message validation with sanitization
export function validateMessage(message: string): ValidationResult {
  const sanitized = message.trim().replace(/[<>]/g, ''); // Remove HTML tags
  
  if (!sanitized) {
    return { isValid: false, error: 'Message is required' };
  }
  
  if (sanitized.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters long' };
  }
  
  if (sanitized.length > 1000) {
    return { isValid: false, error: 'Message is too long (max 1000 characters)' };
  }
  
  return { isValid: true, sanitized };
}

// Role validation
export function validateRole(role: string): ValidationResult {
  const validRoles = [
    'Developer',
    'DevOps Engineer', 
    'Software Engineer',
    'System Administrator',
    'Cloud Architect',
    'Technical Lead',
    'CTO',
    'Product Manager',
    'Other'
  ];
  
  const sanitized = role.trim();
  
  if (!sanitized) {
    return { isValid: false, error: 'Role is required' };
  }
  
  if (!validRoles.includes(sanitized)) {
    return { isValid: false, error: 'Please select a valid role' };
  }
  
  return { isValid: true, sanitized };
}

// Generic text sanitization
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length
}

// Rate limiting helper
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }
  
  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt);
    
    return Math.max(0, remainingTime);
  }
}

// Global rate limiters
export const emailRateLimiter = new RateLimiter(3, 5 * 60 * 1000); // 3 attempts per 5 minutes
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const otpRateLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 attempts per 10 minutes