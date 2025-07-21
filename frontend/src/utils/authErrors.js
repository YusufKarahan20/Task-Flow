// src/utils/authErrors.js

const errorMessages = {
  "auth/invalid-email": "Geçersiz e-posta adresi",
  "auth/user-not-found": "Hatalı e-posta veya şifre",
  "auth/wrong-password": "Hatalı e-posta veya şifre",
  "auth/email-already-in-use": "Bu e-posta zaten kayıtlı",
  "auth/weak-password": "Şifre en az 6 karakter olmalı",
};

export const mapAuthCodeToMessage = (code) => {
  return errorMessages[code] || "Bir hata oluştu";
};
