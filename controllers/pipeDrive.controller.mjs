import { errorLogger } from "../logs/errorsLogger.mjs";
import pipedrive from "pipedrive";
import { getDeal, getPersons } from "../src/pipeDrive.mjs";

// const apiToken = "173416390b99506ea19afe60e329a0df9e858918";

export const getAllPeople = async (req, res) => {
  try {
    const request = await getPersons();
    let result;

    if (request.success) {
      const allPersons = request.data;

      result = allPersons.map((person) => {
        return {
          id: person.id,
          name: person.name,
        };
      });

      // result = allPersons
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    errorLogger.error(error.stack);
    res.status(500).send("Something went wrong");
  }
};

export const getAllDeals = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Не вказано ідентифікатор сделки");
    }
    const result = await getDeal(id);

    if (result && Object.keys(result).length > 0) {
      res.send(result);
    } else {
      res.status(404).send("Сделка не знайдена");
    }
  } catch (error) {
    res.status(500).send(`Помилка сервера: ${error.message}`);
    console.log(error);
  }
};
