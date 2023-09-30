import express from "express";
import cors from "cors";

import {
  sendEmailToAllMails,
  sendSheetToAllMails,
} from "./src/emailService.mjs";
import { createJSONData } from "./src/JSONData.mjs";
import { getUserId, pipeDriveSender } from "./src/pipeDrive.mjs";
import { errorLogger } from "./logs/errorsLogger.mjs";

const app = express();
app.use(cors());
app.use(express.json());

const port = 2302;

app.post("/lead", async (req, res) => {
  const { data } = req.body;
  try {
    sendEmailToAllMails(data);

    const JSONdata = createJSONData(data);

    const personeId = await getUserId(JSONdata);

    await pipeDriveSender(data, personeId);

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
});

app.post("/sheet", async (req, res) => {
  const { data } = req.body;
  try {
    console.log(data);
    sendSheetToAllMails(data);
    res.status(200).send("Emails sent successfully");
  } catch (error) {
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}.`);
});
