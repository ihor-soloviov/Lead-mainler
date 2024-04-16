import { errorLogger } from "../logs/errorsLogger.mjs";
import axios from "axios";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


import { emailService } from "../services/email.service.mjs";
import { findFile, getBasePath } from "../utils/findFile.mjs";


class StrapiController {
  constructor() {
    this.apiUrl = process.env.STRAPI_URL;
    this.serverUrl = process.env.SERVER_URL;
  }

  sendDataToStrapi = async (endpoint, fileInputName, req, res) => {
    try {
      if (!req.file) {
        res.status(400).send('Файл не відправлено.');
      }
      const endpointUrl = `${this.apiUrl}/${endpoint}`;
      await emailService.sendCVFormByMail({ ...req.body, file: req.file });
      const strapiResponse = await axios.post(
        endpointUrl,
        {
          data: {
            ...req.body,
            [`${fileInputName}_url`]: `${this.serverUrl}/energyApi/docs?directory=${fileInputName}&fileName=${req.file.filename}`
          }
        }
      )

      console.log(strapiResponse)
      if (strapiResponse.status === 200) {
        res.send('Дані успішно відправлені в Strapi')
      }

    } catch (error) {
      console.error(error);
      errorLogger.error(error.stack);
      res.status(500).send(error);
    }
  }

  sendCvToStrapi = (req, res) => this.sendDataToStrapi('cv-from-websites', "cv", req, res);

  sendAngebotToStrapi = (req, res) => this.sendDataToStrapi('angebot-from-websites', "angebot", req, res);

  sendDocumentByNameAndDirectory = async (req, res) => {
    try {
      const { directory, fileName } = req.query;
      let filePath = await findFile(directory, fileName)

      if (!filePath) {
        return res.status(404).send('Файл не знайдено.');
      }

      const __dirname = getBasePath()
      filePath = path.resolve(__dirname, '..', 'uploads', filePath);
      res.setHeader('Content-Disposition', `inline; filename=${fileName}`);
      res.sendFile(filePath)

    } catch (error) {
      console.error(error);
      errorLogger.error(error.stack);
      res.status(500).send(error);
    }
  }

}

export const strapiController = new StrapiController();