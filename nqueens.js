/*
 *
 * n-queens
 *
 * */


//basically a dfs on an implicit graph

//backtrack is generic
//application specific procedures are process_solution, construct_candidates, and is_a_solution
//this code generates all subsets up to a number n
//by tweaking the 3 application specific procedures, we can change the code to solve sudoku, n queens, etc

let finished = false;
let solution_count = 0;

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

//just counts the solutions, doesn't show them
let process_solution = function(a, k, n) {
    solution_count++;
}

//tests whether the first k inputs of the solution vector a is a complete solution for the problem
let is_a_solution = function(a, k, n) {
    return k === n;
};

//n queens seems a lot like sudoku
let construct_candidates = function(a, k, n, c) {
    let ncandidates = 0;
    let legal_move = false;

    //n is nxn grid
    //for n = 8, we're looking at the squares of the grid (ignoring i == 0)

    //iterate through squares on the current row. 
    for(i = 1; i <= n; i++) {
        legal_move = true;
        console.log("partial solutions so far: ", a);
        for(j = 1; j < k; j++) {
            //diagonal threat
            if(Math.abs(k - j) === Math.abs(i - a[j])) {
                legal_move = false;
            }
            //column threat
            if(i === a[j]) {
                legal_move = false;
            }
            //only 1 queen per row, so no row threat
        }
        if(legal_move === true) {
            c[ncandidates] = i;
            ncandidates += 1;
        }
    }
    return ncandidates;
};

//kick off the function
let nqueens = function(n) {
    let a = [];
    backtrack(a, 0, n);
    console.log(solution_count);
};

//n-queens on an 8x8 grid
nqueens(3);
