"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function roleMiddleware(role) {
  return (req, res, next) => {
    const { userRole } = req;

    if (!userRole || !role.includes(userRole)) {
      console.log(`Acesso negado! Role do usuário: ${userRole}`);
      return res.status(403).json({ message: "Acesso negado!" });
    }
    next();
  };
} exports.default = roleMiddleware;
