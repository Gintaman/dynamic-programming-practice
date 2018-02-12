/*
 *
 * Subsets
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
    process.stdout.write("{");
    for(let i = 1; i <= k; i++) {
        if(a[i] === true) {
            process.stdout.write(" " + i + "");
        }
    }
    process.stdout.write(" }");
    console.log("\n");
}

//tests whether the first k inputs of the solution vector a is a complete solution for the problem
let is_a_solution = function(a, k, n) {
    return k === n;
};

//for the problem of generating all subsets, we do not have a constraint on which candidates we want. we want the entire space.
//for sudoku, we would add a constraint of only allowing numbers that have not appeard in the same row, column, or sector
let construct_candidates = function(a, k, input, c) {
    //for sudoku, we may keep an array of 10 elements for the numbers 1-9. 10 elements just so we don't have to worry about off by 1 indexing
    //each index represents the number 1-9, and its true or false value indicates whether or not it is a potential candidate (number does not already 
    //appear in the corresponding row, column, or sector)
    c[0] = true;
    c[1] = false;
    return 2; //return # of candidates
};

//kick off the function
let generate_subsets = function(n) {
    let a = [];
    backtrack(a, 0, n);
};

generate_subsets(3);
