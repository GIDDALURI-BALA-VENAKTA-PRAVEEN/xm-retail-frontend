import CardApp from "./Components/Cards/CardApp";
import Carousel from "./Components/Carousel/Carousel";
import Category from "./Components/categories/Category";
import Nav from "./Components/NavBar/Nav";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <>
      <Nav />
      <Carousel />
      <Category setSelectedCategory={setSelectedCategory} />
      <CardApp selectedCategory={selectedCategory} />
    </>
  );
}

export default App;
