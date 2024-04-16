import { Router } from "express";
import multer from "multer";
import CustomUploader from "../middleware/custom.uploader.mjs";
import { strapiController } from "../controllers/energy.controller.mjs";
import { emailService } from "../services/email.service.mjs";


const cvUploader = new CustomUploader('uploads/cv');
const angebotUploader = new CustomUploader('uploads/angebot');

const textMessagesUploader = multer()

const energyRouter = Router();

energyRouter.post('/cv', cvUploader.getMiddleware().single('file'), strapiController.sendCvToStrapi)

energyRouter.post('/angebot', angebotUploader.getMiddleware().single('file'), strapiController.sendAngebotToStrapi)

energyRouter.post('/contact-us', textMessagesUploader.none(), emailService.sendContactUsForm);
energyRouter.post('/phone', textMessagesUploader.none(), emailService.sendUserPhone)

energyRouter.get('/docs', strapiController.sendDocumentByNameAndDirectory)

export { energyRouter }