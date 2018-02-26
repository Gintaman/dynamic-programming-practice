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
printGraph(g2);

const WHITE = 1;
const GRAY = 2;
const BLACK = 3;

let bfs = function(graph, s) {
    for(let i = 0; i < graph.edges.length; i++) {
        if(typeof graph.edges[i] !== 'undefined') {
            if(i !== s) {
                let u = graph.edges[i];
                u.color = WHITE;
                u.d = Infinity;
                u.pi = null;
            }
            else {

            }
        }
    }
};

bfs(g2, 0);
