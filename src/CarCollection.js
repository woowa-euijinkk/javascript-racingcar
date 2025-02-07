import { Car } from './car.js';

export class CarCollection {
  #cars = [];

  addCar(name) {
    const car = new Car(name);
    this.#cars.push(car);
    return car;
  }

  addCars(names) {
    names.forEach((name) => this.addCar(name));
  }

  findByName(name) {
    return this.#cars.find((car) => car.getName() === name);
  }

  getStatus() {
    return this.#cars.map((car) => ({
      name: car.getName(),
      position: car.getPosition(),
    }));
  }

  moveByCondition(shouldMove) {
    this.#cars.forEach((car) => {
      if (shouldMove()) {
        car.moveForward();
      }
    });
  }

  getWinners() {
    const maxPosition = this.#getMaxPosition();
    return this.#cars.filter((car) => car.getPosition() === maxPosition);
  }

  #getMaxPosition() {
    return this.#cars.reduce(
      (max, car) => Math.max(max, car.getPosition()),
      0
    );
  }
}
