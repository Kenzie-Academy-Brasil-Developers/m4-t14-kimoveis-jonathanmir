import { Request, Response, NextFunction } from "express";

const ensureEmailAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const userRepository = AppDataSource.getRepository(User);
  return next();
};

export default ensureEmailAvailableMiddleware;
