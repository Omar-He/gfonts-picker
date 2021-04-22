import React from "react";
import FontSelector from "../components/selector";
import { storiesOf } from "@storybook/react";

storiesOf("G Fonts picker", module).add("Selector", () => (
  <FontSelector
    selectedFont={(font) => console.log(font)}
    apiKey="AIzaSyCBbPyJ2U8SgyZkxnxJki68iwceRLa76K8"
  />
));
