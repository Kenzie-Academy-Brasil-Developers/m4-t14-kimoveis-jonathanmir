import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listRealStatesFromCategoriesService from "../services/categories/listCategoriesAndRealEstates.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = await createCategoryService(req.body, req.user.admin);
  return res.status(201).json(category);
};

const listCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCategories = await listCategoriesService();
  return res.status(200).json(allCategories);
};
const listRealStatesFromCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await listRealStatesFromCategoriesService(
    parseInt(req.params.id)
  );
  return res.status(200).json(data);
};
export {
  createCategoryController,
  listCategoriesController,
  listRealStatesFromCategoriesController,
};
