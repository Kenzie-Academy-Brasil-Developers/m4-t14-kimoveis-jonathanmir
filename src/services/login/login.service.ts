import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserLogin } from "../../interfaces/user.intefaces";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors";

const loginService = async (userData: iUserLogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: userData.email,
  });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  const passwordMatch: boolean = await compare(
    userData.password,
    user!.password
  );
  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: user.id.toString(),
    }
  );
  return token;
};

export default loginService;
