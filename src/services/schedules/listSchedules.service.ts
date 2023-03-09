import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

const listRealEstateScheduleService = async (
  realEstateId: number,
  isAdmin: boolean
) => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  const realEstateCheckExists = await realEstateRepository.findOneBy({
    id: realEstateId,
  });
  if (!realEstateCheckExists) {
    throw new AppError("RealEstate not found", 404);
  }
  const realEstateInfo = await realEstateRepository
    .createQueryBuilder("RealEstate")
    .leftJoinAndSelect("RealEstate.address", "Address")
    .leftJoinAndSelect("RealEstate.category", "Category")
    .getOne();

  const schedulesAtRealEstate = await schedulesRepository
    .createQueryBuilder("Schedules")
    .leftJoinAndSelect("Schedules.user", "User")
    .where("Schedules.realEstateId = :realEstateId", {
      realEstateId: realEstateId,
    })
    .getMany();
  const newList = {
    ...realEstateInfo,
    schedules: schedulesAtRealEstate,
  };
  return newList;
};

export default listRealEstateScheduleService;
