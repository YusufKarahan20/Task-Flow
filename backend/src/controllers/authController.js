const PostgresAuthRepository = require("../repositories/implementations/PostgresAuthRepository");
const AuthService = require("../services/implementations/AuthService");

const authRepo = new PostgresAuthRepository();
const authService = new AuthService(authRepo);

exports.register = async (req, res) => {
  const { idToken, role, code } = req.body;

  try {
    const message = await authService.register(idToken, role, code);
    res.status(201).json({ message: `✅ ${message}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await authService.verifyAndGetUser(req.token); // Yeni satır: token ile kullanıcıyı al

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role, //  frontend burayı bekliyor
    });
  } catch (err) {
    console.error("❌ /me hatası:", err.message);
    res.status(401).json({ message: "Kullanıcı doğrulanamadı" });
  }
};

