import { Router } from "express";

import {
  getAllDeals,
  getAllPeople,
} from "../controllers/pipeDrive.controller.mjs";
const pipeDriveRouter = Router();

pipeDriveRouter.get("/people", getAllPeople);
pipeDriveRouter.get("/deals/:id", getAllDeals);

export { pipeDriveRouter }