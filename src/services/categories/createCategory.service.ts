import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  iCategoryRequest,
  iCategoryReturn,
} from "../../interfaces/categories.interfaces";
import { categoriesReturnSchema } from "../../schemas/categories.schemas";

const createCategoryService = async (
  categoryData: iCategoryRequest,
  isAdmin: boolean
): Promise<iCategoryReturn> => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const checkAvailableCategory = await categoriesRepository.findOneBy({
    name: categoryData.name,
  });
  if (checkAvailableCategory) {
    throw new AppError("Category already exists", 409);
  }
  const category = categoriesRepository.create(categoryData);
  await categoriesRepository.save(category);
  const newCategory: iCategoryReturn = categoriesReturnSchema.parse(category);
  return newCategory;
};

export default createCategoryService;
