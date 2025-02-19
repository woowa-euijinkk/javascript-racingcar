import { CarCollection } from '../src/CarCollection.js';

describe('CarCollection', () => {
  let carCollection;

  beforeEach(() => {
    carCollection = new CarCollection();
  });

  describe('자동차 관리', () => {
    it('단일 자동차를 추가할 수 있다', () => {
      const name = 'car1';
      const car = carCollection.addCar(name);

      expect(car.getName()).toBe(name);
      expect(carCollection.findByName(name)).toBe(car);
    });

    it('여러 자동차를 한번에 추가할 수 있다', () => {
      const names = ['car1', 'car2', 'car3'];
      carCollection.addCars(names);

      names.forEach((name) => {
        expect(carCollection.findByName(name)).not.toBeNull();
      });
    });
  });

  describe('자동차 이동', () => {
    it('조건에 따라 자동차가 이동한다', () => {
      const car = carCollection.addCar('car1');
      const initialPosition = car.getPosition();

      carCollection.moveByCondition(() => true);
      expect(car.getPosition()).toBe(initialPosition + 1);

      carCollection.moveByCondition(() => false);
      expect(car.getPosition()).toBe(initialPosition + 1);
    });
  });

  describe('우승자 결정', () => {
    it('가장 멀리 이동한 자동차들을 우승자로 선정한다', () => {
      const car1 = carCollection.addCar('car1');
      car1.moveForward();
      car1.moveForward();

      const car2 = carCollection.addCar('car2');
      car2.moveForward();

      const winners = carCollection.getWinners();
      expect(winners).toHaveLength(1);
      expect(winners[0].getName()).toBe('car1');
    });

    it('동일한 거리를 이동한 자동차들이 공동 우승할 수 있다', () => {
      const car1 = carCollection.addCar('car1');
      const car2 = carCollection.addCar('car2');

      car1.moveForward();
      car2.moveForward();

      const winners = carCollection.getWinners();
      expect(winners).toHaveLength(2);
      expect(winners).toContain(car1);
      expect(winners).toContain(car2);
    });
  });
});
