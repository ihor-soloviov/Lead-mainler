import { ApiClient, DealFieldsApi } from "pipedrive";
import dotenv from 'dotenv';
dotenv.config();
const defaultClient = new ApiClient();

const apiToken = process.env.PDAPI_TOKEN;

defaultClient.authentications.api_key.apiKey = apiToken;

async function addNewCustomDealField() {
  try {
    console.log("Sending request...");

    const api = new DealFieldsApi(defaultClient);

    const response = await api.addDealField({
      name: "persone_telefon",
      field_type: "varchar",
    });

    console.log("Custom field was added successfully!", response);
  } catch (err) {
    const errorToLog = err.context?.body || err;

    console.log("Adding failed", errorToLog);
  }
}
