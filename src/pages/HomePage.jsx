import Carousel from "../components/other/Carousel";
import { CssBaseline, Container } from "@mui/material";

const carouselContent = {
  title: "Excellence in Every Workout!",
  description:
    "Connecting trainers with fitness enthusiasts for endless workout opportunities.",
  image: "https://source.unsplash.com/random?wallpapers",
};

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Carousel content={carouselContent} />
    </Container>
  );
};

export default HomePage;
