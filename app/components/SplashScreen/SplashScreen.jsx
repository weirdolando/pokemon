import styled from "styled-components";
import Image from "next/image";

import PokemonLogo from "@/app/assets/pokemon-logo.png";
import CenteredScreenWrapper from "../CenteredScreenWrapper";
import { COLORS } from "@/app/constants";

export default function SplashScreen() {
  return (
    <Wrapper>
      <Image src={PokemonLogo} width={253} height={112} alt="pokemon logo" />
    </Wrapper>
  );
}

const Wrapper = styled(CenteredScreenWrapper)`
  background-color: ${COLORS.primary[800]};
`;
