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
    const {id} = req.body;
    const result = await getDeal(id);

    res.send(result);
  } catch (error) {
    console.log(error)
  }
}
