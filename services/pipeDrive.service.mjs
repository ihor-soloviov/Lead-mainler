import axios from "axios";
import pipedrive from "pipedrive";
import { errorLogger } from "../logs/errorsLogger.mjs";
import { emailService } from "./email.service.mjs";
import dotenv from 'dotenv';
dotenv.config();

class PipeDriveService {
  constructor() {
    this.apiToken = process.env.PDAPI_TOKEN;
    this.client = new pipedrive.ApiClient();
    this.client.authentications.api_key.apiKey = this.apiToken;
  }

  createPipedriveClient() {
    return this.client;
  }

  logAndSendError(error) {
    const errorMessage = error.context ? error.context.text : error.message;
    errorLogger.error(errorMessage);
    emailService.sendErrorEmail(errorMessage);
  }

  async pipeDriveSender(lead, personId, herkunft) {
    const api = new pipedrive.DealsApi(this.createPipedriveClient());

    const { userData, adresse, ...dealDetails } = lead;
    const title = `ID = ${personId} / ${userData.Vorname} ${userData.Nachname} / ${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`;

    const data = {
      title,
      person_id: personId,
      ...dealDetails,
      bb79205fc4d894114b9b4d49804f6176d659d002: `${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`,
    };

    try {
      const response = await api.addDeal(data);
      if (!response.success) {
        throw new Error('Failed to create deal');
      }
    } catch (error) {
      this.logAndSendError(error);
    }
  }

  async createdPersonId(JSONdata) {
    try {
      const response = await axios.post(`https://api.pipedrive.com/v1/persons?api_token=${this.apiToken}`, JSONdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data.data.id;
    } catch (error) {
      this.logAndSendError(error);
    }
  }

  async getPersons() {
    const api = new pipedrive.PersonsApi(this.createPipedriveClient());

    try {
      const result = await api.getPersons();
      return result;
    } catch (error) {
      this.logAndSendError(error);
    }
  }

  async getDeal(dealId) {
    const api = new pipedrive.DealsApi(this.createPipedriveClient());

    try {
      const request = await api.getDeal(dealId);
      if (request.success) {
        // Ваш код обробки даних угоди тут
      }
    } catch (error) {
      this.logAndSendError(error);
    }
  }
}

export const pipeDriveService = new PipeDriveService()