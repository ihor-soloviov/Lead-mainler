import axios from "axios"
import { emailService } from "../services/email.service.mjs"

export const checkDataByTimer = async (url, timers) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const { extraContactData, contactData } = response.data.data.attributes;
      const { id } = response.data.data;

      if (!extraContactData) {
        emailService.sendNoDataEmail(contactData.userPhone, contactData.userName);
      } else {
        emailService.sendDataAddedEmail({ extraContactData, contactData });
      }

      timers.delete(id);
    }
  } catch (error) {
    emailService.logError(error)
  }
}