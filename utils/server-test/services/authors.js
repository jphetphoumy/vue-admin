const Ipsum = require("bavaria-ipsum");
const randomDate = require("../utils/random-date-generator")
const { generateModel } = require('fake-data-generator')

module.exports = function (app) {

  const ipsum = new Ipsum();

  const startDate  = new Date(1970, 1, 1, 0, 0, 0, 0);
  const finishDate = new Date(1980, 1, 1, 0, 0, 0, 0);

  const formatDate = aIsoDate => {
    return aIsoDate.toISOString()
  }

  const amountArg = 40;
  const modelArg = "authors";
  const outputType = "object"
  const authors = generateModel({ amountArg, modelArg, outputType})
  const generateRandomAuthor = id => {
    return {
      id,
      name: ipsum.generateWord(),
      lastname: ipsum.generateWord(),
      birthdate: formatDate(randomDate(startDate, finishDate))
    };
  }

  app.get("/api/authors", (req, res) => {
    res.json(authors);
  });

  app.get("/api/authors/:id", (req, res) => {
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    res.json(authors[index]);
  });

  app.patch("/api/authors/:id", (req, res) => {
    const { body } = req;
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    if (index >= 0) {
      author.name = body.name;
      author.lastname = body.lastname;
      author.birthdate = body.birthdate;
      authors[index] = author;
    }

    res.json(author);
  });

  app.put("/api/authors/:id", (req, res) => {
    const { body } = req;
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    if (index >= 0) {
      author.name = body.name;
      author.lastname = body.lastname;
      author.birthdate = body.birthdate;
      authors[index] = author;
    }

    res.json(author);
  });

  app.delete("/api/authors/:id", (req, res) => {
    const author = authors.find(a => a.id.toString() === req.params.id);
    const index = authors.indexOf(author);

    if (index >= 0) authors.splice(index, 1);

    res.status(202).send();
  });

  app.post("/api/authors", (req, res) => {
    let id
    if (!authors.length) {
      id = 0
    } else {
      id = authors[authors.length - 1].id + 1;
    }
    const { body } = req;

    const author = {
      id,
      name: body.name,
      lastname: body.lastname,
      birthdate: body.birthdate
    };

    authors.push(author);

    res.status(201).send(author);
  });
}
