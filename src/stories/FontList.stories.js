import React from "react";
import FontList from "../components/list";
import { storiesOf } from "@storybook/react";

storiesOf("G Fonts picker", module).add("List", () => (
  <FontList
    apiKey="AIzaSyCBbPyJ2U8SgyZkxnxJki68iwceRLa76K8"
    selectedFont={(font) => console.log(font)}
  />
));
