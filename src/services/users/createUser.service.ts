import { iUserRequest, iUserReturn } from "../../interfaces/user.intefaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { returnUserWithoutPassword } from "../../schemas/user.schema";
import { AppError } from "../../errors";

const createUserService = async (
  userData: iUserRequest
): Promise<iUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(userData);
  const checkUserExists = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });
  if (checkUserExists) {
    throw new AppError("Email already exists", 409);
  }
  await userRepository.save(user);
  const newUser: iUserReturn = returnUserWithoutPassword.parse(user);
  return newUser;
};

export default createUserService;
