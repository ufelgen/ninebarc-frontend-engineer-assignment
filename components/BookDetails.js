import styled from "styled-components";

export default function BookDetails({ currentBook, description }) {
  return (
    <BookDetailSection>
      <p>{currentBook.author_name}</p>
      <h4>{currentBook.title}</h4>
      <p>(first published: {currentBook.first_publish_year})</p>
      <article className="description" data-testid="description">
        {!description && "no description available"}
        {description?.value ? description.value : description}
      </article>
    </BookDetailSection>
  );
}

const BookDetailSection = styled.article`
  position: fixed;
  top: 70%;
  width: 90vw;
  max-width: 700px;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);

  .description {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0.3rem;
      background-color: darkgrey;
    }
  }

  @media (max-width: 799px) {
    .description {
      font-size: 0.77rem;
      height: 15vh;
    }
  }

  @media (min-width: 800px) {
    font-size: 1.25rem;
    .description {
      font-size: 1rem;
      height: 10vh;
    }
  }
`;
