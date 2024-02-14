const algo = require("./common");

const assert = cond => {
    if (!cond)
        throw new Error("assertion failed");
};

const assertEq = (a, b) => {
    if (typeof a !== typeof b)
        throw new Error(`a != b, ${typeof a} != ${typeof b}`)

    if (typeof a === "object") {
        for (let k in a) {
            try {
                assertEq(a[k], b[k]);
            } catch (e) {
                throw new Error(`Objects inequal: ${JSON.stringify(a)}, ${JSON.stringify(b)}`)
            }
        }
    } else {
        if (a !== b)
            throw new Error(`a != b, a=${a}, b=${b}`)
    }
};

// a can't have b, and vice-versa
(() => {
    const pairings = algo.generatePairings(
        [
            {
                isOneWay: false,
                people: ["a", "b"],
            }
        ],
        [ "a", "b", "c", "d" ]
    );

    assert(pairings["a"] !== "b");
    assert(pairings["b"] !== "a");
})()

// a must have d (and vice versa)
assertEq(
    algo.generatePairings(
        [
            {
                isOneWay: false,
                people: ["a", "b"],
            },
            {
                isOneWay: false,
                people: ["a", "c"],
            }
        ],
        [ "a", "b", "c", "d" ]
    ),
    { a: "d", b: "c", c: "b", d: "a" }
);

// can't go a->b->c
assertEq(
    algo.generatePairings(
        [
            {
                isOneWay: true,
                people: ["a", "b"],
            },
            {
                isOneWay: true,
                people: ["b", "c"],
            },
            {
                isOneWay: true,
                people: ["c", "a"],
            }
        ],
        [ "a", "b", "c" ]
    ),
    // note that all of these have one-way restrictions
    // in the other direction
    { a: "c", b: "a", c: "b" }
);
