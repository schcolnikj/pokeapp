import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from "../Card/Card"

import Loader from '../../assets/dragon.gif'

const CardsContainer = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loader, setLoader] = useState(false);
    const [verMas, setVerMas] = useState(true);

    const getSpecieDescription = async (speciesName) => {
        try {
            const response = await axios(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`);
            return response.data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
        } catch (error) {
            console.error('Error fetching specie description:', error);
            return '';
        }
    };

  

    const getAllPokemons = async () => {
        const pokemonStack = [];
    
        if (pokemons.length === 0) {
            setLoader(true);
            try {
                const apiData = await axios('https://pokeapi.co/api/v2/pokemon/?limit=20');
                // const apiNext = await axios(apiData.data.next);
    
                const allApi = [
                    ...apiData.data.results,
                    // ...apiNext.data.results
                ];
    
                const pokemonMap = allApi.map((pokemon) => axios(pokemon.url));
    
                const responses = await Promise.all(pokemonMap);
    
                const speciesDescriptionPromises = responses.map(async (response) => {
                    const speciesName = response.data.species.name;
                    const specieDescription = await getSpecieDescription(speciesName);
                    return specieDescription;
                });

                const speciesDescriptions = await Promise.all(speciesDescriptionPromises);
   
                for (let i = 0; i < responses.length; i++) {
                    const response = responses[i];
                    const pokemonData = response.data;
                    const specieDescription = speciesDescriptions[i];
    
                    pokemonStack.push({
                        id: pokemonData.id,
                        name: pokemonData.name,
                        hp: pokemonData.stats[0].base_stat,
                        attack: pokemonData.stats[1].base_stat,
                        defense: pokemonData.stats[2].base_stat,
                        speed: pokemonData.stats[5].base_stat,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        types: pokemonData.types.map(t => t.type.name),
                        image: pokemonData.sprites.front_default,
                        specieDescription: specieDescription,
                    });
                }
    
                setPokemons(pokemonStack);
                setLoader(false);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        }
    };
    
    
    

    useEffect(() => {
        getAllPokemons()
        
    }, [])
    
  return (
    <div className='flex flex-wrap justify-center max-w-[1800px] mt-4 items-center gap-4 '>
        {loader === true ? 
            <div className=''>
                <img src={Loader} width={300} alt="pikachu loader" />
            </div>
            : 
            ""
        }
        { pokemons.map((pokemon) => (
            <Card 
                pokemon={pokemon} key={pokemon.id} 
            />
        )) 
        }
    </div>
  )
}

export default CardsContainer