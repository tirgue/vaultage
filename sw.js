if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(n[a])return;let o={};const l=e=>i(e,a),t={module:{uri:a},exports:o,require:l};n[a]=Promise.all(s.map((e=>t[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"3293f647dab9465fa03074fc6e003ccf"},{url:"apple-touch-icon-180x180.png",revision:"2b4b55eb82055ab1a90c15a94e50bab5"},{url:"assets/main-C_PwXyaO.css",revision:null},{url:"assets/main-Dj7UfujG.js",revision:null},{url:"assets/UbuntuSansMono-Bold-h09i9lTj.ttf",revision:null},{url:"assets/UbuntuSansMono-BoldItalic-CVUMqevn.ttf",revision:null},{url:"assets/UbuntuSansMono-Italic-Cnpw_he0.ttf",revision:null},{url:"assets/UbuntuSansMono-Regular-DIirNQPl.ttf",revision:null},{url:"assets/UbuntuSansMono-SemiBold-NrWz23-D.ttf",revision:null},{url:"favicon.ico",revision:"825cf53f8b236676e442a320afdfa03f"},{url:"index.html",revision:"a4b75a02f785caf600c4406f39cc3d7e"},{url:"maskable-icon-512x512.png",revision:"a658d5ee52c39382a103fd10f456e448"},{url:"pwa-192x192.png",revision:"4ce97e8774e7dfae0e11d0903c673813"},{url:"pwa-512x512.png",revision:"e4472b18109024ca553d45ee79098765"},{url:"pwa-64x64.png",revision:"c0d50eaa8ef880754cf9202247c6479b"},{url:"registerSW.js",revision:"a38799fec636272dcc1b0acacff5d5b6"},{url:"pwa-64x64.png",revision:"c0d50eaa8ef880754cf9202247c6479b"},{url:"pwa-192x192.png",revision:"4ce97e8774e7dfae0e11d0903c673813"},{url:"pwa-512x512.png",revision:"e4472b18109024ca553d45ee79098765"},{url:"maskable-icon-512x512.png",revision:"a658d5ee52c39382a103fd10f456e448"},{url:"manifest.webmanifest",revision:"328580a2e7ea34f562742a7b2d728af5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
