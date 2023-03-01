import styled from "styled-components";
import Lottie from "lottie-react";
import LottieNoResults from "../public/Lottie/LottieNoResults";

export default function NoResults() {
  return (
    <Section>
      <h3>oh no!</h3>
      <p>there are no results for your search...</p>
      <Lottie
        animationData={LottieNoResults}
        loop={true}
        height={40}
        width={60}
        style={{
          bottom: "0%",
          zIndex: -1,
          overflow: "hidden",
          position: "fixed",
        }}
      />
    </Section>
  );
}

const Section = styled.section`
  margin: 1rem;
`;
