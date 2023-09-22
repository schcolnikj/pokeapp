import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from "../Card/Card";

import Loader from '../../assets/dragon.gif';
import usePokemons from '../../hooks/usePokemons';

const CardsContainer = () => {

    const { pokemons, loader, getNextPokemons, verMas } = usePokemons();

    
    
  return (
    <InfiniteScroll
        dataLength={pokemons.length}
        next={getNextPokemons}
        hasMore={verMas}
        loader={<img src={Loader} width={300} alt="pikachu loader" />}
        endMessage={<h3>There are no more pokemons to show!</h3>}
        className='flex flex-wrap justify-center max-w-[1800px] mt-4 items-center gap-4 '
    >
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
    </InfiniteScroll>
  )
}

export default CardsContainer