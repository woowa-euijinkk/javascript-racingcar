import { GameProcessor } from './gameProcessor.js';
import { GameView } from './GameView.js';

const gameProcessor = new GameProcessor(new GameView());

gameProcessor.startGame();
