"use client";

import Link from "next/link";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "@/app/constants";

import ImageWithFallback from "../ImageWithFallback";
import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import Spacer from "../Spacer/Spacer";

const STYLES = {
  border: {
    "--border": "2px solid currentColor",
    "--padding": "32px",
  },
};

export default function MainCard({
  pokemon = {},
  variant,
  withButton = false,
  buttonLabel = "View more",
}) {
  const style = STYLES[variant];

  if (!pokemon.species) {
    return (
      <Wrapper>
        <PlaceholderCenter>Select a Pokemon</PlaceholderCenter>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <ImageWithFallback
          key={pokemon.key}
          src={pokemon.sprite}
          fill
          objectFit="contain"
          alt={pokemon.species}
          quality={100}
        />
      </ImageWrapper>

      <ContentWrapper style={style}>
        <Title>{pokemon.species}</Title>
        {pokemon.abilities &&
          Object.values(pokemon.abilities).map((ability) => {
            if (ability && ability.desc) {
              return (
                <>
                  <p key={ability.key}>{ability.desc}</p>
                  <Spacer size={8} />
                </>
              );
            } else return null;
          })}
        <ButtonWrapper>
          <UnstyledButton>
            <Icon id="heart" size={24} />
          </UnstyledButton>
          {withButton && <LinkButton href="/detail">{buttonLabel}</LinkButton>}
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const PlaceholderCenter = styled.h3`
  margin-block: auto;
`;

const Wrapper = styled.article`
  background-color: ${COLORS.primary[900]};
  color: ${COLORS.light[800]};
  border-radius: 14px;
  min-height: 200px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 600px) {
    flex-direction: row;
    padding: 40px 50px;
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  min-height: 200px;
  flex: 1 1 30%;
`;
const ContentWrapper = styled.div`
  flex: 1 12 70%;
  border-top: var(--border);
  padding-top: var(--padding);

  @media (min-width: 600px) {
    border-top: none;
    border-left: var(--border);
    padding-left: var(--padding);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
`;

const LinkButton = styled(Link)`
  background-color: ${COLORS.secondary[[700]]};
  padding: 4px 8px;
  text-decoration: none;
  color: inherit;
  border-radius: 6px;
  transition: all 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.secondary[800]};
  }
`;

const Title = styled.h3`
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.light[700]};
  margin-bottom: 12px;
`;
