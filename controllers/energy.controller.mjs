import { errorLogger } from "../logs/errorsLogger.mjs";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();


import { emailService } from "../services/email.service.mjs";
import { convertFileToBase64 } from "../utils/convertFileToBase65.mjs";

class StrapiController {
  constructor() {
    this.apiUrl = process.env.STRAPI_URL;
    this.serverUrl = process.env.SERVER_URL;
  }

  sendFileToStrapi = async (endpoint, fileInputName, req, res) => {
    try {
      if (!req.file) {
        res.status(400).send('Файл не відправлено.');
      }
      const endpointUrl = `${this.apiUrl}/${endpoint}`;
      const mailerResponse = await emailService.sendAngebotFormByMail({ ...req.body, file: req.file });
      const strapiResponse = await axios.post(
        endpointUrl,
        {
          data: {
            ...req.body,
            [`${fileInputName}_url`]: `${this.serverUrl}?directory=${fileInputName}&fileName=${req.file.originalname}`
          }
        }
      )

      res.send({ mailerResponse, strapiResponse })


    } catch (error) {
      console.error(error);
      errorLogger.error(error.stack);
      res.status(500).send(error);
    }
  }

  sendCvToStrapi = (req, res) => this.sendFileToStrapi('cv-from-websites', "cv", req, res);

  sendAngebotToStrapi = (req, res) => this.sendFileToStrapi('angebot-from-websites', "angebot", req, res);

  sendDocumentByNameAndDirectory = (req, res) => {
    try {
      const { directory, fileName } = req.query;

      //функція в яку передали  directory, fileName
    } catch (error) {
      console.error(error);
      errorLogger.error(error.stack);
      res.status(500).send(error);
    }
  }

}

export const strapiController = new StrapiController();