import { asyncHandler } from "../middlewares/asyncHandler";
import { User } from "../models/user.model";
import envManager from "./envManager";
import { UserRolesEnum } from "./globalConst";
import { isSuperAdmin } from "./../utils/permission";
import { consoleLog } from "../loggers/console.logger";
import logger from "../loggers/winston.logger";

export const seedInitialData = asyncHandler(async () => {
  await seedSuperAdmin();

  // other seeders as per your need
});

const seedSuperAdmin = async () => {
  const isExist = await User.findOne({
    email: envManager.SUPER_ADMIN_EMAIL,
  });

  if (isExist) {
    consoleLog.info("Super Admin already exist.");
    return;
  }

  const superAdmin = await User.create({
    firstName: envManager.SUPER_ADMIN_FIRST_NAME,
    lastName: envManager.SUPER_ADMIN_LAST_NAME,
    email: envManager.SUPER_ADMIN_EMAIL,
    password: envManager.SUPER_ADMIN_PASSWORD,
    role: UserRolesEnum.SUPER_ADMIN,
  });

  logger.info("Super Admin created successfully", {
    userId: superAdmin._id,
  });
};
