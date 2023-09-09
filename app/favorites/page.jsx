"use client";

// Tell Next not to cache this page so we don't get stale data when reloading
export const dynamic = "force-dynamic";

import styled from "styled-components";

import Spacer from "../components/Spacer";
import { COLORS, WEIGHTS } from "../constants";
import MainCard from "../components/MainCard";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import ErrorDisplay from "../components/ErrorDisplay";
import BottomNav from "../components/BottomNav";

export default function Favorites() {
  const { user, userFavoritePokemon } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push("/signin");
  }, [user]);

  if (!userFavoritePokemon.length) {
    return (
      <>
        <ErrorDisplay
          title="You have no favorite pokemon"
          message="Try adding your favorite pokemon"
        />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <MainWrapper className="screen-container">
        <Spacer size={56} />
        <Heading>Favorites</Heading>
        {userFavoritePokemon.map((p) => (
          <div key={p.pokemon.key}>
            <MainCard
              pokemon={p.pokemon}
              variant="border"
              withButton
              buttonLabel="Detail"
            />
            <Spacer size={16} />
          </div>
        ))}
        <Spacer size={16} />
        <TotalPokemon>
          You have {userFavoritePokemon.length} favorite pokemon
        </TotalPokemon>
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

const TotalPokemon = styled.span`
  display: block;
  width: fit-content;
  margin-inline: auto;
`;
