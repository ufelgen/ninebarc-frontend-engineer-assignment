import styled from "styled-components";
import Image from "next/image";

export default function BackgroundImage({ currentBook }) {
  return (
    <ImageContainer>
      <StyledImage
        src={
          Array.isArray(currentBook.isbn)
            ? `https://covers.openlibrary.org/b/isbn/${currentBook.isbn[0]}-L.jpg`
            : `https://covers.openlibrary.org/b/isbn/${currentBook.isbn}-L.jpg`
        }
        fill
        alt={`cover image of ${currentBook.title}`}
      />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 160vw;
`;

const StyledImage = styled(Image)`
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: -1;
`;
