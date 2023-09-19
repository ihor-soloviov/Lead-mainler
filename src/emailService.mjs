import nodemailer from "nodemailer";
import { errorLogger } from "../logs/errorsLogger.mjs";
import { getEmailTemplate } from "./emailTemplates.mjs";
import { emailConfig } from "./emailSettings.mjs";

class EmailService {
  constructor(emailConfig) {
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  async sendEmail(mailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      errorLogger.error(error.stack);
      console.error("Error:", error);
      throw error;
    }
  }
}

const emailService = new EmailService(emailConfig);

export const sendEmail = async () => {
  const emailTemplate = getEmailTemplate(data);

  const sendEmailPromises = recipients.map(async (recipient) => {
    const mailOptions = {
      ...emailTemplate,
      to: recipient,
    };
    return await emailService.sendEmail(mailOptions);
  });

  await Promise.all(sendEmailPromises);
};
