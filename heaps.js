//heaps. indexes start at 1 for simplicity. not using es6 classes just to spice it up
let Heap = function() {
    this.q = [];
    
    //there isn't a really need to store the length as a separate variable, since we can
    //use q.length, but it will be convenient for 1-based indexing
    this.n = 0;
};

//the main operations we care about are extract-min/max and insert.
//so we'll have auxilliary methods parent, left and child can work on indices rather than values

//get parent
Heap.prototype.parent = function(n) {
    if(n === 1) return -1;
    return Math.floor(n / 2);
};

//get left child
Heap.prototype.left = function(n) {
    return 2 * n;
};

//get right child
Heap.prototype.right = function(n) {
    return (2 * n) + 1;
};

Heap.prototype.insert = function(val) {
    this.q.push(val);
    this.n++;
    this.bubbleUp(this.n);
};

Heap.prototype.bubbleUp = function(p) {
    if(this.parent(p) === -1) return;
    if(this.q[this.parent(p)] > this.q[p]) {
        this.swap(p, this.parent(p));
        this.bubbleUp(this.parent(p));
    }
};

Heap.prototype.swap = function(a, b) {
    let temp = this.q[a];
    this.q[a] = b;
    this.q[b] = temp;
};

Heap.prototype.makeHeap = function(arr) {
    for(let i = 0; i < arr.length; i++) {
        this.insert(arr[i]);
    }
};

Heap.prototype.extractMin = function() {
    //TODO
};

Heap.prototype.bubbleDown = function() {
    //TODO
};

let heapsort = function(items) {
    //TODO
};

let h = new Heap();
h.makeHeap([5, 2, 3, 4, 6]);
