import React from "react";
import { HeroUIProvider } from "@heroui/react";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => {
  return <HeroUIProvider>{element}</HeroUIProvider>;
};
