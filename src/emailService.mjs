import nodemailer from "nodemailer";
import { errorLogger } from "../logs/errorsLogger.mjs";
import {
  getEmailTemplate,
  getEmailTemplateSheet,
  getErrorEmailTemplate,
} from "./emailTemplates.mjs";
import { recipients } from "./emailSettings.mjs";
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

export const sendEmailToAllMails = async (data) => {
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

export const sendSheetToAllMails = async (data) => {
  const emailTemplate = getEmailTemplateSheet(data);

  const sendEmailPromises = recipients.map(async (recipient) => {
    if (
      recipient === "igor.musson.55@gmail.com" ||
      recipient === "kuznetsovmatvey.od@gmail.com"
    ) {
      const mailOptions = {
        ...emailTemplate,
        to: recipient,
      };
      return await emailService.sendEmail(mailOptions);
    }
  });

  await Promise.all(sendEmailPromises);
};

export const sendErrorEmail = async (error) => {
  const devResipients = [
    "igor.musson.55@gmail.com",
    "kuznetsovmatvey.od@gmail.com",
  ];
  const emailTemplate = getErrorEmailTemplate(error);

  const sendEmailPromises = devResipients.map(async (recipient) => {
    const mailOptions = {
      ...emailTemplate,
      to: recipient,
    };
    return await emailService.sendEmail(mailOptions);
  });

  await Promise.all(sendEmailPromises);
};
