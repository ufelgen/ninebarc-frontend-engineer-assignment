export default function scrollToTop() {
  const hasWindow = typeof window !== "undefined";

  hasWindow &&
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
}
