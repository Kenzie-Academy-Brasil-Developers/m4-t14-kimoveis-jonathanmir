import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { realEstatesList } from "../../schemas/adresses.schemas";

const listRealStates = async () => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const realEstateQueryBuilder = await realEstateRepository
    .createQueryBuilder("RealEstate")
    .innerJoin(
      "RealEstate.address",
      "Address",
      "Address.id = RealEstate.addressId"
    )
    .select([
      "RealEstate",
      "Address.id",
      "Address.street",
      "Address.zipCode",
      "Address.city",
      "Address.state",
      "Address.number",
    ])
    .getMany();

  return realEstateQueryBuilder;
};

export default listRealStates;
