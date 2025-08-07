import "./src/styles/global.css";
import $ from "jquery";

window.$ = window.jQuery = $;

export const onRouteUpdate = () => {
  if (typeof window === 'undefined') return;

  const existingScript = document.querySelector('script[data-ad-provider]');
  if (existingScript) return;

  const s = document.createElement('script');
  s.dataset.adProvider = 'true';
  s.src = "//grimy-bicycle.com/bIX.VJsiddG/lS0/YTWwcy/gePm/9duPZ/UmlQk/PuTTYc1aNXzNI/x/Nqz/UitfN/jKUZ3CMajYEq3NNOgS";
  s.async = true;
  s.referrerPolicy = 'no-referrer-when-downgrade';
  document.body.appendChild(s);
};
