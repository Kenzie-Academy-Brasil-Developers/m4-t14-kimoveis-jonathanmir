import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iRealEstateReturn } from "../../interfaces/adresses.interfaces";
import { returnRealEstateSchema } from "../../schemas/adresses.schemas";

const createRealEstateService = async (
  realEstateData: iRealEstateReturn,
  isAdmin: boolean
) => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const addressRepository = AppDataSource.getRepository(Address);
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryFound = await categoryRepository.findOneBy({
    id: realEstateData.categoryId!,
  });
  const addressInfoRequest = realEstateData.address;

  let findAmongAddresses = await addressRepository.findOneBy({
    state: addressInfoRequest.state,
    street: addressInfoRequest.street,
    zipCode: addressInfoRequest.zipCode,
    city: addressInfoRequest.city,
  });
  if (addressInfoRequest.number) {
    findAmongAddresses = await addressRepository.findOneBy({
      state: addressInfoRequest.state,
      street: addressInfoRequest.street,
      zipCode: addressInfoRequest.zipCode,
      number: addressInfoRequest.number,
      city: addressInfoRequest.city,
    });
  }
  if (findAmongAddresses) {
    throw new AppError("Address already exists", 409);
  }
  if (categoryFound) {
    realEstateData.category = {
      name: categoryFound.name,
      id: categoryFound.id,
    };
  }
  const addressCreated = await addressRepository.save(realEstateData.address!);
  const newRealEstate = realEstateRepository.create({
    ...realEstateData,
    address: addressCreated,
    category: categoryFound,
  });
  await realEstateRepository.save(newRealEstate);
  return newRealEstate;
};

export default createRealEstateService;
