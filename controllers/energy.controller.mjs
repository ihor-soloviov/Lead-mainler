import { errorLogger } from "../logs/errorsLogger.mjs";
import axios from "axios";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


import { emailService } from "../services/email.service.mjs";
import { checkDataByTimer } from "../utils/timer.mjs";

import { findFile, getBasePath } from "../utils/findFile.mjs";

class StrapiController {
  timers = new Map();
  constructor() {
    this.apiUrl = process.env.STRAPI_URL;
    this.serverUrl = process.env.SERVER_URL;
  }

  sendDataToStrapi = async (endpoint, fileInputName, mailer, req, res) => {
    try {
      if (!req.file) {
        res.status(400).send('Файл не відправлено.');
      }
      const endpointUrl = `${this.apiUrl}/${endpoint}`;
      await mailer({ ...req.body, file: req.file });
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

  sendLead = async (req, res) => {
    try {
      const { contactData } = req.body;
      const parsedCalculatorData = { ...req.body, contactData: JSON.parse(contactData) }

      const strapiResponse = await axios.post(`${this.apiUrl}/calculator-energies`, {
        data: parsedCalculatorData
      })

      if (strapiResponse.status === 200) {
        await emailService.sendLeadToOffice(parsedCalculatorData);

        const leadId = strapiResponse.data.data.id;
        const timer = setTimeout(() => {
          checkDataByTimer(`${this.apiUrl}/calculator-energies/${leadId}`, this.timers);
          
        }, 2 * 60 * 1000);

        this.timers.set(leadId, timer);
      }
      console.log(strapiResponse.data)
      res.send({ status: strapiResponse.status, leadId: strapiResponse.data.data.id })
    } catch (error) {
      console.log(error)
      errorLogger.error(error.stack);
      res.status(500).send(error)
    }
  }

  sendAdditionalInfoLead = async (req, res) => {
    try {
      const { extraContactData } = req.body;
      const { leadId } = req.params;
      console.log(leadId)
      const parsedCalculatorData = { extraContactData: JSON.parse(extraContactData) }

      const strapiResponse = await axios.put(`${this.apiUrl}/calculator-energies/${leadId}`, {
        data: parsedCalculatorData
      })

      if (strapiResponse.status === 200) {
        console.log(this.timers.has(+leadId))
        if (this.timers.has(+leadId)) {
          clearTimeout(this.timers.get(+leadId));
          this.timers.delete(+leadId);
        }
        emailService.sendDataAddedEmail(strapiResponse.data.data.attributes); // відправити емейл лист, що дані внесені
      }

      res.send({ status: strapiResponse.status, leadId: strapiResponse.data.data.id })
    } catch (error) {
      console.log(error)
      errorLogger.error(error.stack);
      res.status(500).send(error)
    }
  }

  sendContactHero = async (req, res) => {
    try {
      const formData = { ...req.body }
      console.log(formData)
      const strapiResponse = await axios.post(`${this.apiUrl}/e-contact-forms`, {
        data: { ...req.body }
      })
      if (strapiResponse.status === 200) {
        await emailService.sendContactHeroMail(formData)
      }

      res.send(strapiResponse.status)
    } catch (error) {
      errorLogger.error(error.stack);
      res.status(500).send(error)
    }
  }

  sendContactUs = async (req, res) => {
    try {
      const formData = { ...req.body }
      console.log(formData)
      const strapiResponse = await axios.post(`${this.apiUrl}/contact-us-forms`, {
        data: { ...req.body }
      })
      if (strapiResponse.status === 200) {
        await emailService.sendContactUsForm(formData)
      }

      res.send(strapiResponse.status)
    } catch (error) {
      errorLogger.error(error.stack);
      res.status(500).send(error)
    }
  }

  sendCvToStrapi = (req, res) => this.sendDataToStrapi('cv-from-websites', "cv", emailService.sendCVFormByMail, req, res);

  sendAngebotToStrapi = (req, res) => this.sendDataToStrapi('angebot-from-websites', "angebot", emailService.sendAngebotFormByMail, req, res);

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
