const axios = require('axios');
const {
    getEvolutionChain,
    buildTransformedData
} = require('./pokemon');

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('buildTransformedData', () => {
    it('should build the transformed data correctly', () => {
        const chainData = {
            species: {
                name: 'caterpie'
            },
            evolves_to: [{
                species: {
                    name: 'metapod'
                },
                evolves_to: [{
                    species: {
                        name: 'butterfree'
                    },
                    evolves_to: []
                }]
            }]
        };
        const expectedEvolutionChain = {
            name: 'caterpie',
            variations: [{
                name: 'metapod',
                variations: [{
                    name: 'butterfree',
                    variations: []
                }]
            }]
        };
        const evolutionChain = buildTransformedData(chainData);
        expect(evolutionChain).toEqual(expectedEvolutionChain);
    });
    it('should build single item chains correctly', () => {
        const chainData = {
            species: {
                name: 'caterpie'
            },
            evolves_to: []
        };
        const expectedEvolutionChain = {
            name: 'caterpie',
            variations: []
        };
        const evolutionChain = buildTransformedData(chainData);
        expect(evolutionChain).toEqual(expectedEvolutionChain);
    });
    it('should build multi lineages correctly', () => {
        const chainData = {
            species: {
                name: 'caterpie'
            },
            evolves_to: [{
                species: {
                    name: 'metapod'
                },
                evolves_to: [{
                    species: {
                        name: 'butterfree'
                    },
                    evolves_to: []
                }]
            },
            {
                species: {
                    name: 'anotherone'
                },
                evolves_to: [{
                    species: {
                        name: 'andanother'
                    },
                    evolves_to: []
                },
                {
                    species: {
                        name: 'andanotherone'
                    },
                    evolves_to: []
                }]
            }]
        };
        const expectedEvolutionChain = {
            name: 'caterpie',
            variations: [{
                name: 'metapod',
                variations: [{
                    name: 'butterfree',
                    variations: []
                }]
            },
            {
                name: 'anotherone',
                variations: [{
                    name: 'andanother',
                    variations: []
                },
                {
                    name: 'andanotherone',
                    variations: []
                }]
            }]
        };
        const evolutionChain = buildTransformedData(chainData);
        expect(evolutionChain).toEqual(expectedEvolutionChain);
    });
});

describe('getEvolutionChain', () => {
    it('should return the correct evolution chain for a given Pokemon', async () => {
        const pokemonName = 'caterpie';
        const pokemonResponse = {
            data: {
                species: {
                    url: 'https://pokeapi.co/api/v2/pokemon-species/10/'
                }
            }
        };
        const speciesResponse = {
            data: {
                evolution_chain: {
                    url: 'https://pokeapi.co/api/v2/evolution-chain/4/'
                }
            }
        };
        const evolutionChainResponse = {
            data: {
                chain: {
                    species: {
                        name: 'caterpie'
                    },
                    evolves_to: [{
                        species: {
                            name: 'metapod'
                        },
                        evolves_to: [{
                            species: {
                                name: 'butterfree'
                            },
                            evolves_to: []
                        }]
                    }]
                }
            }
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(pokemonResponse));
        axios.get.mockImplementationOnce(() => Promise.resolve(speciesResponse));
        axios.get.mockImplementationOnce(() => Promise.resolve(evolutionChainResponse));
        const expectedEvolutionChain = JSON.stringify({
            name: 'caterpie',
            variations: [{
                name: 'metapod',
                variations: [{
                    name: 'butterfree',
                    variations: []
                }]
            }]
        });
        const evolutionChain = await getEvolutionChain(pokemonName);
        expect(evolutionChain).toEqual(expectedEvolutionChain);
        expect(axios.get).toHaveBeenCalledTimes(3);
        expect(axios.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        expect(axios.get).toHaveBeenCalledWith(pokemonResponse.data.species.url);
        expect(axios.get).toHaveBeenCalledWith(speciesResponse.data.evolution_chain.url);
    });
    it('should return null if an error occurs', async () => {
        const pokemonName = 'caterpie';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error('API error')));
        const evolutionChain = await getEvolutionChain(pokemonName);
        expect(evolutionChain).toBeNull();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    });
});
