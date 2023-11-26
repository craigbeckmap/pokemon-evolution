# README

## Project Description

This project is a simple Node.js application that uses the Poke API to find the
evolution chain and variations of a given Pokemon.
This implementation uses the Axios library to make HTTP requests to
the Poke API. It retrieves the evolution chain and variations for a given
Pokemon name and outputs the result as a JSON string.
Please note that this is a simplified example and may require additional error
handling and validation in a production-ready application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm. If not, you can download and install from here https://nodejs.org/en/.  

For troubleshooting, we used Node version 20.10.0 and npm version 10.2.4, but downloading the latest stable version of Node.js should work fine.

## Installing and Running the Project

To install and run the project, follow these steps from command line:

1. Clone the repository:

```console
git clone https://github.com/craigbeckmap/pokemon-evolution.git
```

2. Navigate to the project directory:

```console
cd pokemon-evolution
```

3. Install the dependencies:

```console
npm install
```

4. Run the script:

```console
node index.js 'pokemonName'
```
Replace 'pokemonName' with the name of the Pokemon you want to find the evolution chain.
For example, if you want to get the evolution chain for the Pokemon named 'Caterpie':

```console
node index.js 'caterpie'
```
As an altertnative, you can call the getEvolutionChain function directly with run-func, for example:

```console
npx run-func pokemon.js getEvolutionChain "caterpie"
```

## Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```console
npm test
```
