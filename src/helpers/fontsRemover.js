// this function delete google fonts except the fonts that currently rendered 'renderedFont'.
function removeUnnecessaryFonts(renderedFonts) {
  document.querySelectorAll('style,link[rel="stylesheet"]').forEach((item) => {
    const found = renderedFonts.find((font) => {
      const regex = new RegExp(font.family, "g");
      const fontToFind = item.href?.match(regex);
      if (fontToFind) return font.family === fontToFind[0];
      return null;
    });
    const googleFont = item.href?.match(/fonts.googleapis.com/g);
    if (!found && googleFont) item.remove();
  });
}

function removeAllFonts() {
  document.querySelectorAll('style,link[rel="stylesheet"]').forEach((item) => {
    const googleFont = item.href?.match(/fonts.googleapis.com/g);
    if (googleFont) item.remove();
  });
}

export { removeUnnecessaryFonts, removeAllFonts };
