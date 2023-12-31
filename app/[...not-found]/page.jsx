"use client";

import styled from "styled-components";
import Image from "next/image";
import Pokeball from "@/app/assets/pokeball.webp";
import { COLORS } from "@/app/constants";
import CenteredScreenWrapper from "@/app/components/CenteredScreenWrapper";

/*
  This is a not-found page that usually should be in the app/not-found.jsx file.
  I use this way to solve the keep refreshing issue:
  https://github.com/vercel/next.js/discussions/50429
*/

export default function NotFound() {
  return (
    <CenteredScreenWrapper>
      <Wrapper>
        <Image src={Pokeball} width={150} height={150} alt="pokeball" />
        <TextWrapper>
          <Title>Seems like you've hit a brick wall</Title>
          <Message>The page you're looking for doesn't exist</Message>
        </TextWrapper>
      </Wrapper>
    </CenteredScreenWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 500px) {
    gap: 20px;
    flex-direction: row;
  }
`;

const Title = styled.h1`
  color: ${COLORS.primary[800]};
`;

const Message = styled.p`
  color: ${COLORS.gray[700]};
`;

const TextWrapper = styled.div`
  text-align: center;
  @media (min-width: 500px) {
    text-align: left;
    border-left: 1px solid ${COLORS.gray[500]};
    padding-left: 20px;
  }
`;
