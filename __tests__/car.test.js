import { Car } from '../src/car';

describe('Car 테스트', () => {
  it('자동차는 1칸씩 움직일 수 있다.', () => {
    const car = new Car('Test');

    car.moveForward();

    expect(car.getProgress()).toBe(1);
  });
});
