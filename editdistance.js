const MAX_LEN = 6;
const MATCH = 0;
const INSERT = 1;
const DELETE = 2;

let Cell = function(cost, parent) {
    this.cost = cost;
    this.parent = parent;
}

let m = [];

function print() {
    for(let i = 0; i < m.length; i++) {
        for(let k = 0; k < m[i].length; k++) {
            let cost = m[i][k].cost;
            if(cost === undefined) {
                cost = 0;
            }
            process.stdout.write(" " + cost + "  ");
        }
        console.log('\n');
    }

}

let stringCompare = function(s, t) {
    let i, j, k;
    let opt = [0, 0, 0];
    for(i = 0; i < MAX_LEN; i++) {
        let arr = [];
        for(let k = 0; k < MAX_LEN; k++) {
            arr.push(new Cell);
        }
        m.push(arr);
    }

    print();

    for(i = 0; i < MAX_LEN; i++) {
        rowInit(i);
        columnInit(i);
    }

    console.log("after row and column init");
    print();
    console.log("\n\nSTARTING\n\n");

    for(i = 1; i < s.length; i++) {
        for(j = 1; j < t.length; j++) {
            console.log("i: ", i, "j: ", j, "\n");
            opt[MATCH] = m[i-1][j-1].cost + match(s[i], t[j]);
            opt[INSERT] = m[i][j-1].cost + indel(t[j]);
            opt[DELETE] = m[i-1][j].cost + indel(s[i]);
            
            m[i][j].cost = opt[MATCH];
            m[i][j].parent = MATCH;
            for(k = INSERT; k <= DELETE; k++) {
                if(opt[k] < m[i][j].cost) {
                    m[i][j].cost = opt[k];
                    m[i][j].parent = k;
                    console.log(`setting m[${i}][${j}].cost to: ${opt[k]}`);
                }
            }
            print();
        }
    }
    console.log("------------");
    print();

    //goalCell(s, t, i, j);
    //this is the goal cell function here, without pointers
    //returns the indices of the cell marking the endpoint of the solution
    //for edit distance, this is the length of the 2 input strings
    i = s.length - 1;
    j = t.length - 1;

    reconstructPath(s, t, i, j);
    return m[i][j].cost;
};

let reconstructPath = function(s, t, i, j) {
    if(m[i][j].parent === -1) return;

    if(m[i][j].parent === MATCH) {
        reconstructPath(s, t, i - 1, j - 1);
        matchOut(s, t, i, j);
        return;
    }

    if(m[i][j].parent === INSERT) {
        reconstructPath(s, t, i, j - 1);
        insertOut(t, j);
        return;
    }

    if(m[i][j].parent === DELETE) {
        reconstructPath(s, t, i - 1, j);
        deleteOut(s, i);
        return;
    }
};

//initialize zeroth row of dp table
let rowInit = function(i) {
    //the cost i here corresponds to matching length-i strings against the empty string
    m[0][i].cost = i;
    if(i > 0) {
        m[0][i].parent = INSERT;
    }
    else {
        m[0][i].parent = -1;
    }
};

//initialize zeroth column of dp table
let columnInit = function(i) {
    m[i][0].cost = i;
    if(i > 0) {
        m[i][0].parent = DELETE;
    }
    else {
        m[i][0].parent = -1;
    }
};

let insertOut = function(t, j) {
    console.log("Inserted", t[j]);
};

let deleteOut = function(s, i) {
    console.log("Deleted", s[i]);
}

let matchOut = function(s, t, i, j) {
    if(s[i] === t[j]) {
        console.log("Matched");
    }
    else {
        console.log("Substituted", s[i], "with", t[j]);
    }
};

//match and indel can be modified to be application specific, adding higher cost depending on keyboard layout, etc
let match = function(c, d) {
    if(c === d) return 0;
    return 1;
};

let indel = function(c) {
    return 1;
};

let c = stringCompare("hey", "hello");
console.log(c);
//console.log(m);
