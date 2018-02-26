/*
 *
 * Permutations
 * To avoid repeating permutation elements, we must ensure that the ith element is distinct from all elements before it.
 * S'k = { 1, 2 ... n } - a and a is a solution whenever k == n
 *
 * */


//basically a dfs on an implicit graph

//backtrack is generic
//application specific procedures are process_solution, construct_candidates, and is_a_solution
//this code generates all subsets up to a number n
//by tweaking the 3 application specific procedures, we can change the code to solve sudoku, n queens, etc

let finished = false;

//solution vector a, k is number of slots in solution vector filled so far, input is data we might need to help us out
let backtrack = function(a, k, input) {
    let c = [];                         //candidates for next position
    let ncandidates = 0;                //next position candidate count

    if(is_a_solution(a, k, input)) {
        process_solution(a, k, input);
    }
    else {
        //not a complete solution vector. we now want to extend our partial solution by writing to the k + 1st position of the solution ector
        k += 1;

        //construct a set of all possible candidates for the k + 1st position. we'll iterate through all possible candidates, and then recursively call
        //backtrack with all of them
        ncandidates = construct_candidates(a, k, input, c);
        for(let i = 0; i < ncandidates; i++) {
            a[k] = c[i];                //appending to the end of current solution vector
            backtrack(a, k, input);
            if(finished) return;        //terminate early
        }
    }
};

//prints, counts, does whatever to a complete solution once it is constructed.
//for now, we'll set input to be 'n', which is the number of elements to fill in a
let process_solution = function(a, k, n) {
    //this is code for generating subsets of numbers up to n
    for(let i = 1; i <= k; i++) {
        process.stdout.write(" " + a[i] + "");
    }
    console.log("\n");
}

//tests whether the first k inputs of the solution vector a is a complete solution for the problem
let is_a_solution = function(a, k, n) {
    return k === n;
};

let construct_candidates = function(a, k, n, c) {
    //for permutations, we need to ensure that the ith element is distinct from all elements before it.
    let in_perm = [];                   //who is in the permutation?

    let i;
    for(i = 1; i <= n; i++) {
        in_perm[i] = false;
    }
    for(i = 0; i < k; i++) {
        in_perm[ a[i] ] = true;
    }
    //console.log(in_perm);

    let ncandidates = 0;
    for(i = 1; i <= n; i++) {
        if(in_perm[i] === false) {
            c[ncandidates] = i;
            ncandidates += 1;
        }
    }

    return ncandidates; //return # of candidates
};

//kick off the function
let generate_permutations = function(n) {
    let a = [];
    backtrack(a, 0, n);
};

generate_permutations(3);

let string_permutations = function(str) {
    if(str.length < 2) {
        return str;
    }

    let permutations = [];

    for(let i = 0; i < str.length; i++) {
        let c = str[i];
        if(str.indexOf(c) !== i) {
            continue;
        }

        let remainingString = str.slice(0, i) + str.slice(i + 1, str.length);
        console.log("c: ", c,  " remainingString: ", remainingString);
        for(let sub of string_permutations(remainingString)) {
            permutations.push(c + sub);
        }
    }
    return permutations;
};

console.log(string_permutations("abc"));
