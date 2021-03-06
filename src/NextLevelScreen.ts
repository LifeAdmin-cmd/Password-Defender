import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Level from './Level.js';
import Scene from './Scene.js';
// import StartScreen from './StartScreen.js';
import UserData from './UserData.js';

export default class NextLevelScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  private winTitle: HTMLImageElement;

  /**
   *
   * @param game Game class
   */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.buttonImage = Game.loadNewImage('./assets/img/Press-C-Continue.png');
    this.winTitle = Game.loadNewImage('./assets/img/You-Win.png');

    UserData.changeVaultValue(this.game.getUserData().getScore());
  }

  /**
   * Method for read the process input from user
   */
  public processInput() : void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_C)) {
      this.nextScene = true;
    }
  }

  /**
   * Method for update the screen
   *
   * @returns New scene
   */
  public update(): Scene {
    if (this.nextScene) {
      return new Level(this.game);
    }
    return null;
  }

  /**
   * Render to canvas
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 110,
      0,
      this.mainLogo.width / 4.5,
      this.mainLogo.height / 4.5,
    );
    this.game.ctx.drawImage(
      this.winTitle,
      (this.game.canvas.width / 2) - 200,
      250,
      this.winTitle.width / 2,
      this.winTitle.height / 2,
    );
    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - 250,
      600,
    );
  }
}
