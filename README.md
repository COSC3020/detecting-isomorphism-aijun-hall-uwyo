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

Checking degree equality: `for (let index = 0; index < nodes1.length; index++) {`

Iterating over the nodes: $O(V)$
Sorting each list of degrees $O(Vlog(V))$

Generating Permutations of Vertex Labels: `const permutations = generatePermutations(nodes2);`

Number of Permutations is $V!$

Each Permutation is a copy of an array of size V: $O(V * V!)$

Validating Permutations: `for (let index = 0; index < permutations.length; index++) {`

There are $V! permutations, so for each permutation we iterate linearly here:
```
for (let index = 0; index < nodes1.length; index++) {
    mapping[nodes1[index]] = perm[index];
}
```
$O(V)$

We also check the edge state consistency in the mapping. For each vertex, we linearly grab the neighbors from graph1 and sort them for comparison:
```
for (let j_index = 0; j_index < neighbors1.length; j_index++) {
    mappedNeighbors1.push(mapping[neighbors1[j_index]]);
}

mappedNeighbors1.sort();
```

Edge lookups: $O(E)$

Across all neighbor lists with sorted comparison: $O(Elog V)$

Therefore every perumtation will run: $O(V + Elog V)$

General:

Degree Check: $\Theta(VlogV)$

Generating Permutations: $\Theta(V * V!)$

Verifying the Graph States $\Theta(V! * ElogV)$

Insignificant terms fall away to:

$\Theta(V! * (V + Elog(V)))$

This is the worst case time complexity of my implementation. For $V!$ number of permutations, there is a cost of $O(V + ElogV)$ from mapping, list lookups across the graph, and sorting of neighbor lists for comparisons.

- Referenced https://stackoverflow.com/questions/3876354/algorithm-for-determining-if-2-graphs-are-isomorphic for working through the problem and reading references

- Referenced https://en.wikipedia.org/wiki/Graph_isomorphism_problem since it was linked in the stackoverflow

- Referenced Heaps Algorithm implementation I wrote for brute-force repository assignment.

- Referenced https://www.geeksforgeeks.org/graph-isomorphisms-connectivity/ for algorithm research and code references. All code written is my own.