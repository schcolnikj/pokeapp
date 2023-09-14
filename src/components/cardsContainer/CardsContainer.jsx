import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from "../Card/Card"

import Loader from '../../assets/dragon.gif'

const CardsContainer = () => {
    const [pokemons, setPokemons] = useState([])
    const [loader, setLoader] = useState(false)
    const pokemonStack = []

    // const getAllPokemons = async () => {
    //     console.log(pokemons);
    //     console.log(pokemonStack);
    //     if(pokemons.length === 0){
    //         try {
    //             const response = await (await axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300")).data.results;
    //             const pokemon =  response.map((pokemon) => {return axios(pokemon.url)})
    //             return Promise.all(pokemon).then(r => {
    //                 r.forEach(p => {
    //                     pokemonStack.push({
    //                         id: p.data.id,
    //                         name: p.data.name,
    //                         hp: p.data.stats[0].base_stat,
    //                         attack: p.data.stats[1].base_stat,
    //                         defense: p.data.stats[2].base_stat,
    //                         speed: p.data.stats[5].base_stat,
    //                         height: p.data.height,
    //                         weight: p.data.weigth,
    //                         types: p.data.types.map(t => t.type.name),
    //                         image: p.data.sprites.front_default 
    //                     })
    //                 })
    //             })
    //             setPokemons(pokemonStack)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    const getAllPokemons = async () => {
        const pokemonStack = [];

        if(pokemons.length === 0){
            setLoader(true)
            const apiData = await axios('https://pokeapi.co/api/v2/pokemon/?limit=800');
            const apiNext = await axios(apiData.data.next);

            const allApi = [
                ...apiData.data.results,
                ...apiNext.data.results
            ];

            const pokemonMap = allApi.map((pokemon) => {return axios(pokemon.url)})

            return Promise.all(pokemonMap).then(r => { // por cada pokemon pusheo al arr que hice arriba solamente los elementos que necesito.
                r.forEach(p => {
                        pokemonStack.push({
                            id: p.data.id,
                            name: p.data.name,
                            hp: p.data.stats[0].base_stat,
                            attack: p.data.stats[1].base_stat,
                            defense: p.data.stats[2].base_stat,
                            speed: p.data.stats[5].base_stat,
                            height: p.data.height,
                            weight: p.data.weigth,
                            types: p.data.types.map(t => t.type.name),
                            image: p.data.sprites.front_default
                        })
                    })   
                    setPokemons(pokemonStack)
                    setLoader(false)
                return pokemons
            })
        }
    }
    

    useEffect(() => {
        getAllPokemons()
    }, [pokemons])

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
                pokemon={pokemon} id={pokemon.id} name={pokemon.name} image={pokemon.image} type={pokemon.types} hp={pokemon.hp} attack={pokemon.attack} defense={pokemon.defense} key={pokemon.id} 
            />
        )) 
        }
    </div>
  )
}

export default CardsContainer