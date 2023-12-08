/**
 * Manages multiple game instances.
 * Each game instances manager has a number of game instances and can create
 * game instances, run all game instances, and get all snakes from the game
 * instances.
 * @class
 */
class GameInstancesManager {
  /**
   * Creates a new game instances manager.
   * @constructor
   * @param {number} nInstances - The number of game instances to manage.
   */
  constructor(nInstances) {
    this.nInstances = nInstances;
    this.gameInstances = [];
  }

  /**
   * Creates a new game instance with a given snake and food.
   * @param {Snake} snake - The snake in the game instance.
   * @param {Food} food - The food in the game instance.
   * @returns {GameInstance} - The created game instance.
   */
  createGameInstance(snake, food) {
    return new GameInstance(snake, food);
  }

  /**
   * Creates the specified number of game instances, each with a copy of the
   * given snake and food.
   * @param {Snake} snake - The snake to copy for each game instance.
   * @param {Food} food - The food to copy for each game instance.
   */
  createGameInstances(snake, food) {
    for (let i = 0; i < this.nInstances; i++) {
      const snakeCopy = snake.copy();
      const foodCopy = food.copy();
      this.gameInstances.push(this.createGameInstance(snakeCopy, foodCopy));
    }
  }

  /**
   * Creates the next generation of game instances by performing selection and
   * mutation.
   * @returns {void}
   */
  nextGeneration() {
    this.selection();
    this.mutation();
  }

  /**
   * Performs selection on the game instances based on their fitness.
   * This method calculates the fitness of each game instance, normalizes the
   * fitness scores, and then selects a new set of game instances based on these
   * normalized fitness scores.
   * @returns {void}
   */
  selection() {
    const fitnesses = this.gameInstances.map((gameInstance) =>
      gameInstance.calculateFitness()
    );

    const totalFitness = fitnesses.reduce((acc, fitness) => acc + fitness, 0);
    const fitnessesNormalized = fitnesses.map(
      (fitness) => fitness / totalFitness
    );

    const newGameInstances = [];
    for (let i = 0; i < this.nInstances; i++) {
      const gameInstance = weightedRandomSelection(
        this.gameInstances,
        fitnessesNormalized
      );

      gameInstance.reset();

      newGameInstances.push(gameInstance);
    }

    this.gameInstances = newGameInstances;
  }

  /**
   * Performs mutation on the game instances.
   * @returns {void}
   */
  mutation() {
    this.gameInstances.forEach((gameInstance) => gameInstance.mutate());
  }

  /**
   * Checks if all game instances are over.
   * @returns {boolean} - True if all game instances are over, false otherwise.
   */
  allInstancesOver() {
    return this.gameInstances.every((gameInstance) => gameInstance.isOver);
  }

  /**
   * Runs all game instances managed by this game instances manager.
   * @returns {void}
   */
  runInstances() {
    this.gameInstances.forEach((gameInstance) => gameInstance.run());
  }

  /**
   * Gets all snakes from the game instances managed by this game instances manager.
   * @returns {Snake[]} - The snakes from the game instances.
   */
  get snakes() {
    return this.gameInstances.map((gameInstance) => gameInstance.snake);
  }
}
