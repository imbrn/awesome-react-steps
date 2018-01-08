import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/arrows.js");
}

configure(loadStories, module);
