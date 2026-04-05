import React from 'react';
import ChatApp from '../components/ChatApp';

const MOCK_DATA = {
  problem: "Write a function to generate the Fibonacci sequence up to a given number 'n', optimized for both time and space complexity.",
  solution_1: "```python\ndef fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    \n    fib = [0, 1]\n    while True:\n        next_val = fib[-1] + fib[-2]\n        if next_val > n:\n            break\n        fib.append(next_val)\n    return fib\n```\nThis approach uses an iterative method building an array and checks if the calculated value exceeds 'n'.",
  solution_2: "```python\ndef fib_generator(n):\n    a, b = 0, 1\n    while a <= n:\n        yield a\n        a, b = b, a + b\n\n# Usage:\n# list(fib_generator(n))\n```\nThis solution uses a Python generator, consuming `O(1)` space while calculating the sequence up to 'n' lazily.",
  judge: {
      solution_1_score: "85",
      solution_2_score: "95",
      solution_1_reasoning: "The iterative array building is functional and straightforward, scoring well on readability.\n\n- **Pros:** simple, returns the full list directly\n- **Cons:** memory inefficient for very large values of `n`.",
      solution_2_reasoning: "The generator approach is highly idiomatic effectively bringing the space complexity down to `O(1)`, scoring maximum points for efficiency. It beautifully leverages Python's yield statement.\n\n- **Pros:** extremely memory efficient, elegant\n- **Cons:** requires wrapping in `list()` if the consumer needs array indexing."
  }
};

const App = () => {
  return (
    <ChatApp mockData={MOCK_DATA} />
  );
}

export default App;