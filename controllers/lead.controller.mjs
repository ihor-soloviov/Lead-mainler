import { createJSONData } from "../utils/JSONData.mjs";
import { emailService } from "../services/email.service.mjs";
import { createdPersonId, pipeDriveSender } from "../src/pipeDrive.mjs";

export const sendNewLead = async (req, res) => {
  const { data } = req.body;
  try {
    emailService.sendEmailToAll(data);

    const JSONdata = createJSONData(data);

    const personeId = await createdPersonId(JSONdata);

    await pipeDriveSender(data, personeId, data.heirkunft);

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
};
