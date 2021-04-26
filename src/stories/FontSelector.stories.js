import React from "react";
import FontSelector from "../components/selector";
import { storiesOf } from "@storybook/react";

storiesOf("G Fonts picker", module).add("Selector", () => (
  <FontSelector
    defaultFont="Random Font"
    selectedFont={(font) => console.log(font)}
    apiKey={process.env.GOOGLE_FONTS_KEY}
  />
));
