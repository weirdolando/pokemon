import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import Spinner from "./components/Spinner";

export default function LoadMorePokemon({ onLoadMore }) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onLoadMore();
    }
  }, [inView]);

  return (
    <Wrapper ref={ref}>
      <Spinner />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  @media (min-width: 500px) {
    grid-column: span 2;
  }

  @media (min-width: 700px) {
    grid-column: span 3;
  }
`;
