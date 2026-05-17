function loadScriptFallback(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`script fallback failed: ${src}`));
    document.head.appendChild(script);
  });
}

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
  return loadScriptFallback("./market-data.js")
    .then(() => {
      if (window.MARKET_MASTER) {
        return window.MARKET_MASTER;
      }
      window.MARKET_MASTER = { counts: { nasdaq: 0, kospi: 0, kosdaq: 0 }, stocks: [] };
      return window.MARKET_MASTER;
    })
    .catch((fallbackError) => {
      console.error("Failed to load raw market data fallback", fallbackError);
      window.MARKET_MASTER = { counts: { nasdaq: 0, kospi: 0, kosdaq: 0 }, stocks: [] };
      return window.MARKET_MASTER;
    });
});
