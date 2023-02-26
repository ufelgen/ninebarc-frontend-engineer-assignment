import styled from "styled-components";

export default function Header() {
  return <StyledHeading>Book Quest</StyledHeading>;
}

const StyledHeading = styled.header`
  background-color: var(--darkgrey);
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
