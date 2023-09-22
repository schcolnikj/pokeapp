import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from "../Card/Card"

import Loader from '../../assets/dragon.gif'
import usePokemons from '../../hooks/usePokemons'

const CardsContainer = () => { 
    const [verMas, setVerMas] = useState(true);

    const { pokemons, loader, getNextPokemons } = usePokemons();

    
    
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
        {pokemons.length !== 0 ? 
            <button onClick={getNextPokemons}>Mostrar Más Pokemones</button> 
            : ""
        }
    </div>
  )
}

export default CardsContainer