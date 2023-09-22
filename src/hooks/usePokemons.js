import { useEffect, useState } from "react";
import axios from "axios";

const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'

const usePokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loader, setLoader] = useState(false);
    const [siguienteUrl, setSiguienteUrl] = useState(URL_DEFAULT);
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

  

    const getAllPokemons = async (url = URL_DEFAULT) => {
        const pokemonStack = [];
    
    
            setLoader(true);
            try {
                const apiData = await axios(url);

                const results = apiData.data.results;
                const next = apiData.data.next;

                
                const pokemonMap = await Promise.all(results.map(async (pokemon) => axios(pokemon.url)));

    
                {
    
                    const speciesDescriptionPromises = pokemonMap.map(async (response) => {
                        const speciesName = response.data.species.name;
                        const specieDescription = await getSpecieDescription(speciesName);
                        return specieDescription;
                    });

                    const speciesDescriptions = await Promise.all(speciesDescriptionPromises);
                
                   

                for (let i = 0; i < pokemonMap.length; i++) {
                    const response = pokemonMap[i];
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
                }

                setLoader(false);
                
                return { next, pokemonStack}

            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        }
        

    const getPokemons = async () => {
        const { next, pokemonStack } = await getAllPokemons();
        setPokemons(pokemonStack);
        setSiguienteUrl(next)
    }

    const getNextPokemons = async () => {
        const { next, pokemonStack } = await getAllPokemons(siguienteUrl);
        setPokemons(prev => [...prev, ...pokemonStack]);
        next === null && setVerMas(false);
        setSiguienteUrl(next);
    }
     
    useEffect(() => {   
        getPokemons();
    }, [])

    return { pokemons, getNextPokemons, verMas }
    

}

export default usePokemons;
