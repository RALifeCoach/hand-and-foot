export default class Debounce {
  constructor(listener, pause, atStart) {
    this.listener = listener;
    this.pause = pause;
    this.atStart = atStart;
    this.timer = 0;
  }

  debounce(event) {
    event.stopPropagation();
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.timer = 0;
      if (!this.atStart) {
        this.listener();
      }
    }, this.pause);
    if (this.atStart) {
      this.listener();
    }
  }
}