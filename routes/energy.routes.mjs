import { Router } from "express";
import multer from "multer";
import CustomUploader from "../middleware/custom.uploader.mjs";
import { strapiController } from "../controllers/energy.controller.mjs";

const cvUploader = new CustomUploader('uploads/cv');
const angebotUploader = new CustomUploader('uploads/angebot');

const textMessagesUploader = multer()

const energyRouter = Router();

energyRouter.post('/cv', cvUploader.getMiddleware().single('file'), strapiController.sendCvToStrapi)
energyRouter.post('/angebot', angebotUploader.getMiddleware().single('file'), strapiController.sendAngebotToStrapi)
energyRouter.post('/leadgen', textMessagesUploader.none(), strapiController.sendLead)
energyRouter.post('/contact-us', textMessagesUploader.none(), strapiController.sendContactUs);
energyRouter.post('/contact-hero', textMessagesUploader.none(), strapiController.sendContactHero)

energyRouter.get('/docs', strapiController.sendDocumentByNameAndDirectory)

export { energyRouter }