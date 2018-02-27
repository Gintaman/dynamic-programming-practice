class Vertex {
    constructor() {
        this.y = null;                  //adjacency info
        this.weight = null;             //edge weight, if any
        this.next = null;

        this.color = null;
        this.pi = null;
        this.d = Infinity;
    }
}

class Graph {
    constructor(directed) {
        this.edges = [];                //adjacency info
        this.degree = 0;                //OUT-degree of each vertex
        this.nedges = 0;                //number of edges in the graph
        this.directed = directed;       //is the graph directed
    }
}

let insertEdge = function(graph, x, y, directed) {
    let p = new Vertex();
    p.weight = null;
    p.y = y;
    p.next = graph.edges[x] || null;

    graph.edges[x] = p;

    if(!directed) {
        insertEdge(graph, y, x, true);
    }
    else {
        graph.nedges++;
    }
};


let printGraph = function(graph, map) {
    for(let i = 0; i < graph.edges.length; i++) {
        if(typeof graph.edges[i] !== 'undefined') {
            if(map) 
                process.stdout.write(`${map[i]}: `);
            else 
                process.stdout.write(`${i}: `);
            let p = graph.edges[i];
            while(p !== null) {
                if(map)
                    process.stdout.write(" " + map[p.y]);
                else 
                    process.stdout.write(" " + p.y);
                p = p.next;
            }
            console.log("\n");
        } 
    }
};

let g = new Graph(true);
insertEdge(g, 1, 2, true);
insertEdge(g, 1, 4, true);
insertEdge(g, 4, 2, true);
insertEdge(g, 5, 4, true);
insertEdge(g, 2, 5, true);
insertEdge(g, 3, 5, true);
insertEdge(g, 3, 6, true);
insertEdge(g, 6, 6, true);

//printGraph(g);

let g2 = new Graph(false);
insertEdge(g2, 0, 1, false);
insertEdge(g2, 0, 4, false);

insertEdge(g2, 1, 5, false);
insertEdge(g2, 2, 5, false);
insertEdge(g2, 2, 6, false);
insertEdge(g2, 5, 6, false);
insertEdge(g2, 2, 3, false);

insertEdge(g2, 3, 7, false);
insertEdge(g2, 3, 6, false);
insertEdge(g2, 6, 7, false);

let map = ['r', 's', 't', 'u', 'v', 'w', 'x', 'y'];

//printGraph(g2, map);
//printGraph(g2);

const WHITE = 1;
const GRAY = 2;
const BLACK = 3;

let processVertexEarly = function(v) {
    //console.log("processed early: ", v);
};

let processEdge = function(v, y) {
    console.log("processed edge: ", v, ", ", y);
};

let processVertexLate = function(v) {
    //console.log("processed late: ", v);
};

let bfs = function(graph, start) {
    let discovered = [];
    let processed = [];
    let parent = [];
    let queue = [];

    for(let i = 0; i < graph.edges.length; i++) {
        discovered[i] = false;
        processed[i] = false;
        parent[i] = -1;
    }

    queue.push(start);
    discovered[start] = true;

    while(queue.length) {
        let v = queue.shift();
        processVertexEarly(v);
        processed[v] = true;
        let p = graph.edges[v];
        while(p !== null) {
            let y = p.y;
            if((processed[y] === false) || graph.directed) {
                processEdge(v, y);
            }
            if(discovered[y] === false) {
                queue.push(y);
                discovered[y] = true;
                parent[y] = v;
            }
            p = p.next;
        }
        processVertexLate(v);
    }
    for(let i = 0; i < parent.length; i++) {
        console.log("vertex ", i, " parent: ", parent[i]);
    }
};

//bfs(g2, 0);

let g3 = new Graph(false);
insertEdge(g3, 1, 2, false);
insertEdge(g3, 1, 5, false);
insertEdge(g3, 1, 6, false);

insertEdge(g3, 2, 3, false);
insertEdge(g3, 2, 5, false);

insertEdge(g3, 3, 4, false);

insertEdge(g3, 4, 5, false);
//printGraph(g3);
bfs(g3, 1);
