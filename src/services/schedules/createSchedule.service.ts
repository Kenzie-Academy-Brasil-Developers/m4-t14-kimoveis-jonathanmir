import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iScheduleRequest } from "../../interfaces/schedules.interfaces";

const createScheduleService = async (
  scheduleData: iScheduleRequest,
  userId: number
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const realEstatesRepository = AppDataSource.getRepository(RealEstate);
  const userRepository = AppDataSource.getRepository(User);
  const userFound = await userRepository.findOneBy({
    id: userId,
  });
  const realEstateFound = await realEstatesRepository.findOneBy({
    id: scheduleData.realEstateId,
  });
  if (!realEstateFound) {
    throw new AppError("RealEstate not found", 404);
  }
  const submittedDate = new Date(scheduleData.date);
  const [hours, minutes] = scheduleData.hour.split(":");
  submittedDate.setHours(parseInt(hours));
  submittedDate.setMinutes(parseInt(minutes));
  const checkDay = submittedDate.getDay();
  const checkTime = submittedDate.getHours();

  if (checkTime < 8 || checkTime > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }
  if (checkDay === 0 || checkDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  const checkUserScheduleAvailable = await schedulesRepository
    .createQueryBuilder("Schedule")
    .leftJoinAndSelect("Schedule.realEstate", "RealEstate")
    .leftJoinAndSelect("Schedule.user", "User")
    .where("Schedule.date = :date", { date: scheduleData.date })
    .andWhere("Schedule.hour = :hour", { hour: scheduleData.hour })
    .andWhere("Schedule.userId = :userId", { userId: userId })
    .getMany();

  if (checkUserScheduleAvailable.length > 0) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const checkRealEstateScheduleAvailable = await schedulesRepository
    .createQueryBuilder("Schedule")
    .leftJoinAndSelect("Schedule.realEstate", "RealEstate")
    .where("Schedule.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .andWhere("Schedule.date = :date", { date: scheduleData.date })
    .andWhere("Schedule.hour = :hour", { hour: scheduleData.hour })
    .getMany();
  if (checkRealEstateScheduleAvailable.length > 0) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedules = await schedulesRepository.find();
  const newSchedule = schedulesRepository.create({
    ...scheduleData,
    realEstate: realEstateFound!,
    user: userFound!,
  });

  await schedulesRepository.save(newSchedule);
  return newSchedule;
};

export default createScheduleService;
