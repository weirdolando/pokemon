import Image from "next/image";
import styled from "styled-components";
import { Search, Bookmark, Info, ChevronLeft, Menu } from "react-feather";

import Pokeball from "@/app/assets/icons/pokeball.svg";
import Heart from "@/app/assets/icons/heart.svg";
import HeartSolid from "@/app/assets/icons/heart-solid.svg";

const icons = {
  menu: Menu,
  search: Search,
  info: Info,
  pokeball: Pokeball,
  bookmark: Bookmark,
  heart: Heart,
  "heart-solid": HeartSolid,
  "chevron-left": ChevronLeft,
};

export default function Icon({
  id,
  color,
  size,
  strokeWidth = 1,
  ...delegated
}) {
  const Component = icons[id];

  if (!Component) throw new Error(`Unknown id provided to Icon: ${id}`);

  return (
    <Wrapper strokeWidth={strokeWidth} size={size} {...delegated}>
      <Component color={color} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > svg {
    display: block;
    stroke-width: ${(p) => p.strokeWidth}px;
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
  }
`;
