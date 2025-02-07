import { Car } from './car';
import { getRandomNumber } from './utils/getRandomNumber';
import { isEmptryOrNil } from './utils/parse';
import { readLineAsync } from './utils/readLineAsync';

export class GameProcessor {
  static READ_NAME_MESSAGE = '경주할 자동차 이름을 입력하세요(이름은 쉼표 (,)를 기준으로 구분) ';
  static EMPTY_NAME_ERROR = '이름을 제대로 입력하세요';
  static NAME_INPUT_SEPARATOR = ',';
  static MAX_NAME_LENGTH = 5;
  static MAX_NAME_LENGTH_ERROR = `이름은 ${GameProcessor.MAX_NAME_LENGTH}자 이하로 입력 가능합니다.`;

  static READ_COUNT_MESSAGE = '시도할 횟수는 몇 회인가요?';
  static INVALID_COUNT_ERROR = '시도 횟수는 숫자여야 합니다';

  static MOVE_NUMBERS = {
    START: 0,
    END: 9,
    CRITERIA: 4,
  };

  cars = [];

  async startGame() {
    const names = await this.readCarNames();

    const count = await this.readTryCount();

    this.playRounds(names, count);
    this.displayWinner();
  }

  async readTryCount() {
    while (true) {
      try {
        const countInput = await readLineAsync(GameProcessor.READ_COUNT_MESSAGE);
        const count = this.parseCount(countInput);
        console.log(count);
        return count;
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  async readCarNames() {
    while (true) {
      try {
        const nameInput = await readLineAsync(GameProcessor.READ_NAME_MESSAGE);
        const names = this.parseCarNames(nameInput);
        console.log(`${names.join(', ')}`);
        return names;
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  parseCount(count) {
    const parsedInt = parseInt(count);
    if (isNaN(parsedInt)) {
      throw new Error(GameProcessor.INVALID_COUNT_ERROR);
    }
    return parsedInt;
  }

  parseCarNames(names) {
    return names.split(GameProcessor.NAME_INPUT_SEPARATOR).reduce((acc, name) => {
      const trimmedName = name.trim();

      if (trimmedName.length > GameProcessor.MAX_NAME_LENGTH) {
        throw new Error(GameProcessor.MAX_NAME_LENGTH_ERROR);
      }

      if (trimmedName.length === 0) {
        throw new Error(GameProcessor.EMPTY_NAME_ERROR);
      }

      if (!isEmptryOrNil(trimmedName)) {
        acc.push(trimmedName);
      }

      return acc;
    }, []);
  }

  generateCar(name) {
    return new Car(name);
  }

  getCarByName(name) {
    return this.cars.filter((car) => car.name === name);
  }

  playRounds(names, count) {
    names.forEach((name) => {
      const car = this.generateCar(name);
      this.cars.push(car);
    });

    for (let i = 0; i < count; i++) {
      this.cars.map((car) => {
        const randomNumber = getRandomNumber(
          GameProcessor.MOVE_NUMBERS.START,
          GameProcessor.MOVE_NUMBERS.END,
        );
        if (randomNumber >= GameProcessor.MOVE_NUMBERS.CRITERIA) {
          car.moveForward();
        }
      });
      this.displayRoundStatus();
      console.log('');
    }
  }

  displayRoundStatus() {
    this.cars.forEach((car) => {
      this.displayCarStatus(car);
    });
  }

  displayCarStatus(car) {
    console.log(`${car.name} : ${`-`.repeat(car.progress)}`);
  }

  getWinners() {
    const max = this.calculateMaxProgress();
    return this.cars.filter((car) => car.progress === max);
  }

  displayWinner() {
    const winners = this.getWinners();

    console.log(`최종 우승자 : ${winners.map((w) => w.name).join(', ')}`);
  }

  calculateMaxProgress() {
    return this.cars.reduce((max, car) => {
      return Math.max(max, car.progress);
    }, 0);
  }
}
