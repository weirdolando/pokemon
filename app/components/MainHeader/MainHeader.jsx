import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { COLORS, WEIGHTS } from "@/app/constants";
import styled from "styled-components";
import SearchInput from "../SearchInput/SearchInput";

export default function MainHeader() {
  const { push } = useRouter();

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      push(`/pokemon/${e.target.value.toLowerCase().replace(/\s/g, "")}`);
    }
  }

  return (
    <Wrapper>
      <ContentWrapper className="screen-container">
        <SearchInput placeholder="Search Pokemon" onKeyDown={handleKeyDown} />
        <p>Lindhu Kusuma</p>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  border-bottom: 1px solid ${COLORS.light["900"]};
  font-size: 1.125rem;
  font-weight: ${WEIGHTS.medium};

  color: ${COLORS.gray["900"]};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-block: 18px;
`;
