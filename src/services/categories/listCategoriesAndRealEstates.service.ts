import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { categoriesListSchema } from "../../schemas/categories.schemas";

const listRealStatesFromCategoriesService = async (categoryId: number) => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const categoriesQueryBuilder = await categoriesRepository
    .createQueryBuilder("Category")
    .leftJoinAndSelect("Category.realEstate", "RealEstate")
    .where("Category.id = :categoryId", { categoryId })
    .select(["RealEstate", "RealEstate.address", "Category"])
    .getOne();
  if (!categoriesQueryBuilder) {
    throw new AppError("Category not found", 404);
  }
  return categoriesQueryBuilder;
};

export default listRealStatesFromCategoriesService;
