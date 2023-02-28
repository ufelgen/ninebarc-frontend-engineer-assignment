import styled from "styled-components";
import { GiBookshelf } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import { useRouter } from "next/router";

export default function Header() {
  const { pathname } = useRouter();
  return (
    <StyledHeading>
      {pathname === "/" ? (
        <>
          <StyledBooksIcon />
          Book Quest
        </>
      ) : (
        <>
          Your Fav
          <StyledHeart />
          urite B
          <StyledHeart />
          <StyledHeart />
          ks
        </>
      )}
    </StyledHeading>
  );
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

const StyledBooksIcon = styled(GiBookshelf)`
  margin-right: 0.5rem;
`;

const StyledHeart = styled(IoIosHeart)`
  font-size: 1.5rem;
  margin-bottom: -3px;
`;
