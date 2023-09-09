"use client";

import { useState, useEffect } from "react";

import MainCard from "./components/MainCard";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "./constants";
import Spacer from "./components/Spacer";
import PokemonList from "./PokemonList";
import MainHeader from "./components/MainHeader";
import SplashScreen from "./components/SplashScreen";
import BottomNav from "./components/BottomNav";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  function handleSelectPokemon(pokemon) {
    setSelectedPokemon(pokemon);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, []);

  if (showSplashScreen) return <SplashScreen />;

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
      <BottomNav />
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
