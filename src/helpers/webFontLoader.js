import WebFont from "webfontloader";

function webFontLoader(fonts) {
  WebFont.load({
    classes: false,
    events: false,
    google: {
      families: fonts?.map((i) => i.family),
    },
  });
}

export { webFontLoader };
