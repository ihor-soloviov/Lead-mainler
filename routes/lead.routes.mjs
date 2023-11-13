import { Router } from "express";
import { sendNewLead } from "../controllers/lead.controller.mjs";
import { sendNewSheet } from "../controllers/sheet.controller.mjs";

const router = Router();

router.post("/lead", sendNewLead);
router.post("/sheet", sendNewSheet);

export { router };
