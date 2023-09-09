import styled from "styled-components";
import CenteredScreenWrapper from "../CenteredScreenWrapper";
import Image from "next/image";
import Pokeball from "@/app/assets/pokeball.webp";
import { COLORS } from "@/app/constants";

export default function ErrorDisplay({ title, message }) {
  return (
    <CenteredScreenWrapper>
      <Wrapper>
        <Image src={Pokeball} width={150} height={150} alt="pokeball" />
        <TextWrapper>
          <Title>{title}</Title>
          <Message>{message}</Message>
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
