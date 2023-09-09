import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { COLORS, WEIGHTS } from "@/app/constants";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import UnstyledButton from "../UnstyledButton";
import { useAuthContext } from "@/app/context/AuthContext";
import signOut from "@/app/firebase/auth/signOut";
import Icon from "../Icon/Icon";

export default function MainHeader() {
  const { user } = useAuthContext();
  const { push } = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      push(`/pokemon/${e.target.value.toLowerCase().replace(/\s/g, "")}`);
    }
  }

  async function handleSignOut() {
    const { error, result } = await signOut();
    if (error) {
      alert("Something went wrong");
    }
  }

  return (
    <Wrapper>
      <ContentWrapper className="screen-container">
        <SearchInput placeholder="Search Pokemon" onKeyDown={handleKeyDown} />
        <MenuButton onClick={() => setShowMenu(!showMenu)}>
          <Icon id="menu" size={24} />
        </MenuButton>

        <MobileMenuWrapper style={{ "--left": showMenu ? "0" : "-100%" }}>
          <MenuItemsWrapper className="screen-container">
            {user ? (
              <>
                <UserName>👋 Hi, {user.displayName}</UserName>
                <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
              </>
            ) : (
              <>
                <SignInButton href="/signin">Sign In</SignInButton>
                <RegisterButton href="/register">Register</RegisterButton>
              </>
            )}
          </MenuItemsWrapper>
        </MobileMenuWrapper>

        <FlexWrapper>
          {user ? (
            <>
              <UserName>👋 Hi, {user.displayName}</UserName>
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
            </>
          ) : (
            <>
              <SignInButton href="/signin">Sign In</SignInButton>
              <RegisterButton href="/register">Register</RegisterButton>
            </>
          )}
        </FlexWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  border-bottom: 1px solid ${COLORS.light["900"]};
  font-size: 1.125rem;
  min-height: 65px;
  font-weight: ${WEIGHTS.medium};
  font-size: ${15 / 16}rem;
  color: ${COLORS.gray["900"]};
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 18px;
  gap: 4px;
`;

const BaseLink = styled(Link)`
  padding: 4px 8px;
  border-radius: 4px;
  text-decoration: none;
`;

const SignInButton = styled(BaseLink)`
  color: ${COLORS.primary[600]};
  background-color: ${COLORS.light[700]};
  border: 1px solid currentColor;
`;

const RegisterButton = styled(BaseLink)`
  background-color: ${COLORS.primary[600]};
  color: ${COLORS.light[700]};
`;

const SignOutButton = styled(UnstyledButton)`
  padding: 4px 8px;
  border-radius: 4px;
  color: ${COLORS.secondary[800]};
  border: 1px solid currentColor;
  text-align: center;
  position: relative;
`;

const UserName = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;

  @media (min-width: 500px) {
    max-width: 150px;
  }
`;

const FlexWrapper = styled.div`
  display: none;

  @media (min-width: 500px) {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const MenuButton = styled(UnstyledButton)`
  @media (min-width: 500px) {
    display: none;
  }
`;

const MobileMenuWrapper = styled.div`
  position: absolute;
  background-color: ${COLORS.light[700]};
  width: 100%;
  top: 65px;
  left: var(--left);
  padding-block: 20px;
  transition: all 300ms ease;
  z-index: 10;

  @media (min-width: 500px) {
    display: none;
  }
`;

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;
