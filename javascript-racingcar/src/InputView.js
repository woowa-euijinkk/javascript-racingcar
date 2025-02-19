import { readLineAsync } from './utils/readLineAsync.js';

export class InputView {
  static #MESSAGE = {
    READ_CAR_NAMES: '경주할 자동차 이름을 입력하세요(이름은 쉼표 (,)를 기준으로 구분)',
    READ_TRY_COUNT: '시도할 횟수는 몇 회인가요?',
  };
  #reader;

  constructor(reader = readLineAsync) {
    this.#reader = reader;
  }

  async readCarNames() {
    return await this.#reader(InputView.#MESSAGE.READ_CAR_NAMES);
  }

  async readTryCount() {
    return await this.#reader(InputView.#MESSAGE.READ_TRY_COUNT);
  }
}
