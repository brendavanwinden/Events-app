"use client";

import { ColorModeProvider } from "./color-mode";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          bg: { value: "#ffedd8" },
          card: { value: "#f3d5b5" },
          text: { value: "#583101" },
          accent: { value: "#d4a276" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "brand.bg",
      color: "brand.text",
    },
    "input::-webkit-calendar-picker-indicator": {
      filter: "invert(1)",
    },
  },
});

export const system = createSystem(defaultConfig, config);

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
