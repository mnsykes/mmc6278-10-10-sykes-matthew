const axios = require('axios')
const {
  getFeetAndInches,
  getPounds
} = require('./convertUnits')

async function getPokemon(pokemonName) {
    const {
      data: {
        name,
        sprites: {
          other: {
            'official-artwork': {
              front_default: sprite
            }
          }
        },
        types,
        height,
        weight
      }
    } = await axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokemonName) 
  return ({
    name,
    sprite,
    types: types.map(type => type.type.name),
    height: getFeetAndInches(height),
    weight: getPounds(weight)
  })
}

module.exports = { getPokemon }
