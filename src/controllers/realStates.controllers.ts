import { Request, Response } from "express";
import createRealEstateService from "../services/realEstates/createRealEstate.service";
import listRealStates from "../services/realEstates/listRealEstates.service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createdRealEstate = await createRealEstateService(
    req.body,
    req.user.admin
  );
  return res.status(201).json(createdRealEstate);
};

const listAllRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  req.body.value = parseInt(req.body.value);
  const realEstates = await listRealStates();
  return res.status(200).json(realEstates);
};
export { createRealEstateController, listAllRealEstatesController };
