"use client";

import Link from "next/link";
import styled from "styled-components";

import Icon from "../Icon";
import { COLORS, WEIGHTS } from "@/app/constants";
import UnstyledButton from "../UnstyledButton";
import useIsMounted from "@/app/hooks/useIsMounted";
import ImageWithFallback from "../ImageWithFallback";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import addDocument from "@/app/firebase/firestore/addDocument";
import deleteDocument from "@/app/firebase/firestore/deleteDocument";

export default function Card({ pokemon, onSelectPokemon }) {
  const { user, userFavoritePokemon } = useAuthContext();
  const { push } = useRouter();

  const isUserFavorite = userFavoritePokemon.find(
    (p) => p.pokemon.key === pokemon.key
  );

  if (!useIsMounted()) return null;

  async function handleToggleFavorites(e) {
    e.stopPropagation();

    if (!user) return push("/signin");

    if (isUserFavorite) {
      const { result, error } = await deleteDocument(
        "FAVORITES",
        isUserFavorite.docId
      );
      if (error) alert("Something went wrong");
    } else {
      const { result, error } = await addDocument("FAVORITES", {
        user_id: user.uid,
        pokemon: pokemon,
      });
      if (error) alert("Something went wrong");
    }
  }

  return (
    <Wrapper onClick={() => onSelectPokemon(pokemon)}>
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
        <UnstyledButton onClick={handleToggleFavorites}>
          <Icon id={isUserFavorite ? "heart-solid" : "heart"} size={24} />
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
