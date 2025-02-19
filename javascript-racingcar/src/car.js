export class Car {
  #position = 0;
  #name = '';

  constructor(name) {
    this.#name = name;
  }

  moveForward() {
    this.#position = this.#position + 1;
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }
}
