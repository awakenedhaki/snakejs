/**
 * Calculates the Manhattan distance between the snake's head and the food in terms of tiles.
 * @param {Snake} snake - The snake object.
 * @param {Food} food - The food object.
 * @returns {number} The Manhattan distance between the snake's head and the food in terms of tiles..
 */
function manhattanDistance(snake, food) {
  return (abs(snake.head.x - food.x) + abs(snake.head.y - food.y)) / tileSize;
}

/**
 * Selects an element randomly from an array of elements based on provided weights.
 * Each weight corresponds to the probability of selecting the respective element from the `elements` array.
 * The weights do not need to sum to 1, but they must be non-negative. If the weights sum to 0, the function will return `null`.
 *
 * @function weightedRandomSelection
 * @param {any[]} elements - The array of elements to select from.
 * @param {number[]} weights - The array of weights corresponding to elements.
 * @returns {any|null} - Returns a randomly selected element from the `elements` array, or `null` if the selection was unsuccessful (i.e., if the weights sum to 0).
 *
 * @example
 * const elements = ['a', 'b', 'c'];
 * const weights = [1, 2, 3];
 * const randomElement = weightedRandomSelection(elements, weights);
 * console.log(randomElement);  // Outputs 'a', 'b', or 'c' with respective probabilities 1/6, 2/6, 3/6
 */
function weightedRandomSelection(elements, weights) {
  if (weights.every((weight) => isNaN(weight))) {
    weights = weights.fill(1 / weights.length);
  }
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  const randomValue = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < elements.length; i++) {
    cumulativeWeight += weights[i];
    if (randomValue <= cumulativeWeight) {
      return elements[i];
    }
  }
  return null;
}
