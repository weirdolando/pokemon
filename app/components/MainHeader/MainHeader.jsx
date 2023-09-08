import { useRouter } from "next/navigation";
import Link from "next/link";

import { COLORS, WEIGHTS } from "@/app/constants";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import UnstyledButton from "../UnstyledButton";
import { useAuthContext } from "@/app/context/AuthContext";
import signOut from "@/app/firebase/auth/signOut";

export default function MainHeader() {
  const { user } = useAuthContext();
  const { push } = useRouter();

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
        {user && (
          <FlexWrapper>
            <UserName>Hi, {user.displayName}</UserName>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </FlexWrapper>
        )}
        {!user && (
          <FlexWrapper>
            <SignInButton href="/signin">Sign In</SignInButton>
            <RegisterButton href="/register">Register</RegisterButton>
          </FlexWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  border-bottom: 1px solid ${COLORS.light["900"]};
  font-size: 1.125rem;
  font-weight: ${WEIGHTS.medium};
  font-size: ${15 / 16}rem;

  color: ${COLORS.gray["900"]};
`;

const UserName = styled.div`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;

  &::after {
    content: "";
    border-right: 1px solid ${COLORS.gray[500]};
    margin-left: 12px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-block: 18px;
  flex-wrap: wrap;
  gap: 14px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BaseLink = styled(Link)`
  padding: 4px 8px;
  border-radius: 4px;
  text-decoration: none;
`;

const SignInButton = styled(BaseLink)`
  color: ${COLORS.primary[600]};
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
`;
