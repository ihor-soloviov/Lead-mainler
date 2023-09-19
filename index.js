import express from "express";
import cors from "cors";

import { EmailService } from "./src/emailService.mjs";
import { emailConfig, recipients } from "./src/emailSettings.mjs";
import { getEmailTemplate } from "./src/emailTemplates.mjs";
import { pipeDriveSender } from "./src/pipeDrive.mjs";

import { errorLogger } from "./logs/errorsLogger.mjs";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const port = 2302;

const emailService = new EmailService(emailConfig);

app.post("/lead", async (req, res) => {
  const { data } = req.body;
  try {
    const emailTemplate = getEmailTemplate(data);

    const sendEmailPromises = recipients.map(async (recipient) => {
      const mailOptions = {
        ...emailTemplate,
        to: recipient,
      };
      return await emailService.sendEmail(mailOptions);
    });

    await Promise.all(sendEmailPromises);

    const JSONdata = {
      name: `${data.userData.Vorname} ${data.userData.Nachname}`,
      email: [
        {
          value: data.userData["E-Mail Adresse"],
          primary: true,
          label: "main",
        },
      ],
      phone: [
        { value: data.userData["Telefonnummer"], primary: true, label: "main" },
      ],
    };

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
    const personeId = response.data.data.id;

    await pipeDriveSender(data, personeId);

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}.`);
});
