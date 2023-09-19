export const createJSONData = (data) => {
  return {
    name: `${data.userData.Vorname} ${data.userData.Nachname}`,
    email: [
      {
        value: data.userData["E-Mail Adresse"],
        primary: true,
        label: "main",
      },
    ],
    phone: [
      { value: data.userData["Telefonnummer"], primary: true, label: "main" },
    ],
  };
};
