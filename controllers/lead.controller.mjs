import { createJSONData } from "../utils/JSONData.mjs";
import { emailService } from "../services/email.service.mjs";
import { pipeDriveService } from "../services/pipeDrive.service.mjs";

export const sendNewLead = async (req, res) => {
  const { data } = req.body;
  try {
    await emailService.sendEmailToAll(data);

    const JSONdata = createJSONData(data);

    const personeId = await pipeDriveService.createdPersonId(JSONdata);

    await pipeDriveService.pipeDriveSender(data, personeId, data.heirkunft);

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
};
