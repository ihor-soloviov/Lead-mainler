export const getEmailTemplateLead = (data) => {
  const {
    zweck,
    energieverbrauch,
    dachForm,
    dachdatum,
    verfugbare,
    adresse,
    userData,
  } = data;

  return {
    from: "worksetpv@gmail.com",
    subject: "Lead",
    text: `
    zweck: ${zweck}

    energieverbrauch: ${energieverbrauch}      

    dachForm: ${dachForm}

    dachdatum: ${dachdatum}

    verfugbare: ${verfugbare}

    adresse: 
         "Ort": ${adresse["Ort"]}
         "PLZ": ${adresse["PLZ"]} 
         "Straße": ${adresse["Straße"]}        
         "Hausnummer": ${adresse["Hausnummer"]}

    userData: 
         "Vorname": ${userData["Vorname"]}     
         "Nachname": ${userData["Nachname"]} 
         "Telefonnummer": ${userData["Telefonnummer"]}
         "E-Mail Adresse": ${userData["E-Mail Adresse"]}
  `,
  };
};

export const getEmailTemplatePv = (data) => {
  const { strabe, hs, nachname, date, uhrzeit, code, city } = data;

  return {
    from: "worksetpv@gmail.com",
    subject: "PV-Förderung",
    text: `
    strabe: ${strabe}

    hs: ${hs}      

    nachname: ${nachname}

    date: ${date}

    uhrzeit: ${uhrzeit}

    code: ${code}
    
    city: ${city}

  `,
  };
};

export const getEmailTemplateCareer = (data) => {
  const { work_hours, years_old, salary, contacts } = data;

  return {
    from: "worksetpv@gmail.com",
    subject: "PV-Career",
    text: `
    work_hours: ${work_hours},

    years_old: ${years_old},

    salary: ${salary},

    contacts: 

      phone: ${contacts.phone}, name: ${contacts.name},
  `,
  };
};

export const getErrorEmailTemplate = (error) => {
  return {
    from: "worksetpv@gmail.com",
    subject: "Error",
    text: `${error}`,
  };
};

export const getEmailTemplateMail = ({ userEmail, userName, userPhone, userComment }) => ({
  from: "worksetpv@gmail.com",
  subject: "Anfrage von WorkSET Energy Website",
  html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
                
            }
            .header {
                color: #F32C40;
                margin-bottom: 20px;
            }
            .content {
                line-height: 1.6;
                color: #858C95;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>WorkSET Energy - Anfrage</h2>
        </div>
        <div class="content">
            <p>Guten Tag,</p>
            <p>Ein Nutzer der WorkSET Energy-Website hat seine E-Mail-Adresse hinterlassen, um eine Antwort zu erhalten:</p>
            <p>email: <strong>${userEmail}</strong></p>
            <p>name: <strong>${userName}</strong></p>
            <p>phone: <strong>${userPhone}</strong></p>
            <p>comment: <strong>${userComment}</strong></p>
            <p>Bitte nehmen Sie so bald wie möglich Kontakt auf, um weitere Informationen zu liefern oder Unterstützung anzubieten.</p>
        </div>
        <div class="footer">
            Mit freundlichen Grüßen,<br>
            Ihr WorkSET Energy Team
        </div>
    </body>
    </html>
  `
});

export const getEmailTemplateCV = (formData) => {
  console.log(formData);
  const { userName, userEmail, userPhone, userComment, file } = formData;
  const commentSection = userComment
    ? `<p><strong>Kommentar:</strong> ${userComment}</p>`
    : '';

  const html = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
                color: #333;
            }
            .header {
                color: #F32C40;
                margin-bottom: 20px;
            }
            .content {
                line-height: 1.6;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>Keine passende Stelle gefunden</h2>
        </div>
        <div class="content">
            <p>Sehr geehrte Damen und Herren,</p>
            <p>Leider habe ich auf Ihrer Website keine passende Stelle gefunden. Ich habe jedoch meine Kontaktdaten hinterlassen, damit Sie mich kontaktieren können, sobald eine geeignete Position verfügbar ist:</p>
            <p><strong>Vollständiger Name:</strong> ${userName}</p>
            <p><strong>E-Mail:</strong> ${userEmail}</p>
            <p><strong>Telefonnummer:</strong> ${userPhone}</p>
            ${commentSection}
            <p>Ich freue mich auf Ihre Rückmeldung und danke Ihnen im Voraus für Ihre Aufmerksamkeit.</p>
        </div>
        <div class="footer">
            Mit freundlichen Grüßen,<br>
            Ihr Team
        </div>
    </body>
    </html>
  `;

  return {
    from: "your-email@example.com",
    subject: "Keine passende Stelle gefunden - Ihre Informationen wurden hinterlassen",
    html,
    attachments: file ? [
      {
        filename: file.originalname,
        path: file.path
      },
    ] : []
  };
}

export const getEmailTemplateAngebot = (formData) => {
  console.log(formData)
  const { userName = 'qw', userEmail = 'qw', userPhone = "qweq", userComment = 'qweq', file } = formData
  const commentSection = comment
    ? `<p><strong>Kommentar:</strong> ${comment}</p>`
    : '';


  const html = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
                color: #333;
            }
            .header {
                color: #F32C40;
                margin-bottom: 20px;
            }
            .content {
                line-height: 1.6;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>Anfrage für eine kostenlose Analyse</h2>
        </div>
        <div class="content">
            <p>Sehr geehrte Damen und Herren,</p>
            <p>Ein Kunde hat eine Anfrage für eine kostenlose Analyse hinterlassen. Hier sind die Details:</p>
            <p><strong>Vollständiger Name:</strong> ${userName}</p>
            <p><strong>E-Mail:</strong> ${userEmail}</p>
            <p><strong>Telefonnummer:</strong> ${userPhone}</p>
            ${userComment}
            <p>Bitte nehmen Sie so bald wie möglich Kontakt auf, um weitere Informationen zu liefern oder Unterstützung anzubieten.</p>
        </div>
        <div class="footer">
            Mit freundlichen Grüßen,<br>
            Ihr WorkSET Energy Team
        </div>
    </body>
    </html>
  `;

  return {
    from: "worksetpv@gmail.com",
    subject: "Anfrage von WorkSET Energy Website",
    html,
    attachments: [
      {
        filename: file.originalname,
        path: file.path
      },
    ]
  };
}

export const getEmailTemplatePhone = (formData) => {
  const { userName, userPhone } = formData;

  return {
    from: "worksetpv@gmail.com",
    subject: "Anfrage von WorkSET Energy Website",
    html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
            }
            .header {
                color: #F32C40;
                margin-bottom: 20px;
            }
            .content {
                line-height: 1.6;
                color: #858C95;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>WorkSET Energy - Anfrage</h2>
        </div>
        <div class="content">
            <p>Guten Tag,</p>
            <p>Ein Nutzer der WorkSET Energy-Website hat seine Telefonnummer hinterlassen, um zurückgerufen zu werden:</p>
            <p><strong>${userPhone}-${userName}</strong></p>
            <p>Bitte nehmen Sie so bald wie möglich Kontakt auf, um weitere Informationen zu liefern oder Unterstützung anzubieten.</p>
        </div>
        <div class="footer">
            Mit freundlichen Grüßen,<br>
            Ihr WorkSET Energy Team
        </div>
    </body>
    </html>
  `
  };
}

export const getEmailTemplateContactUs = (formData) => {
  const { userName, userPhone, userEmail, userComment } = formData;

  return {
    from: "worksetpv@gmail.com",
    subject: "Anfrage für Rückruf auf der WorkSET Energy Website",
    html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
            }
            .header {
                color: #F32C40;
                margin-bottom: 20px;
            }
            .content {
                line-height: 1.6;
                color: #858C95;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>WorkSET Energy - Kontaktanfrage</h2>
        </div>
        <div class="content">
            <p>Guten Tag,</p>
            <p>Der Benutzer <strong>${userName}</strong> hat seine Kontaktinformationen für eine Rückmeldung über unsere Website hinterlassen:</p>
            <p>Telefonnummer: <strong>${userPhone}</strong></p>
            <p>E-Mail-Adresse: <strong>${userEmail}</strong></p>
            <p>Kommentar: <strong>${userComment}</strong></p>
            <p>Bitte setzen Sie sich so schnell wie möglich mit dem Benutzer in Verbindung, um weitere Informationen zu liefern oder Unterstützung anzubieten.</p>
        </div>
        <div class="footer">
            Mit freundlichen Grüßen,<br>
            Ihr WorkSET Energy Team
        </div>
    </body>
    </html>
    `
  };
}
