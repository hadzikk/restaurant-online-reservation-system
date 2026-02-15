export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'
  if (password.length < 6) {
    return 'Password must be at least 6 characters long'
  }
  return null
}

export const validateLoginForm = (email: string, password: string) => {
  const emailError = validateEmail(email)
  const passwordError = validatePassword(password)
  
  return {
    isValid: !emailError && !passwordError,
    errors: {
      email: emailError,
      password: passwordError
    }
  }
}