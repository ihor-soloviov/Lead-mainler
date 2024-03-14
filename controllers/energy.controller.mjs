import { errorLogger } from "../logs/errorsLogger.mjs";
import axios from "axios";

import { emailService } from "../services/email.service.mjs";
import { convertFileToBase64 } from "../utils/convertFileToBase65.mjs";

class StrapiController {
  constructor() {
    this.apiUrl = 'https://api.work-set.eu/api';
  }

  sendFileToStrapi = async (endpoint, fileInputName, req, res) => {
    try {
      console.log(req.body)
      const endpointUrl = `${this.apiUrl}/${endpoint}`;
      if (!req.file) {
        res.status(400).send('Файл не відправлено.');
      }
      const fileBase64 = await convertFileToBase64(req.file.path)

      // const dataToSend = {
      //   data: 
      // };

      const strapiResponse = await axios.post(endpointUrl, {
        ...req.body,
        [fileInputName]: fileBase64
      });
      // const mailerResponse = await emailService.sendAngebotFormByMail({ ...req.body, file: req.file });

      console.log(strapiResponse.response.data, mailerResponse)
    } catch (error) {
      console.error(error);
      errorLogger.error(error.stack);
      res.status(500).send('Помилка сервера');
    }
  }

  sendCvToStrapi = (req, res) => this.sendFileToStrapi('cv-from-websites', "cv", req, res);

  sendAngebotToStrapi = (req, res) => this.sendFileToStrapi('angebot-from-websites', "angebot", req, res);
  // sendAngebotToStrapi = (req, res) => {
  //   try {
  //     if (!req.file) {

  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}

export const strapiController = new StrapiController();