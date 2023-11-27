import { createJSONData } from "../src/JSONData.mjs";
import { sendEmailToAllMails } from "../src/emailService.mjs";
import { getPersonId, pipeDriveSender } from "../src/pipeDrive.mjs";

export const sendNewLead = async (req, res) => {
  const { data } = req.body;
  try {
    sendEmailToAllMails(data);

    const JSONdata = createJSONData(data);

    const personeId = await getPersonId(JSONdata);

    await pipeDriveSender(data, personeId, data.heirkunft);

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
};
