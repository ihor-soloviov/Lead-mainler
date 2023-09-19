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

export const getErrorEmailTemplate = (error) => {
  return {
    from: "worksetpv@gmail.com",
    subject: "Error",
    text: `${error}`,
  };
};
