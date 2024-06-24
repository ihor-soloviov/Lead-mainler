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
  getEmailTemplateForNoData,
  getEmailTemplateForUserDetails,
} from "../utils/emailTemplates.mjs";
import { recipients, emailConfig } from "../utils/emailSettings.mjs";

class EmailService {

  // officeMail = "office@work-set.eu"
  constructor(emailConfig) {
    this.transporter = nodemailer.createTransport(emailConfig);
    this.recipients = recipients;
    this.officeMail = "k.gawrilenko@work-set.eu";
    this.managerMail = "m.kuznetsov@work-set.eu";
    this.developer2Mail = "intelekt200012@gmail.com"
    this.developerMail = "igor.musson.55@gmail.com"
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
      const userMailTemplate = getEmailTemplateForFeedback(formData.userName, formData.userEmail)
      const userMailOptions = { ...userMailTemplate, to: formData.userEmail }
      const request = await this.sendEmail(userMailOptions)
      if (!request) {
        throw new Error('Помилка при відправці Емейлу користувачу')
      }
      const officeMailTemplate = getEmailTemplateContactUs(formData);
      const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], officeMailTemplate)
      return responses
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
      const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
      return responses
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
      const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
      return responses

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
      // const mailOptions = { ...mailTemplate, to: this.officeMail }
      const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
      return responses
    } catch (error) {
      this.logError(error)
    }
  }

  sendLeadToOffice = async (formData) => {
    try {
      if (!formData.contactData.userName) {
        throw new Error('обов`язкові поля не були вказані')
      }

      const mailTemplate = getEmailTemplateCalculator(formData);
      // const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
      const responses = await this.sendEmails([this.developerMail, this.developer2Mail], mailTemplate)
      return responses
    } catch (error) {
      this.logError(error)
    }
  }

  sendAdditionalLeadInfo = async (strapiData) => {
    try {
      const { userEmail } = strapiData.attributes.extraContactData;
      const { userName } = strapiData.attributes.contactData;
      if (!userEmail) {
        throw new Error('обов`язкові поля не були вказані')
      }
      //мейл для користувача
      const userMailTemplate = getEmailTemplateForFeedback(userName)
      const userMailOptions = { ...userMailTemplate, to: userEmail }
      const request = await this.sendEmail(userMailOptions)
      if (!request) {
        throw new Error('Помилка при відправці Емейлу користувачу')
      }
      //мейл для офісу
      const mailTemplate = getEmailTemplateCalculator(formData);
      // const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
      const responses = await this.sendEmails([this.developerMail, this.developer2Mail], mailTemplate)
      return responses
    } catch (error) {
      this.logError(error)
    }
  }

  sendNoDataEmail = async (userPhone) => {
    const mailTemplate = getEmailTemplateForNoData(userPhone);
    // const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
    await this.sendEmails([this.developerMail, this.developer2Mail], mailTemplate)
  }

  sendDataAddedEmail = async (userData) => {
    const mailTemplate = getEmailTemplateForUserDetails(userData);
    // const responses = await this.sendEmails([this.officeMail, this.managerMail, this.developerMail], mailTemplate)
    await this.sendEmails([this.developerMail, this.developer2Mail], mailTemplate)
  }
}

export const emailService = new EmailService(emailConfig);