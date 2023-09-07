"use client";
import { useSuspenseQuery } from "@apollo/client";
import styled from "styled-components";

import Card from "./components/Card";
import { GET_ALL_POKEMON } from "./queries";
import LoadMorePokemon from "./LoadMorePokemon";

export default function PokemonList({ handleSelectPokemon }) {
  const { data, fetchMore } = useSuspenseQuery(GET_ALL_POKEMON, {
    variables: { take: 12, offset: 0 },
  });

  const pokemon = data?.getAllPokemon;

  return (
    <CardWrapper>
      {pokemon.map((p) => (
        <Card pokemon={p} onSelectPokemon={handleSelectPokemon} key={p.key} />
      ))}
      <LoadMorePokemon
        onLoadMore={() =>
          fetchMore({
            variables: {
              offset: pokemon.length,
            },
          })
        }
      />
    </CardWrapper>
  );
}

const CardWrapper = styled.article`
  display: grid;
  gap: 24px 14px;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
