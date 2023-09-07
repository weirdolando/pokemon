"use client";

// Tell Next not to cache this page so we don't get stale data when reloading
// export const dynamic = "force-dynamic";

import styled from "styled-components";

import Spacer from "../components/Spacer/Spacer";
import { COLORS, WEIGHTS } from "../constants";
import MainCard from "../components/MainCard";

export default function Favorites() {
  return (
    <MainWrapper className="screen-container">
      <Spacer size={56} />
      <Heading>Favorites</Heading>
      <MainCard />
      <Spacer size={16} />
      <TotalPokemon>You have 1 favorite pokemon</TotalPokemon>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  color: ${COLORS.primary[900]};
`;

const Heading = styled.h2`
  font-weight: ${WEIGHTS.normal};
  margin-bottom: 8px;
`;

const TotalPokemon = styled.span`
  display: block;
  width: fit-content;
  margin-inline: auto;
`;
