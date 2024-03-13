import { Router } from "express";
import CustomUploader from "../middleware/custom.uploader.mjs";
import { sendCvToStrapi } from "../controllers/energy.controller.mjs";
import { sendAngebotToStrapi } from "../controllers/energy.controller.mjs";


const cvUploader = new CustomUploader('uploads/cv');
const angebotUploader = new CustomUploader('uploads/angebot');

const energyRouter = Router();

energyRouter.post('/cv', cvUploader.getMiddleware().single('file'), sendCvToStrapi)

energyRouter.post('/angebot', angebotUploader.getMiddleware().single('file'), sendAngebotToStrapi)

export { energyRouter }