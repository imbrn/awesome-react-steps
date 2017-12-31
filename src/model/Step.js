import { deepFreeze } from "./utils";

class Step {
  constructor({ label, open, ready, success }) {
    this._label = label;
    this._open = open;
    this._ready = ready;
    this._success = success;
    deepFreeze(this);
  }

  set({ label, open, ready, success }) {
    return new Step({
      label: label !== undefined ? label : this._label,
      open: open !== undefined ? open : this._open,
      ready: ready !== undefined ? ready : this._ready,
      success: success !== undefined ? success : this._success
    });
  }

  setOpen(val = true) {
    return this.set({ open: val });
  }

  setClosed(val = true) {
    return this.set({ open: !val });
  }

  setReady(val = true) {
    return this.set({ ready: val });
  }

  setUnready(val = true) {
    return this.set({ ready: !val });
  }

  setSuccess(val = true) {
    return this.set({ success: val });
  }

  setFailed(val = true) {
    return this.set({ success: !val });
  }

  get label() {
    return this._label;
  }

  get open() {
    return this._open;
  }

  get closed() {
    return !this._open;
  }

  get ready() {
    return this._ready;
  }

  get unready() {
    return !this._ready;
  }

  get success() {
    return this._success;
  }

  get failed() {
    return !this._success;
  }

  toObject() {
    return {
      label: this._label,
      open: this._open,
      ready: this._ready,
      success: this._success
    };
  }

  asObject() {
    return this.toObject();
  }
}

export default Step;
