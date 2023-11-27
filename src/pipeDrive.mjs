import { errorLogger } from "../logs/errorsLogger.mjs";
import axios from "axios";
import pipedrive from "pipedrive";
import { sendErrorEmail } from "./emailService.mjs";

const apiToken = "173416390b99506ea19afe60e329a0df9e858918";
// const apiToken = "173416390b99506ea19afe60e329a0df9e85891";

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

export const getPersonId = async (JSONdata) => {
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
};

export const getPersons = async () => {
  const defaultClient = new pipedrive.ApiClient();
  defaultClient.authentications.api_key.apiKey = apiToken;

  const api = new pipedrive.PersonsApi(defaultClient);

  const result = await api.getPersons();

  return result;
};

export const getDeals = async () => {
  const defaultClient = new pipedrive.ApiClient();
  defaultClient.authentications.api_key.apiKey = apiToken;

  const api = new pipedrive.DealsApi(defaultClient);

  const request = await api.getDeals({ limit: 2000 });
  let result;
  if (request.success) {
    result = request.data.map((deal) => {
      const home = deal.bb79205fc4d894114b9b4d49804f6176d659d002_route + " " + deal.bb79205fc4d894114b9b4d49804f6176d659d002_street_number;
      return {
        id: deal.id,
        name: deal.person_id.name,
        email: deal.person_id.email.value,
        tel: deal.person_id.phone.value,
        code: deal.bb79205fc4d894114b9b4d49804f6176d659d002_postal_code,
        home: home,
        city: deal.bb79205fc4d894114b9b4d49804f6176d659d002_locality,
      };
    });
  }

  return result;
};
