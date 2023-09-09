import styled from "styled-components";

export default function CenteredScreenWrapper({ children, ...delegated }) {
  return (
    <Wrapper className="screen-container" {...delegated}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
