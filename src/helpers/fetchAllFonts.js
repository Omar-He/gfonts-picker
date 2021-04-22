export async function fetchFontsJSON(apiKey) {
  if (!apiKey) {
    apiKey = process.env.GOOGLE_FONTS_KEY;
  }
  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`
  );
  const googleFonts = await response.json();
  return googleFonts;
}
