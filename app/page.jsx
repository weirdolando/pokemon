"use client";

import { useState } from "react";

import MainCard from "./components/MainCard";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "./constants";
import Spacer from "./components/Spacer";
import PokemonList from "./PokemonList";
import MainHeader from "./components/MainHeader";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState({});

  function handleSelectPokemon(pokemon) {
    setSelectedPokemon(pokemon);
  }

  return (
    <>
      <MainHeader />
      <MainWrapper className="screen-container">
        <Spacer size={56} />
        <Heading>Selected</Heading>
        <MainCard pokemon={selectedPokemon} withButton />
        <Spacer size={16} />
        <Heading>Pokemons</Heading>
        <PokemonList handleSelectPokemon={handleSelectPokemon} />
        <Spacer size={102} />
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.main`
  color: ${COLORS.primary[900]};
`;

const Heading = styled.h2`
  font-weight: ${WEIGHTS.normal};
  margin-bottom: 8px;
`;
