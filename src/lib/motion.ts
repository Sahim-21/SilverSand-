/** Marks the document so CSS may hide off-screen reveals. Omit when reduced-motion. */
export const MOTION_OK_ATTR = "motion";
export const MOTION_OK_VALUE = "ok";

export const MOTION_INIT_SCRIPT = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset[${JSON.stringify(MOTION_OK_ATTR)}]=${JSON.stringify(MOTION_OK_VALUE)};}}catch(e){}})();`;
