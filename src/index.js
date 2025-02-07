import { GameProcessor } from './game-processor.js';
import { GameView } from './GameView.js';

const gameProcessor = new GameProcessor(new GameView());

gameProcessor.startGame();
