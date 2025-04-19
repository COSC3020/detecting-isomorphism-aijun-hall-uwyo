// Helper function to generate all permutations using Heap's algorithm
function generatePermutations(input_array) {
    let result = [];

    function heap(n, array) {
        if (n == 1) {
            result.push(array.slice());
            return;
        }

        for (let index = 0; index < n; index++) {
            heap(n - 1, array);

            if (n % 2 == 0) {
                let temp = array[index];

                array[index] = array[n - 1];
                array[n - 1] = temp;
            } else {
                let temp = array[0];

                array[0] = array[n - 1];
                array[n - 1] = temp;
            }
        }
    }

    heap(input_array.length, input_array.slice());
    return result;
}

function are_isomorphic(graph1, graph2) {
    // Get array of graph key values (node labels)
    let nodes1 = Object.keys(graph1);
    let nodes2 = Object.keys(graph2);

    // Check for same number of nodes
    if (nodes1.length != nodes2.length) {
        return false;
    }

    // Edge case: both graphs are empty
    if (nodes1.length == 0 && nodes2.length == 0) {
        return true;
    }

    // Check degree sequences are equal
    let degrees1 = [];
    let degrees2 = [];

    for (let index = 0; index < nodes1.length; index++) {
        degrees1.push(graph1[nodes1[index]].length);
        degrees2.push(graph2[nodes2[index]].length);
    }

    degrees1.sort();
    degrees2.sort();

    for (let index = 0; index < degrees1.length; index++) {
        if (degrees1[index] != degrees2[index]) {
            return false;
        }
    }

    // Generate all possible permutations of node labels from graph2
    const permutations = generatePermutations(nodes2);

    // Try each perumtation as a possible mapping
    for (let index = 0; index < permutations.length; index++) {
        let perm = permutations[index];

        // Create a mapping from each node in graph1 to a node in graph2
        let mapping = {};
        for (let index = 0; index < nodes1.length; index++) {
            mapping[nodes1[index]] = perm[index];
        }

        let isValid = true;

        // Check if this mapping preserves all neighbor conections
        for (let index = 0; index < nodes1.length; index++) {
            const node1 = nodes1[index];
            const mappedNode = mapping[node1];

            const neighbors1 = graph1[node1];
            const mappedNeighbors1 = [];

            // Move over each neighbor of node1 to current mapping
            for (let j_index = 0; j_index < neighbors1.length; j_index++) {
                mappedNeighbors1.push(mapping[neighbors1[j_index]]);
            }

            mappedNeighbors1.sort();

            const neighbors2 = graph2[mappedNode].slice().sort();

            // If number of neighbors is different, mapping is invalid
            if (mappedNeighbors1.length != neighbors2.length) {
                isValid = false;
                break;
            }

            // Compare each neighbor in order
            for (let j_index = 0; j_index < mappedNeighbors1.length; j_index++) {
                if (mappedNeighbors1[j_index] != neighbors2[j_index]) {
                    isValid = false;
                    break;
                }
            }

            // Mismatch found
            if (!isValid) {
                break;
            }
        }

        // All checks passed, graphs are isomorphic
        if (isValid) {
            return true;
        }
    }

    return false;
}
