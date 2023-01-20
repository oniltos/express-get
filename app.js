import express, { response } from "express";

const app = express();

import peopleList from "./data.json" assert { type: "json" };

const PORT = 3005;

app.get("/", (request, response, next) => {
  response.send("Olá, essa é a minha API.");
});

app.get("/people", (req, res, next) => {
  res.send(peopleList);
});

app.get("/people/search", (req, res, next) => {
  const { term, city } = req.query;

  let foundPeople = [];

  if (term) {
    foundPeople = peopleList.filter((element) => {
      return element.name.toLowerCase().includes(term.toLowerCase());
    });
  }

  if (city) {
    foundPeople = foundPeople.length > 0 ? foundPeople : peopleList;
    foundPeople = foundPeople.filter((element) => {
      return element.city.toLowerCase().includes(city.toLowerCase());
    });
  }

  if (foundPeople.length === 0) {
    res.status(404);
    return res.send("People not found.");
  }

  return res.send(foundPeople);
});

app.get("/people/:_id", (req, res, next) => {
  const { _id } = req.params;

  const foundPeople = peopleList.find((element) => {
    return element._id === _id;
  });

  if (!foundPeople) {
    res.status(404);
    res.send("People not found.");
  }

  res.send(foundPeople);
});

app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});
