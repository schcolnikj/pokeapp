import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const { id } = useParams()
    

    const [evolutions, setEvolutions] = useState()
    const [pokemon, setPokemon] = useState()

    const getPokemon = async () => {
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        setPokemon(response.data);
    }

    const getEvolutions = async () => {
        const response = await axios(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        setEvolutions(response.data)
    }

    useEffect(() => {
        if(!pokemon && !evolutions){
            getEvolutions()
            getPokemon()
        }
    }, [])


  return (
    <div className='w-full bg-white-yellow rounded-xl border-[2px] border-strong-red'>
        <div className='flex flex-col justify-center p-3'>
            <div className='flex flex-col justify-center items-center '>
                <img src={pokemon?.sprites.front_default} width={150} alt="image" />
                <h2 className='font-bold'>{pokemon?.name.toUpperCase()}</h2>
            </div>
            <div>
                <div className='border-[2px] border-cerulean-blue p-2 gap-2 mb-2 rounded-xl'>
                    {
                        pokemon?.stats.map((stat) => (
                            <div className='flex flex-col gap-2 py-1'>
                                <p> {stat.stat.name}: {stat.base_stat} </p>
                            </div>
                        ))
                    }
                </div>

                
                <div className='flex flex-row pt-2 gap-2 justify-center'>
                    <p>Types: </p>
                {pokemon?.types.map((type) => (

                        <p>| {type.type.name} |</p>
                
                ))}
                </div>
                    

                <div className='flex flex-row pt-2 gap-2 justify-center'>
                    <p>Abilities: </p>
                    {pokemon?.abilities.map(a => (
                    
                        <p>| {a.ability.name} |</p>
                        )
                    )}
                </div>

                <div className='m-2'>
                    
                    {evolutions?.chain.species.length > 1 ? evolutions.chain.species.length.map(specie => {
                        <p>Species: {specie.name}</p>
                    })
                    : 
                    <p>Evolutions: {evolutions?.chain.species.name}</p>
                    }

                </div>
                
            </div>
        
        </div>
    </div>
  )
}

export default Detail