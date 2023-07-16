const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.static("public"));

const pokeBank = require('./pokeBank');

const pokemon = pokeBank.list();

app.get("/", (req, res) => res.send(
  `<!DOCTYPE html>
  <html>
    <head>
      <title>My Pokedex</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="pokemon-list">
        <header><img src="/logo.png" />Pokedex</header>
        ${pokemon
          .map(
            (pokemon) => `
        <div class="pokemon-item">
          <img class="pokemon-img" src={pokemon.image} />
          <p>
            <span class="pokemon-position">${pokemon.id}. ▲</span>${pokemon.name}
            <small>(Trained by ${pokemon.trainer})</small>
          </p>
          <small class="pokemon-info">
            Type: ${pokemon.type} | Date Caught: ${pokemon.date}
          </small>
        </div>
        `
          )
          .join("")}
      </div>
    </body>
  </html>
  `));

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const post = pokeBank.find(id);
  res.send("test");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
