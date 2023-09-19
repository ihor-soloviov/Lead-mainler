import { errorLogger } from "../logs/errorsLogger.mjs";
import pipedrive from "pipedrive";

const apiToken = "173416390b99506ea19afe60e329a0df9e858918";
const companyDomain = "wsre";

export const pipeDriveSender = async (lead, personeId) => {
  console.log("pipeprive starts creating a deal");
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
  } = lead;

  const title = `ID = ${personeId} / ${userData.Vorname} ${userData.Nachname} / ${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`;

  try {
    const data = {
      title,
      user_id: 14671832,
      person_id: personeId,
      "57cbeced6be1098f5ca5c884183644b71d29124d": zweck,
      "16c723ccd64cd776798adb6680e9b8a03adf5515": energieverbrauch,
      "09b97b8d2bd41b8d73125a7e8bd4eb73c85cdef0": dachForm,
      cbed075975beadd5b9c2e6db78e45fbfcee5152c: verfugbare,
      "1f481fe0db105b6bd860169aa9760cd2c6fcb352": dachdatum,
      "9ffd55b37d9b787d3481a962700521c8ff99cc2f": "NK-Aktion",
      bb79205fc4d894114b9b4d49804f6176d659d002: `${adresse.Straße} ${adresse.Hausnummer}, ${adresse.PLZ}, ${adresse.Ort}, Deutschland`,
    };
    const response = await api.addDeal(data);
    console.log("Deal was added successfully!", response);
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (JSONdata) => {
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

  return response.data.data.id;
};
