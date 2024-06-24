import axios from "axios"
import { emailService } from "../services/email.service.mjs"

export const checkDataByTimer = async (url, timers) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const { extraContactData, id, contactData } = response.data.data.attributes;

      if (!extraContactData) {
        emailService.sendNoDataEmail(contactData.userPhone);
      } else {
        emailService.sendDataAddedEmail({ ...extraContactData, ...contactData });
      }

      timers.delete(id);
    }
  } catch (error) {
    emailService.logError(error)
  }
}