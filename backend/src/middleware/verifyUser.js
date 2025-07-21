// src/middleware/verifyUser.js
const admin = require("../config/firebase");

const PostgresAuthRepository = require("../repositories/implementations/PostgresAuthRepository");
const AuthService = require("../services/implementations/AuthService");

const authRepo = new PostgresAuthRepository();
const authService = new AuthService(authRepo);

module.exports = async function verifyUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token bulunamadı veya geçersiz." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Firebase token doğrulama ve DB'den kullanıcı bilgisi alma
    const userData = await authService.verifyAndGetUser(token);

    // Kullanıcı bilgilerini req'e ekle
    req.user = userData;
    req.token = token;

    next();
  } catch (err) {
    console.error("❌ verifyUser hatası:", err.message);
    return res.status(403).json({ message: "Yetkisiz erişim." });
  }
};
