import styled from "styled-components";
import Lottie from "lottie-react";
import LottieNoFavs from "../public/Lottie/LottieNoFavs";

export default function NoFavourites() {
  return (
    <Section>
      <h3>oh no!</h3>
      <p>you don&apos;t have any </p>
      <p>favourite books saved yet ...</p>
      <StyledLottie animationData={LottieNoFavs} loop={true} />
    </Section>
  );
}

const Section = styled.section`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h3 {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const StyledLottie = styled(Lottie)`
  margin-top: 3rem;
`;
