const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  try {
    console.log("🍪 Cookie recibida:", req.cookies.token);

    const token = req.cookies.token; // ← Lo leemos desde cookies

    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      idUsuario: decoded.idUsuario,
      rol: decoded.rol,
    };

    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

module.exports = verificarToken;
