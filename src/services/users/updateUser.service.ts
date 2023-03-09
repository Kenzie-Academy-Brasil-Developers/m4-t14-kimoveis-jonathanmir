import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iUserPatchable } from "../../interfaces/user.intefaces";
import { returnUserWithoutPassword } from "../../schemas/user.schema";

const updateUserService = async (
  userData: iUserPatchable,
  userId: number,
  user: Express.Request["user"]
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const actualUser = await userRepository.findOneBy({
    id: userId,
  });
  if (!user.admin && actualUser!.admin) {
    throw new AppError("Insufficient permission", 403);
  }
  if (user.id != actualUser?.id && !user.admin) {
    throw new AppError("User unauthorized", 401);
  }
  const newUser = userRepository.create({
    ...actualUser,
    ...userData,
  });

  await userRepository.save(newUser);
  const updatedUser = returnUserWithoutPassword.parse(newUser);
  return updatedUser;
};

export default updateUserService;
