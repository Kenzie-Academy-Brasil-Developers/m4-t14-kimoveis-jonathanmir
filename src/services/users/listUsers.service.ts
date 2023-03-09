import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { userListSchema } from "../../schemas/user.schema";

const listAllUsersService = async (user: Express.Request["user"]) => {
  const userRepository = AppDataSource.getRepository(User);
  const users: Array<User> = await userRepository.find();

  if (!user.admin) {
    throw new AppError("Insufficient permission", 403);
  }
  const parseUsers = userListSchema.parse(users);
  return parseUsers;
};

export default listAllUsersService;
