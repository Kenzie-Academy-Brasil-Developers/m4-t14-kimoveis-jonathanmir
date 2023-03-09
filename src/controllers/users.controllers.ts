import { Request, Response, NextFunction } from "express";
import { iUserRequest } from "../interfaces/user.intefaces";
import createUserService from "../services/users/createUser.service";
import listAllUsersService from "../services/users/listUsers.service";
import softRemoveUserService from "../services/users/softRemoveUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await createUserService(req.body);
  return res.status(201).send(user);
};

const removeUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const success = await softRemoveUserService(req.user.id, req.user);
  return res.status(204).send();
};

const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData: iUserRequest = req.body;
  const userId: number = parseInt(req.params.id);
  const newUser = await updateUserService(userData, userId, req.user);
  return res.json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await listAllUsersService(req.user);
  return res.status(200).send(users);
};
export {
  createUserController,
  removeUserController,
  updateUserController,
  listUsersController,
};
