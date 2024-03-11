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

  async pipeDriveSender(lead, personId, heirkunft) {
    const api = new pipedrive.DealsApi(this.createPipedriveClient());

    const {
      zweck,
      energieverbrauch,
      dachForm,
      dachdatum,
      verfugbare,
      adresse,
      userData,
      user_id,
    } = lead;

    const title = `ID = ${personId} / ${userData.Vorname} ${userData.Nachname} / ${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`;

    const data = {
      title,
      user_id: user_id,
      person_id: personId,
      "57cbeced6be1098f5ca5c884183644b71d29124d": zweck,
      "16c723ccd64cd776798adb6680e9b8a03adf5515": energieverbrauch,
      "09b97b8d2bd41b8d73125a7e8bd4eb73c85cdef0": dachForm,
      "cbed075975beadd5b9c2e6db78e45fbfcee5152c": verfugbare,
      "1f481fe0db105b6bd860169aa9760cd2c6fcb352": dachdatum,
      "9ffd55b37d9b787d3481a962700521c8ff99cc2f": heirkunft,
      "bb79205fc4d894114b9b4d49804f6176d659d002": `${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`,
    };

    try {
      const response = await api.addDeal(data);
      console.log(response)
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
          "Content-Type": "application/json",
          'Content-Type': 'application/json'
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
      let result;
      if (request.success) {
        const {
          id,
          user_id,
          person_id,
          bb79205fc4d894114b9b4d49804f6176d659d002_route,
          bb79205fc4d894114b9b4d49804f6176d659d002_street_number,
          bb79205fc4d894114b9b4d49804f6176d659d002_postal_code,
          bb79205fc4d894114b9b4d49804f6176d659d002_locality,
        } = request.data;

        const userData = {
          id,
          home:
            bb79205fc4d894114b9b4d49804f6176d659d002_route +
            " " +
            bb79205fc4d894114b9b4d49804f6176d659d002_street_number,
          name: person_id.name,
          tel: person_id.phone[0].value,
          email: person_id.email[0].value,
          code: bb79205fc4d894114b9b4d49804f6176d659d002_postal_code,
          city: bb79205fc4d894114b9b4d49804f6176d659d002_locality,
        };

        const sellerData = {
          name: user_id.name,
          email: user_id.email,
          tel: request.data['79feacdf9755a64ad18d02c306062801f28f52b9']
        };

        result = { userData, sellerData };

        return result

      }
    } catch (error) {
      this.logAndSendError(error);
    }
  }
}

export const pipeDriveService = new PipeDriveService()