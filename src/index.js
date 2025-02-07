import { GameModel } from './gameModel.js';
import { GameController } from './GameController.js';
import { InputView } from './InputView.js';
import { OutputView } from './OutputView.js';

const gameController = new GameController(
  new GameModel(),
  new InputView(),
  new OutputView(),
);

gameController.startGame();
