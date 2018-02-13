//C style bst with static functions 
class BST {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
    printNode() {
        console.log(this.val);
    }
    insert(val) {
        if(val < this.val) {
            if(this.left === null) 
                this.left = new BST(val);
            else 
                this.left.insert(val);
        }
        else {
            if(this.right === null) 
                this.right = new BST(val);
            else
                this.right.insert(val);
        }
    }
    inOrder() {
        if(this.left !== null) this.left.inOrder();
        this.process();
        if(this.right !== null) this.right.inOrder();
    }
    preOrder() {
        this.process();
        if(this.left !== null) this.left.preOrder();
        if(this.right !== null) this.right.preOrder();
    }
    postOrder() {
        if(this.left !== null) this.left.postOrder();
        if(this.right !== null) this.right.postOrder();
        this.process();
    }
    process() {
        this.printNode();
    }
}

let root = new BST("F");
root.insert("B");
root.insert("G");
root.insert("A");
root.insert("D");
root.insert("C");
root.insert("E");
root.insert("I");
root.insert("H");
root.inOrder();
console.log("pre");
root.preOrder();
console.log("post");
root.postOrder();
