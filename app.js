const express = require('express')
const app = express()
const pokeUtil = require('./util/pokemon')

app.use(express.urlencoded({extended: true}))

const style = `<style>
  *:not(input) {
    text-transform: capitalize;
    text-align: center;
  } 
</style>` 

app.get('/', (req, res) => {
  res
    .set('content-type', 'text/html')
    .send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Find pokemon</title>
        ${style}
      </head>
      <body>
        <h1>Find Pokemon</h1>
        <form action="/pokemon">
          <label for="pokemon-name">Name: </label>
          <input autofocus type="text" id="pokemone-name" name="name">
          <button>Submit</button>
        </form>
      </body>
      </html>
    `)
})

app.get('/pokemon', async (req, res) => {
  try {
    if (!req.query.name)
      return res.redirect('/')
    const {
      name,
      types,
      sprite,
      height,
      weight
    } = await pokeUtil.getPokemon(req.query.name)
    res
      .set('content-type', 'text/html')
      .send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Info for ${name}</title>
          ${style}
        </head>
        <body>
          <h1 data-test-id="pokemon-name">${name}</h1>
          <img src="${sprite}" alt="${name}">
          <p data-test-id="types">Types: ${types.join(", ")}</p>
          <p data-test-id="height">Height: ${height} </p>
          <p data-test-id="weight">Weight: ${weight}</p>
          <a href="/">New Search</a>
        </body>
        </html>
      `)
  } catch(err) {
    res
      .set('content-type', 'text/html')
      .send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Not Found</title>
          ${style}
        </head>
        <body>
          <h1>Pokemon Not Found</h1>
          <a href="/">Return</a>
        </body>
        </html>
      `)
  }
})

module.exports = app
