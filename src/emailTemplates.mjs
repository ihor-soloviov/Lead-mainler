export const getEmailTemplate = (data) => {
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

      phone: ${contacts.phone}, name: ${contacts.name },
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
