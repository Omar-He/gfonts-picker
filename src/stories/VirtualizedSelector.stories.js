import React from "react";
import Selector from "../components/virtualizedSelector";
import { storiesOf } from "@storybook/react";

storiesOf("G Fonts picker / Virtualized selector", module).add(
  "Default",
  () => <Selector />
);
