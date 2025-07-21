const IAuthService = require("../interfaces/IAuthService");
const admin = require("../../config/firebase");

class AuthService extends IAuthService {
  constructor(authRepository) {
    super();
    this.authRepository = authRepository;
  }

  async register(idToken, role, code) {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    const normalizedRole = role.toLowerCase().replace(/\s+/g, "_");

    if (normalizedRole === "product_owner") {
      if (code !== process.env.PRODUCT_OWNER_SECRET) {
        throw new Error("Güvenlik kodu hatalı.");
      }
    }

    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Bu email zaten kayıtlı.");
    }

    const userId = await this.authRepository.createUser(email);
    const roleId = await this.authRepository.getRoleIdByName(normalizedRole);

    if (!roleId) throw new Error("Geçersiz rol.");

    await this.authRepository.assignRoleToUser(userId, roleId);

    return "Kullanıcı başarıyla kaydedildi.";
  }

  async getMe(user) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async verifyAndGetUser(idToken) {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const email = decoded.email;

    const user = await this.authRepository.findUserWithRoleByEmail(email);
    if (!user) throw new Error("Kullanıcı bulunamadı.");

    return user;  // { id, email, role }
  }
}

module.exports = AuthService;
