const {getEvolutionChain} = require('./pokemon');

async function demo(pokemonName) {
  try {
    const res = await getEvolutionChain(pokemonName);
    console.log( res );
    return res;
  }
  catch(e) {
    console.error(e);
  }
}
demo(process.argv.slice(2));
