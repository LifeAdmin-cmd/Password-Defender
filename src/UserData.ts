export default class UserData {
  private vault: number;

  // the players score
  private score: number;

  private level: number;

  // is only used as a cosmetic
  private username: string;

  // Password is representing the players health
  private password: string;

  private displayedPassword: string;

  private revealedLetters: string;

  public revealCount: number;

  /**
   * Constructs a new UserData and sets the score to 0
   */
  constructor() {
    this.score = 0;
    this.displayedPassword = '';
    this.revealedLetters = '';
    this.revealCount = 0;
    this.vault = 0;
    this.level = 1;
  }

  /**
   * Converts the given Password to Asterisk
   *
   * @returns the displayed password
   * @param "count" the number of letters
   */
  private passwordToAsterisk(count: number): string {
    this.displayedPassword = '';
    // console.log('password converting working');
    for (let index = 0; index < count; index++) {
      this.displayedPassword += '*';
    }
    // console.log(this.displayedPassword);
    return this.displayedPassword;
  }

  /**
   *
   * @returns the players score
   */
  public getScore(): number {
    return this.score;
  }

  /**
   *
   * @param score sets the players sccore to the passed score
   */
  public addScore(score: number): void {
    this.score += score;
  }

  /**
   *
   * @returns the username
   */
  public getUsername(): string {
    return this.username;
  }

  /**
   *
   * @param username will be the new username of the user
   */
  public setUsername(username: string): void {
    this.username = username;
    // console.log(this.username);
  }

  /**
   *
   * @returns the password
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   *
   * @param password sets the password to the passed password and creates the displayedPassword
   */
  public setPassword(password: string): void {
    this.password = password;
    // console.log(this.password);
    this.displayedPassword = this.passwordToAsterisk(this.password.length);
    // console.log(this.displayedPassword);
  }

  /**
   *
   * @returns the displayedPassword
   */
  public getDisplayedPassword(): string {
    return this.displayedPassword;
  }

  /**
   * Refreshes the displayedPassword when the player got damage
   *
   * @param revealCount is the number of letters that should be revealed from the password
   */
  public revealDisplayedPassword(revealCount: number): void {
    this.displayedPassword = this.passwordToAsterisk(this.password.length - revealCount);
    this.revealedLetters = '';
    // console.log(this.displayedPassword);
    for (
      let index = this.password.length - revealCount;
      index < this.password.length;
      index++
    ) {
      this.revealedLetters += this.password.charAt(index);
      // console.log(this.revealedLetters);
    }
    this.displayedPassword += this.revealedLetters;
    // console.log(this.displayedPassword);
  }

  /**
   * Changes the value of the vault based on the given value
   *
   * @param value can be + or - and changes the vault by this value
   */
  public static changeVaultValue(value: number): void {
    // console.log(value);
    const newValue = value + UserData.getVaultValue();
    console.log(newValue);
    localStorage.setItem('vault', newValue.toString());
  }

  /**
   * Reads the localStorage and
   *
   * @returns the vault value as a number
   */
  public static getVaultValue(): number {
    let x = 0;
    const vault = localStorage.getItem('vault');
    x = parseFloat(vault);
    // console.log(x);
    return x;
  }

  /**
   * Getter for level
   *
   * @returns level
   */
  public getLevel() : number {
    return this.level;
  }

  /**
   * Set level +1
   */
  public addLevel() : void {
    this.level += 1;
  }
}
