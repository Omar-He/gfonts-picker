import React from "react";
import FontList from "../components/list";
import { storiesOf } from "@storybook/react";

storiesOf("G Fonts picker", module).add("List", () => (
  <FontList
    selectedFont={(font) => console.log(font)}
    apiKey={process.env.GOOGLE_FONTS_KEY}
  />
));
