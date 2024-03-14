import { errorLogger } from "../logs/errorsLogger.mjs";
import fs from 'fs';

const sendFileToStrapi = async (endpointUrl, fileInputName, req, res) => {
  try {
    console.log(endpointUrl); // Логування для перевірки ендпоінту
    if (!req.file) {
      return res.status(400).send('Файл не відправлено.');
    }

    const formData = new FormData();
    formData.append(fileInputName, fs.createReadStream(req.file.path));

    Object.keys(req.body).forEach(key => {
      formData.append(key, req.body[key]);
    });

    const response = await axios.post(endpointUrl, formData);

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    errorLogger.error(error.stack);
    res.status(500).send('Помилка сервера');
  }
}

export const sendCvToStrapi = (req, res) => sendFileToStrapi('https://api.work-set.eu/api/cv-from-website', "cv", req, res);
export const sendAngebotToStrapi = (req, res) => sendFileToStrapi('https://api.work-set.eu/api/angebot-from-website', "angebot", req, res);