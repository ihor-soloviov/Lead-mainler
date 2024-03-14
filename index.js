import express from "express";
import cors from "cors";
import { leadRouter } from "./routes/lead.routes.mjs";
import { pipeDriveRouter } from "./routes/pipeDrive.router.mjs";
import { energyRouter } from "./routes/energy.routes.mjs"

const app = express();
app.use(cors());
app.use(express.json());

const port = 2302;

app.use('/leadApi', leadRouter);
app.use('/pdApi', pipeDriveRouter);
app.use('/energyApi', energyRouter)

  app.listen(port, () => {
    console.log(`The app is running on port ${port}.`);
  });