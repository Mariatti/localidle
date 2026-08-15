/**
 * Pede ao background o módulo Presença (API).
 * O hold do index fica em presenca-boot.js (MAIN, document_start).
 */
(function () {
  try {
    chrome.runtime.sendMessage({ type: 'TIBIA_BOT_INJECT_PRESENCA' }, () => {
      void chrome.runtime.lastError;
    });
  } catch (_) {}
})();
