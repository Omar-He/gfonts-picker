import React from "react";
import FontList from "../components/list";
import { storiesOf } from "@storybook/react";

storiesOf("G Fonts picker", module).add("List", () => (
  <FontList selectedFont={(font) => console.log(font)} />
));
