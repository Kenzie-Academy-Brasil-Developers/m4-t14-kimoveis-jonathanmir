import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iCategoryReturn } from "../../interfaces/categories.interfaces";
import { categoriesListSchema } from "../../schemas/categories.schemas";

const listCategoriesService = async (): Promise<iCategoryReturn[]> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const allCategories = await categoriesRepository.find();
  return allCategories;
};

export default listCategoriesService;
