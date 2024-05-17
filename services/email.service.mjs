import nodemailer from "nodemailer";
import { errorLogger } from "../logs/errorsLogger.mjs";
import {
  getEmailTemplateLead,
  getEmailTemplateCareer,
  getEmailTemplatePv,
  getEmailTemplateContactUs,
  getEmailTemplateAngebot,
  getErrorEmailTemplate,
  getEmailTemplateCV,
  getEmailTemplateCalculator,
  getEmailTemplateHero,
  getEmailTemplateForFeedback,
} from "../utils/emailTemplates.mjs";
import { recipients, emailConfig } from "../utils/emailSettings.mjs";

class EmailService {

  // officeMail = "office@work-set.eu"
  constructor(emailConfig) {
    this.transporter = nodemailer.createTransport(emailConfig);
    this.recipients = recipients;
    // this.officeMail = "intelekt200012@gmail.com"
    this.officeMail = "k.gawrilenko@work-set.eu"
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

  sendContactUsForm = async (formData) => {
    try {

      if (!formData.userName) {
        throw new Error('обов`язкові поля не були вказані')
      }
      if (formData.userEmail) {
        const userMailTemplate = getEmailTemplateForFeedback(formData.userName, formData.userEmail)
        const userMailOptions = { ...userMailTemplate, to: formData.userEmail }
        const request = await this.sendEmail(userMailOptions)
        if (!request) {
          throw new Error('Помилка при відправці Емейлу користувачу')
        }
      }
      const officeMailTemplate = getEmailTemplateContactUs(formData);
      const officeMailOptions = { ...officeMailTemplate, to: this.officeMail }
      const request = await this.sendEmail(officeMailOptions)
      if (!request) {
        throw new Error('Помилка при відправці Емейлу')
      }
    } catch (error) {
      console.error(error)
    }
  }

  sendContactHeroMail = async (formData) => {
    try {
      if (!formData.userName) {
        throw new Error('обов`язкові поля не були вказані')
      }
      if (formData.userEmail) {
        const userMailTemplate = getEmailTemplateForFeedback(formData.userName, formData.userEmail)
        const userMailOptions = { ...userMailTemplate, to: formData.userEmail }
        const request = await this.sendEmail(userMailOptions)
        if (!request) {
          throw new Error('Помилка при відправці Емейлу користувачу')
        }
      }
      const mailTemplate = getEmailTemplateHero(formData);
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const request = await this.sendEmail(mailOptions)
      if (!request) {
        throw new Error('Помилка при відправці Емейлу')
      }
    } catch (error) {
      console.error(error)
    }
  }

  sendAngebotFormByMail = async (formData) => {
    try {
      if (!formData.userName) {
        throw new Error('обов`язкові поля не були вказані')
      }
      if (formData.userEmail) {
        const userMailTemplate = getEmailTemplateForFeedback(formData.userName, formData.userEmail)
        const userMailOptions = { ...userMailTemplate, to: formData.userEmail }
        const request = await this.sendEmail(userMailOptions)
        if (!request) {
          throw new Error('Помилка при відправці Емейлу користувачу')
        }
      }
      const mailTemplate = getEmailTemplateAngebot(formData);
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const response = await this.sendEmail(mailOptions);
      return response.data

    } catch (error) {
      this.logError(error)
    }
  }

  sendCVFormByMail = async (formData) => {
    try {
      if (!formData.userName) {
        throw new Error('обов`язкові поля не були вказані')
      }
      if (formData.userEmail) {
        const userMailTemplate = getEmailTemplateForFeedback(formData.userName, formData.userEmail)
        const userMailOptions = { ...userMailTemplate, to: formData.userEmail }
        const request = await this.sendEmail(userMailOptions)
        if (!request) {
          throw new Error('Помилка при відправці Емейлу користувачу')
        }
      }
      const mailTemplate = getEmailTemplateCV(formData);
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const response = await this.sendEmail(mailOptions);
      return response.data
    } catch (error) {
      this.logError(error)
    }
  }

  sendCalculatorByMail = async (formData) => {
    try {
      if (!formData.contactData.userName) {
        throw new Error('обов`язкові поля не були вказані')
      }
      if (formData.contactData.userEmail) {
        const userMailTemplate = getEmailTemplateForFeedback(formData.contactData.userName, formData.contactData.userEmail)
        const userMailOptions = { ...userMailTemplate, to: formData.contactData.userEmail }
        const request = await this.sendEmail(userMailOptions)
        if (!request) {
          throw new Error('Помилка при відправці Емейлу користувачу')
        }
      }
      const mailTemplate = getEmailTemplateCalculator(formData);
      const mailOptions = { ...mailTemplate, to: this.officeMail }
      const response = await this.sendEmail(mailOptions);
      return response.data
    } catch (error) {
      this.logError(error)
    }
  }
}

export const emailService = new EmailService(emailConfig);