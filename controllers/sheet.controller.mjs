import { emailService } from "../services/email.service.mjs";

export const sendNewSheet = async (req, res) => {
  const { data } = req.body;
  try {
    console.log(data);
    emailService.sendSheetToAll(data, data.site);
    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
};
