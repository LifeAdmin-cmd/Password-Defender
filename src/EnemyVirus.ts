import TileMaps from './TileMaps.js';
import Game from './Game.js';
import MovingDirection from './MovingDirection.js';
import GameEntity from './GameEntity.js';
import GameMap from './GameMap.js';

export default class EnemyVirus extends GameEntity {
  private movingDirection: number;

  private directionTimerDefault: number;

  private directionTimer: number;

  /**
   * Constructor for enemy virus
   *
   * @param x Enemy x position
   * @param y Enemy y position
   * @param tileSize Enemy tile size
   * @param tileMaps Tile map
   * @param gameMap Game map
   */
  constructor(
    x: number,
    y: number,
    tileSize: number,
    tileMaps: TileMaps,
    gameMap: GameMap,
  ) {
    super(
      x,
      y,
      tileSize,
      tileMaps,
      gameMap,
    );

    this.velocity = 2;

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length,
    );

    this.directionTimerDefault = 20;
    this.directionTimer = this.directionTimerDefault;
  }

  private move() {
    if (
      !this.tileMaps.collideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection,
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.getMDUp():
          this.y -= this.velocity;
          break;
        case MovingDirection.getMDDown():
          this.y += this.velocity;
          break;
        case MovingDirection.getMDLeft():
          this.x -= this.velocity;
          break;
        case MovingDirection.getMDRight():
          this.x += this.velocity;
          break;
        default:
          break;
      }
    }
  }

  /**
   *  Method for draw enemy virus to canvas
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D) : void {
    this.move();
    this.changeDirection();
    ctx.drawImage(
      Game.loadNewImage('./assets/img/Microbug.png'),
      this.x + 300,
      this.y + 200,
      this.tileSize,
      this.tileSize,
    );
  }

  /**
   * Method for enemy to change the moving direction
   */
  public changeDirection() : void {
    this.directionTimer -= 2;
    let newMoveDirection = null;
    if (this.directionTimer === 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length,
      );
    }

    if (newMoveDirection != null && this.movingDirection !== newMoveDirection) {
      if (
        Number.isInteger(this.x / this.tileSize)
        && Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMaps.collideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection,
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }

  /**
   * Getter for enemy x position
   *
   * @returns enemy x position
   */
  public getXPos() : number {
    return this.x;
  }

  /**
   * Getter for enemy y position
   *
   * @returns enemy y position
   */
  public getYPos() : number {
    return this.y;
  }

  /**
   * Check for enemy collide with password
   *
   * @returns true or false
   */
  public checkForEnemyDamage(): boolean {
    if (this.tileMaps.collideWithPassword(this.x, this.y)) {
      return true;
    }
    return false;
  }
}
