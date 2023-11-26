const axios = require('axios');

async function fetchSpeciesUrl(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await axios.get(url);
    return response.data.species.url;
}
async function fetchEvolutionChainUrl(speciesUrl) {
    const response = await axios.get(speciesUrl);
    return response.data.evolution_chain.url;
}
async function fetchEvolutionChainData(evolutionChainUrl) {
    const response = await axios.get(evolutionChainUrl);
    return response.data.chain;
}

function buildTransformedData(chainData) {
    const name = chainData.species.name;
    // Recursively build the variations
    chainData.evolves_to.length ?
        variations = chainData.evolves_to.map(variation => buildTransformedData(variation)) :
        variations = [];
    return {
        name,
        variations,
    };
}

async function getEvolutionChain(pokemonName) {
    try {
        const speciesUrl = await fetchSpeciesUrl(pokemonName);
        const evolutionChainUrl = await fetchEvolutionChainUrl(speciesUrl);
        const evolutionChainData = await fetchEvolutionChainData(evolutionChainUrl);
        const transformedData = buildTransformedData(evolutionChainData);
        return JSON.stringify(transformedData);
    } catch (error) {
        //console.error('Error:', error.message);
        return null;
    }
}

module.exports = {
   getEvolutionChain,
   buildTransformedData
}
