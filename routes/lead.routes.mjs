import { Router } from "express";
import { sendNewLead } from "../controllers/lead.controller.mjs";
import { sendNewSheet } from "../controllers/sheet.controller.mjs";

const leadRouter = Router();

leadRouter.post("/lead", sendNewLead);
leadRouter.post("/sheet", sendNewSheet);


export { leadRouter };