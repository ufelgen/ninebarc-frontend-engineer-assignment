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
            <AiFillHome size="7vh" color="white" />
          ) : (
            <AiOutlineHome size="7vh" color="white" />
          )}
        </StyledLink>
        <StyledLink href={"/favourites"}>
          {pathname === "/" ? (
            <IoIosHeartEmpty size="7vh" color="white" />
          ) : (
            <IoIosHeart size="7vh" color="white" />
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
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
