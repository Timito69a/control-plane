import { Brain } from '../brain/brain.js';
import { Conversation } from '../brain/conversation.js';
import { Workers } from '../modules/module-runtime.js';

const Events = {
  listeners: {},
  on(e,f){(this.listeners[e]=this.listeners[e]||[]).push(f)},
  emit(e,d){console.log("📡 EVENT:",e,d);(this.listeners[e]||[]).forEach(f=>f(d))}
};

window.ControlPlane = {
  events: Events,
  brain: Brain,
  workers: Workers,
  conversation: Conversation
};

Brain.init();

console.log("⚡ CONTROL PLANE READY");
