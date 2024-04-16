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

export const getEmailTemplateMail = (userEmail) => ({
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
            <p><strong>${userEmail}</strong></p>
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

export const getEmailTemplateAngebot = (formData) => {
  console.log(formData)
  const { fullname = 'qw', email= 'qw', phoneNumber="qweq", comment= 'qweq', file } = formData
  const commentSection = comment
    ? `<p><strong>Kommentar:</strong> ${comment}</p>`
    : '';

    // const filePath = file.path.replace(/\\/g, '/');
    // console.log(filePath)

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
            <p><strong>Vollständiger Name:</strong> ${fullname}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Telefonnummer:</strong> ${phoneNumber}</p>
            ${commentSection}
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

export const getEmailTemplatePhone = (userPhone) => ({
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
            <p><strong>${userPhone}</strong></p>
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

