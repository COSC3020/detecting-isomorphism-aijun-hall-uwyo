# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

<hr>

Degree precheck: $O(V^2)$

Computes the degree of every vertex and sorts two length-V arrays.

Generating all permutations: $O(V! * V)$

Heap's algorithm visits the base case V! times. At each visit it copies an array of length V.

Verifying perumtations (every loop instance): $O(V^2)$

For every vertex we write an entry into mapping, then scan the full adjacany list- which can be at most $V - 1$ items. This is done from the first graph and then scanned into the corresponding list in the second graph. That makes 2 * V comparisons per vertex for $O(V^2)$ per permutation

Verifying perumtations (all loops/complete runtime): $O(V! * V^2)$

The $O(V^2)$ verification loop is repeated for each of the $V! permutations$.

General:

$\Theta(V! * V^2)$

- Referenced https://stackoverflow.com/questions/3876354/algorithm-for-determining-if-2-graphs-are-isomorphic for working through the problem and reading references

- Referenced https://en.wikipedia.org/wiki/Graph_isomorphism_problem since it was linked in the stackoverflow

- Referenced Heaps Algorithm implementation I wrote for brute-force repository assignment.

- Referenced https://www.geeksforgeeks.org/graph-isomorphisms-connectivity/ for algorithm research and code references. All code written is my own.

"I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."
