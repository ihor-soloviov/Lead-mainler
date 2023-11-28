import { Router } from "express";
import { sendNewLead } from "../controllers/lead.controller.mjs";
import { sendNewSheet } from "../controllers/sheet.controller.mjs";
import {
  getAllDeals,
  getAllPeople,
} from "../controllers/pipeDrive.controller.mjs";
const router = Router();

router.post("/lead", sendNewLead);
router.post("/sheet", sendNewSheet);
router.get("/people", getAllPeople);
router.get("/deals/:id", getAllDeals);

export { router };
