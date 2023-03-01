import styled from "styled-components";
import Link from "next/link";
import Lottie from "lottie-react";
import LottieNothingHere from "../public/Lottie/LottieNothingHere";

export default function NothingHere() {
  return (
    <Section>
      <h3>oh no!</h3>
      <p>something went wrong... </p>
      <p>we&apos;re sorry we cannot find your book</p>
      <Lottie animationData={LottieNothingHere} loop={true} />
      <StyledLink href="/" aria-label="go back to main page">
        go back to main page
      </StyledLink>
    </Section>
  );
}

const Section = styled.section`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const StyledLink = styled(Link)`
  padding: 0.5rem;
  margin: 2.5rem;
  background-color: var(--darkgrey);
  color: white;
  border-radius: 5px;
  text-decoration: none;
`;
