import { COLORS, WEIGHTS } from "@/app/constants";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import Link from "next/link";

export default function Header({ title }) {
  return (
    <Wrapper>
      <NavWrapper className="screen-container">
        <IconLink href="/">
          <Icon id="chevron-left" size={24} strokeWidth={2} />
        </IconLink>
        <Title>{title}</Title>
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${COLORS.light[900]};
  color: ${COLORS.primary[900]};
`;

const IconLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 64px;
`;

const Title = styled.h1`
  font-size: ${22 / 16}rem;
  font-weight: ${WEIGHTS.normal};
`;
