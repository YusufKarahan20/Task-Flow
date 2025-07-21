const PostgresUserRepository = require("../repositories/implementations/PostgresUserRepository");
const UserService = require("../services/implementations/UserService");

const userRepo = new PostgresUserRepository();
const userService = new UserService(userRepo);

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Kullanıcılar alınamadı:", err);
    res.status(500).json({ error: "Kullanıcılar alınamadı" });
  }
};
