export async function fetchFontsJSON(apiKey) {
  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`
  );
  const googleFonts = await response.json();
  return googleFonts;
}
