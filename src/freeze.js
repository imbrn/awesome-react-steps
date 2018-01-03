export function deepFreeze(obj) {
  if (obj !== undefined && typeof obj === 'object' && obj !== null) {
    Object.getOwnPropertyNames(obj).forEach(name => deepFreeze(obj[name]));
    Object.freeze(obj);
  }
}
