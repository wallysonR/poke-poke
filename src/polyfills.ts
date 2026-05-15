import 'zone.js';  // Included with Angular CLI.
// import 'core-js/es/reflect'; <-- removido
import 'zone.js/dist/zone';  // Included with Angular CLI.

if (typeof window !== 'undefined') {
  (window as any)['global'] = window;
}