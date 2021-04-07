export async function fetchFontsJSON() {
  const response = await fetch(
    "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCBbPyJ2U8SgyZkxnxJki68iwceRLa76K8"
  );
  const googleFonts = await response.json();
  return googleFonts;
}

