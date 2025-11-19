// ================================
// ETAPA 3 — CACHE + VERSÃO
// ================================

// Nome da versão do cache
const CACHE_NAME = "todo-app-v1";

// Arquivos que serão salvos para funcionar offline
const FILES_TO_CACHE = [
  "/Responsive_ToDoList/index.html",
  "/Responsive_ToDoList/css/main.css",
  "/Responsive_ToDoList/css/normalize.css",
  "/Responsive_ToDoList/script.js",
  "/Responsive_ToDoList/manifest.json",
  "/Responsive_ToDoList/icons/icon-192.png",
  "/Responsive_ToDoList/icons/icon-512.png",
];

// Instalação do Service Worker → cria o cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});
// ================================
// ETAPA 4 – ATIVAR + LIMPAR CACHE ANTIGO
// ================================

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Deletando cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim(); // ativa imediatamente
});
