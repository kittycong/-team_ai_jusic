async function loadCompressedAppBundle() {
  const manifestResponse = await fetch("./app-compressed/manifest.json", { cache: "no-store" });
  if (!manifestResponse.ok) {
    throw new Error(`app manifest load failed: ${manifestResponse.status}`);
  }

  const manifest = await manifestResponse.json();
  const parts = await Promise.all(
    manifest.parts.map(async (fileName) => {
      const response = await fetch(`./app-compressed/${fileName}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`app chunk load failed: ${response.status} ${fileName}`);
      }
      return response.text();
    })
  );

  const binary = atob(parts.join(""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  const jsText = await new Response(stream).text();
  const script = document.createElement("script");
  script.textContent = jsText;
  document.body.appendChild(script);
}

window.__APP_BUNDLE_READY__ = loadCompressedAppBundle().catch((error) => {
  console.error("Failed to load app bundle", error);
});
