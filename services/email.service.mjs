import nodemailer from "nodemailer";
import { errorLogger } from "../logs/errorsLogger.mjs";
import {
  getEmailTemplateLead,
  getEmailTemplateCareer,
  getEmailTemplatePv,
  getEmailTemplateMail,
  getEmailTemplateAngebot,
  getErrorEmailTemplate,
  getEmailTemplatePhone,
} from "../utils/emailTemplates.mjs";
import { recipients, emailConfig } from "../utils/emailSettings.mjs";

class EmailService {

  // officeMail = "office@work-set.eu"
  constructor(emailConfig) {
    this.transporter = nodemailer.createTransport(emailConfig);
    this.recipients = recipients;
    this.officeMail = "igor.musson.55@gmail.com"
  }

  async sendEmail(mailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info);
      return info;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async sendEmails(recipients, emailTemplate) {
    const sendEmailPromises = recipients.map(recipient => {
      const mailOptions = { ...emailTemplate, to: recipient };
      return this.sendEmail(mailOptions);
    });
    await Promise.all(sendEmailPromises);
  }

  logError(error) {
    errorLogger.error(error.stack);
    console.error("Error:", error);
  }

  async sendEmailToAll(data) {
    await this.sendEmails(this.recipients, getEmailTemplateLead(data));
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

  sendUserEmail = async (req, res) => {
    try {
      const { data } = req.body;
      const mailTemplate = getEmailTemplateMail(data);
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const request = await this.sendEmail(mailOptions)
      if (request) {
        res.status(200).send("Emails sent successfully");
      } else {
        throw new Error('Помилка при відправці Емейлу')
      }
    } catch (error) {
      console.error(error)
    }
  }

  sendUserPhone = async (req, res) => {
    try {
      const mailTemplate = getEmailTemplatePhone({...req.body});
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const request = await this.sendEmail(mailOptions)
      if (request) {
        res.status(200).send("Phone sent successfully");
      } else {
        throw new Error('Помилка при відправці Емейлу')
      }
    } catch (error) {
      console.error(error)
    }
  }

  sendAngebotFormByMail = async (formData) => {
    try {
      console.log(formData)
      const mailTemplate = getEmailTemplateAngebot(formData);
      //gj по готовності змінити на масив пошт і відправляти через this.sendEmails
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const response = await this.sendEmail(mailOptions);
      return response
      // console.log(request)

      //обробка реквесту
    } catch (error) {
      this.logError(error)
    }
  }


}

export const emailService = new EmailService(emailConfig);