export class Car {
  progress = 0;
  name = '';

  constructor(name) {
    this.name = name;
  }

  moveForward() {
    this.progress = this.progress + 1;
  }

  getName() {
    return this.name;
  }

  getCount() {
    return this.progress;
  }
}
