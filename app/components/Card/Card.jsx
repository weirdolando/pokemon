"use client";

import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

import Icon from "../Icon";
import { COLORS, WEIGHTS } from "@/app/constants";
import UnstyledButton from "../UnstyledButton";
import useIsMounted from "@/app/hooks/useIsMounted";
import ImageWithFallback from "../ImageWithFallback";

export default function Card({ pokemon, onSelectPokemon }) {
  const wrapperRef = useRef();

  if (!useIsMounted()) return null;

  function handleWrapperClick(e) {
    /*
      Condition to avoid triggering the onSelectPokemon
      if the element who triggers the event is not this wrapper,
      since I have a Button and a Link within this wrapper
    */
    if (e.target === wrapperRef.current) {
      onSelectPokemon(pokemon);
    }
  }

  return (
    <Wrapper onClick={handleWrapperClick} ref={wrapperRef}>
      <div>
        <ImageWithFallback
          src={pokemon.sprite}
          width={100}
          height={100}
          alt={pokemon.species}
          quality={100}
        />
      </div>
      <Title>{pokemon.species}</Title>
      <ButtonGroupWrapper>
        <UnstyledButton>
          <Icon id="heart" size={24} />
        </UnstyledButton>
        <Link href={`/pokemon/${pokemon.key}`}>
          <Icon id="info" size={24} color="white" />
        </Link>
      </ButtonGroupWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  background-color: ${COLORS.primary[800]};
  border-radius: 14px;
  color: ${COLORS.light[700]};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: ${WEIGHTS.bold};
  margin: 8px 0;
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  background-color: ${COLORS.primary[600]};
  border-radius: 9999px;
  gap: 20px;
  padding: 4px 14px;
  width: max-content;
  cursor: auto;
`;
