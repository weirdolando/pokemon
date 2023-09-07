import styled from "styled-components";
import { COLORS } from "@/app/constants";
import Icon from "../Icon";

export default function SearchInput({ ...delegated }) {
  return (
    <Label>
      <Input type="text" {...delegated} />
      <SearchIcon id="search" size={16} />
    </Label>
  );
}

const Label = styled.label`
  position: relative;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  background: ${COLORS.light[700]};
  border: none;
  color: ${COLORS.gray["100"]};
  border-bottom: 1px solid ${COLORS.gray["300"]};
  color: inherit;
  padding-left: 24px;
  outline-offset: 4px;

  &::placeholder {
    color: ${COLORS.gray["500"]};
  }
`;
