import { errorLogger } from "../logs/errorsLogger.mjs";
import axios from "axios";
import pipedrive from "pipedrive";
import { sendErrorEmail } from "./emailService.mjs";

const apiToken = "173416390b99506ea19afe60e329a0df9e858918";

export const pipeDriveSender = async (lead, personeId, heirkunft) => {
  console.log("pipeprive starts creating a deal");
  console.log(heirkunft);
  const defaultClient = new pipedrive.ApiClient();
  defaultClient.authentications.api_key.apiKey = apiToken;

  const api = new pipedrive.DealsApi(defaultClient);

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

  const title = `ID = ${personeId} / ${userData.Vorname} ${userData.Nachname} / ${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`;

  try {
    const data = {
      title,
      user_id: user_id,
      person_id: personeId,
      "57cbeced6be1098f5ca5c884183644b71d29124d": zweck,
      "16c723ccd64cd776798adb6680e9b8a03adf5515": energieverbrauch,
      "09b97b8d2bd41b8d73125a7e8bd4eb73c85cdef0": dachForm,
      cbed075975beadd5b9c2e6db78e45fbfcee5152c: verfugbare,
      "1f481fe0db105b6bd860169aa9760cd2c6fcb352": dachdatum,
      "9ffd55b37d9b787d3481a962700521c8ff99cc2f": heirkunft,
      bb79205fc4d894114b9b4d49804f6176d659d002: `${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`,
    };
    const response = await api.addDeal(data);
    console.log(response);
    if (!response.success) {
      throw new Error();
      console.log(response);
    }
  } catch (error) {
    sendErrorEmail(error.context.text);
    errorLogger.error(error.context.text);
  }
};

export const createdPersonId = async (JSONdata) => {
  try {
    const response = await axios.post(
      "https://api.pipedrive.com/v1/persons?api_token=173416390b99506ea19afe60e329a0df9e858918",
      JSONdata,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("person_id: ", response.data.data.id);

    return response.data.data.id;
  } catch (error) {
    sendErrorEmail(error.context.text);
    errorLogger.error(error.context.text);
  }
};

export const getPersons = async () => {
  try {
    const defaultClient = new pipedrive.ApiClient();
    defaultClient.authentications.api_key.apiKey = apiToken;

    const api = new pipedrive.PersonsApi(defaultClient);

    const result = await api.getPersons();

    return result;
  } catch (error) {
    sendErrorEmail(error.context.text);
    errorLogger.error(error.context.text);
  }
};

export const getDeal = async (angebot_id) => {
  const defaultClient = new pipedrive.ApiClient();
  defaultClient.authentications.api_key.apiKey = apiToken;

  const api = new pipedrive.DealsApi(defaultClient);

  const request = await api.getDeal(angebot_id);
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
      name: person_id.name,
      email: person_id.email[0].value,
      tel: person_id.phone[0].value,
    };

    result = { userData, sellerData };
  }

  return result;
};
