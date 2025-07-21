export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const passwordStrength = (pwd) => {
  if (pwd.length < 6) {
    return "Şifre en az 6 karakter olmalı.";
  }

  const hasUppercase = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);

  if (!hasUppercase || !hasNumber) {
    return "Şifre büyük harf ve sayı içermeli.";
  }

  return "";
};
