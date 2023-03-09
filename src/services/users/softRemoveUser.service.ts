import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const softRemoveUserService = async (
  userId: number,
  user: Express.Request["user"]
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  if (!user.admin) {
    throw new AppError("Insufficient permission", 403);
  }
  if (user.admin) {
    await userRepository.softRemove(foundUser!);
  }
};

export default softRemoveUserService;
