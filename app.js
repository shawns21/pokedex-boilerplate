const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.static("public"));

const pokeBank = require('./pokeBank');

app.get("/", (req, res) => {
  const pokemonList = pokeBank.list();
  let html = 
  `<!DOCTYPE html>
      <html>
        <head>
          <title>My Pokedex</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <h1>Pokedex</h1>
        <body>
      </html>`;
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
  });
  res.send(html);
});

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokeBank.find(id);

  try {
    if (!pokemon.id) {
      throw new Error("Not Found"); 
    } else {
      let html =
      `<!DOCTYPE html>
      <html>
        <head>
          <title>My Pokedex</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <h1>${pokemon.name}</h1>
        <body>
      </html>`;

      html += `<p>Type: ${pokemon.type}</p>`;
      html += `<p>Trainer: ${pokemon.trainer}</p>`;
      html += `<p>Date: ${pokemon.date}</p>`;
      res.send(html);
    }
  }

  catch(error){
    res.status(404);
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Pokedex</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>  
      <div class="not-found">
        <p>Pika pika... Page Not Found</p>
        <img src="/error.png" />
      </div>
    </body>
    </html>`;
    res.send(html);
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
