import { Router } from "express";
import CustomMemory from "../middleware/custom.uploader.mjs";
import { strapiController } from "../controllers/energy.controller.mjs";
import { emailService } from "../services/email.service.mjs";


// const cvUploader = new CustomUploader('uploads/cv');
// const angebotUploader = new CustomUploader('uploads/angebot');
const memory = new CustomMemory()

const energyRouter = Router();

// energyRouter.post('/cv', cvUploader.getMiddleware().single('file'), strapiController.sendCvToStrapi)

// energyRouter.post('/angebot', angebotUploader.getMiddleware().single('file'), strapiController.sendAngebotToStrapi)
energyRouter.post('/angebot', memory.getMiddleware().single('file'), strapiController.sendAngebotToStrapi)

energyRouter.post('/email', emailService.sendUserEmail)

export { energyRouter }