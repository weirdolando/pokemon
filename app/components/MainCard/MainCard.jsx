"use client";

import Link from "next/link";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "@/app/constants";

import ImageWithFallback from "../ImageWithFallback";
import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import Spacer from "../Spacer/Spacer";
import { useAuthContext } from "@/app/context/AuthContext";
import deleteDocument from "@/app/firebase/firestore/deleteDocument";
import addDocument from "@/app/firebase/firestore/addDocument";
import { useRouter } from "next/navigation";

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
  const { user, userFavoritePokemon } = useAuthContext();
  const { push } = useRouter();

  const isUserFavorite = userFavoritePokemon.find(
    (p) => p.pokemon.key === pokemon.key
  );

  async function handleToggleFavorites() {
    if (!user) return push("/signin");

    if (isUserFavorite) {
      const { result, error } = await deleteDocument(
        "FAVORITES",
        isUserFavorite.docId
      );

      if (error) {
        // console.log(error.code);
        alert("Something went wrong");
      }
    } else {
      const { result, error } = await addDocument("FAVORITES", {
        user_id: user.uid,
        // I only store these 4 data since firestore would send an error if the data is too large
        pokemon: {
          key: pokemon.key,
          abilities: pokemon.abilities,
          sprite: pokemon.sprite,
          species: pokemon.species,
        },
      });
      if (error) {
        // console.log(error.code);
        alert("Something went wrong");
      }
    }
  }

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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
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
                <div key={ability.key}>
                  <p>{ability.desc}</p>
                  <Spacer size={8} />
                </div>
              );
            } else return null;
          })}
        <ButtonWrapper>
          <UnstyledButton onClick={handleToggleFavorites}>
            <Icon id={isUserFavorite ? "heart-solid" : "heart"} size={24} />
          </UnstyledButton>
          {withButton && (
            <LinkButton href={`/pokemon/${pokemon.key}`}>
              {buttonLabel}
            </LinkButton>
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const PlaceholderCenter = styled.h3`
  margin: auto;
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
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    border-top: none;
    border-left: var(--border);
    padding-left: var(--padding);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: flex-end;
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
