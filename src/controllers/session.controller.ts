import { Request, Response, NextFunction } from "express";
import loginService from "../services/login/login.service";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;
  const validToken = await loginService(req.body);
  return res.json({ token: `${validToken}` });
};

export default loginController;
