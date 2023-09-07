"use client";

import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/app/queries";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "@/app/constants";
import Spacer from "@/app/components/Spacer";
import MainCard from "@/app/components/MainCard";
import Spinner from "@/app/components/Spinner";
import CenteredScreenWrapper from "@/app/components/CenteredScreenWrapper";
import ErrorDisplay from "@/app/components/ErrorDisplay/ErrorDisplay";
import Header from "@/app/components/Header/Header";

const ABILITIES = [
  { label: "Attack", key: "attack" },
  { label: "Defense", key: "defense" },
  { label: "Hp", key: "hp" },
  { label: "Special Attack", key: "specialattack" },
  { label: "Special Defense", key: "specialdefense" },
  { label: "Speed", key: "speed" },
];

export default function Details({ params }) {
  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { pokemon: params.name },
  });
  const pokemon = data?.getPokemon;

  if (loading) {
    return (
      <CenteredScreenWrapper>
        <Spinner />
      </CenteredScreenWrapper>
    );
  }
  if (error)
    return (
      <ErrorDisplay
        title="Oops, pokemon not found"
        message="Try using another name"
      />
    );
  return (
    <>
      <Header title={pokemon.species} />
      <MainWrapper className="screen-container">
        <Spacer size={56} />
        <MainCard pokemon={pokemon} variant="border" />
        <Spacer size={32} />
        <Heading>Abilities</Heading>
        <Spacer size={16} />
        <div>
          {ABILITIES.map((ability, idx) => (
            <AbilityWrapper key={idx}>
              <span>{ability.label}</span>
              <BarWrapper>
                <Bar
                  style={{
                    // Divide by 255 since pokemon stats range from 0 - 255
                    "--width":
                      (pokemon.baseStats[ability.key] / 255) * 100 + "%",
                  }}
                />
              </BarWrapper>
            </AbilityWrapper>
          ))}
        </div>
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
  border-bottom: 1px solid ${COLORS.light["900"]};
`;

const AbilityWrapper = styled.div`
  margin-bottom: 10px;

  @media (min-width: 430px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const BarWrapper = styled.div`
  background-color: ${COLORS.primary[900]};
  width: 200px;
  height: 14px;
`;

const Bar = styled.div`
  --width: 0%;
  background-color: ${COLORS.secondary[700]};
  height: 100%;
  width: var(--width);
`;
