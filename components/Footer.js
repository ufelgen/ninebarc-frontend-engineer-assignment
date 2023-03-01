import styled from "styled-components";
import Link from "next/link";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Footer() {
  const { pathname } = useRouter();

  return (
    <StyledFooter>
      <>
        <StyledLink href={"/"}>
          {pathname === "/" ? (
            <AiFillHome size="7vh" color="white" data-testid="home-filled" />
          ) : (
            <AiOutlineHome
              size="7vh"
              color="white"
              data-testid="home-outline"
            />
          )}
        </StyledLink>
        <StyledLink href={"/favourites"}>
          {pathname === "/" ? (
            <IoIosHeartEmpty
              size="7vh"
              color="white"
              data-testid="heart-outline"
            />
          ) : (
            <IoIosHeart size="7vh" color="white" data-testid="heart-filled" />
          )}
        </StyledLink>
      </>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  height: 10vh;
  width: 100%;
  background-color: var(--darkgrey);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  max-width: 800px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
