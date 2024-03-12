import express from "express";
import cors from "cors";
import { leadRouter } from "./routes/lead.routes.mjs";
import { pipeDriveRouter } from "./routes/pipeDrive.router.mjs";

const app = express();
app.use(cors());
app.use(express.json());

const port = 2302;

app.use('/leadApi', leadRouter);
app.use('/pdApi', pipeDriveRouter);

app.listen(port, () => {
  console.log(`The app is running on port ${port}.`);
});

//test

// {
//   "data": {
//       "strabe": "rewreww",
//       "hs": "2",
//       "nachname": "rqwerq",
//       "date": "22.02.11",
//       "uhrzeit": "rewrq",
//       "code": "534542",
//       "city": "Shlyuh",
//       "site": "pv"
//   }
// }

// {
//   "data": {
//       "work_hours": "rewreww",
//       "years_old": "2",
//       "salary": "rqwerq",
//       "contacts": {
//         "phone": "qwewq",
//         "name": "adssaas"
//       },
//       "site": "career"
//   }
// }
