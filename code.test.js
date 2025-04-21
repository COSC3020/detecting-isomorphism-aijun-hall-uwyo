const fs = require('fs');
const jsc = require('jsverify');
eval(fs.readFileSync('code.js') + '');

// Test 1: Two identical graphs with identical labels
const testIdenticalGraphs =
    jsc.forall(jsc.constant(true), function () {
        const graph1 = {
            A: ['B'],
            B: ['A']
        };

        const graph2 = {
            X: ['Y'],
            Y: ['X']
        };

        const expected = true;
        const result = are_isomorphic(graph1, graph2);

        return result == expected;
    });

// Test 2: Same structure but different labels
const testIsomorphicDifferentLabels =
    jsc.forall(jsc.constant(true), function () {
        const graph1 = {
            A: ['B', 'C'],
            B: ['A', 'C'],
            C: ['A', 'B']
        };

        const graph2 = {
            X: ['Y', 'Z'],
            Y: ['X', 'Z'],
            Z: ['X', 'Y']
        };

        const expected = true;
        const result = are_isomorphic(graph1, graph2);

        return result == expected;
    });

// Test 3: Non-isomorphic graphs (different edges)
const testNonIsomorphicGraphs =
    jsc.forall(jsc.constant(true), function () {
        const graph1 = {
            A: ['B'],
            B: ['C'],
            C: []
        };

        const graph2 = {
            X: ['Y'],
            Y: ['X'],
            Z: []
        };

        const expected = false;
        const result = are_isomorphic(graph1, graph2);

        return result == expected;
    });

// Test 4: Empty graphs
const testEmptyGraphs =
    jsc.forall(jsc.constant(true), function () {
        const graph1 = {};
        const graph2 = {};

        const expected = true;
        const result = are_isomorphic(graph1, graph2);

        return result == expected;
    });

// Test 5: Single node, different labels
const testSingleNodeDifferent =
    jsc.forall(jsc.constant(true), function () {
        const graph1 = { A: [] };
        const graph2 = { B: [] };

        const expected = true;
        const result = are_isomorphic(graph1, graph2);

        return result == expected;
    });

// Test 6: Graphs with different number of nodes
const testDifferentSizes =
    jsc.forall(jsc.constant(true), function () {
        const graph1 = { A: ['B'], B: [] };
        const graph2 = { X: ['Y'], Y: [], Z: [] };

        const expected = false;
        const result = are_isomorphic(graph1, graph2);

        return result == expected;
    });

jsc.assert(testIdenticalGraphs);
console.log("testIdenticalGraphs passed.");
jsc.assert(testIsomorphicDifferentLabels);
console.log("testIsomorphicDifferentLabels passed.");
jsc.assert(testNonIsomorphicGraphs);
console.log("testNonIsomorphicGraphs passed.");
jsc.assert(testEmptyGraphs);
console.log("testEmptyGraphs passed.");
jsc.assert(testSingleNodeDifferent);
console.log("testSingleNodeDifferent passed.");
jsc.assert(testDifferentSizes);
console.log("testDifferentSizes passed.");