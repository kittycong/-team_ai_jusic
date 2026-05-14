async function loadCompressedMarketData() {
  const manifestResponse = await fetch("./market-data-compressed/manifest.json", { cache: "no-store" });
  if (!manifestResponse.ok) {
    throw new Error(`market-data manifest load failed: ${manifestResponse.status}`);
  }

  const manifest = await manifestResponse.json();
  const parts = await Promise.all(
    manifest.parts.map(async (fileName) => {
      const response = await fetch(`./market-data-compressed/${fileName}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`market-data chunk load failed: ${response.status} ${fileName}`);
      }
      return response.text();
    })
  );

  const binary = atob(parts.join(""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  const jsonText = await new Response(stream).text();
  window.MARKET_MASTER = JSON.parse(jsonText);
  return window.MARKET_MASTER;
}

window.__MARKET_DATA_READY__ = loadCompressedMarketData().catch((error) => {
  console.error("Failed to load market data", error);
  window.MARKET_MASTER = { counts: { nasdaq: 0, kosdaq: 0 }, stocks: [] };
  return window.MARKET_MASTER;
});
