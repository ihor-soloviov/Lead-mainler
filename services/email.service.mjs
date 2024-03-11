import nodemailer from "nodemailer";
import { errorLogger } from "../logs/errorsLogger.mjs";
import {
  getEmailTemplate,
  getEmailTemplateCareer,
  getEmailTemplatePv,
  getErrorEmailTemplate,
} from "../utils/emailTemplates.mjs";
import { recipients, emailConfig } from "../src/emailSettings.mjs";

class EmailService {
  constructor(emailConfig) {
    this.transporter = nodemailer.createTransport(emailConfig);
    this.recipients = recipients;
  }

  async sendEmail(mailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  logError(error) {
    errorLogger.error(error.stack);
    console.error("Error:", error);
  }

  async sendEmailToAll(data) {
    await this.sendEmails(this.recipients, getEmailTemplate(data));
  }

  async sendSheetToAll(data, site) {
    const mails = ["igor.musson.55@gmail.com", "kuznetsovmatvey.od@gmail.com"];
    const emailTemplateFunc = {
      pv: getEmailTemplatePv,
      career: getEmailTemplateCareer,
    }[site];
    if (emailTemplateFunc) {
      await this.sendEmails(mails, emailTemplateFunc(data));
    }
  }

  async sendErrorEmail(error) {
    const devRecipients = ["igor.musson.55@gmail.com", "kuznetsovmatvey.od@gmail.com"];
    await this.sendEmails(devRecipients, getErrorEmailTemplate(error));
  }

  async sendEmails(recipients, emailTemplate) {
    const sendEmailPromises = recipients.map(recipient => {
      const mailOptions = { ...emailTemplate, to: recipient };
      return this.sendEmail(mailOptions);
    });
    await Promise.all(sendEmailPromises);
  }
}

export const emailService = new EmailService(emailConfig);