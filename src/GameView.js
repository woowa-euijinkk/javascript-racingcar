import { readLineAsync } from './utils/readLineAsync.js';

export class GameView {
  static READ_NAME_MESSAGE = '경주할 자동차 이름을 입력하세요(이름은 쉼표 (,)를 기준으로 구분)';
  static READ_COUNT_MESSAGE = '시도할 횟수는 몇 회인가요?';

  async readCarNames() {
    const nameInput = await readLineAsync(GameView.READ_NAME_MESSAGE);
    return nameInput;
  }

  displayCarNames(names) {
    console.log(`${names.join(', ')}`);
  }

  async readTryCount() {
    const countInput = await readLineAsync(GameView.READ_COUNT_MESSAGE);
    return countInput;
  }

  displayGameCount(count) {
    console.log(count);
  }

  showError(message) {
    console.log(message);
  }

  displayRoundStatus(roundStatus) {
    roundStatus.forEach((carStatus) => {
      this.displayCarStatus(carStatus);
    });
    console.log('');
  }

  displayCarStatus(car) {
    console.log(`${car.name} : ${`-`.repeat(car.position)}`);
  }

  displayWinners(winners) {
    console.log(`최종 우승자 : ${winners.map((w) => w.name).join(', ')}`);
  }
}
