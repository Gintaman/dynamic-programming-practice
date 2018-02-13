//we can't write this in 'C' style with pointers and modifying the original array
//because of scoping i think. we really need to be creating and returning arrays at
//each step

function mergesort(s) {
    if(s.length === 0 || s.length === 1) {
        return s;
    }

    let middle = Math.floor(s.length / 2);
    let left = s.slice(0, middle);
    let right = s.slice(middle, s.length);

    return merge(mergesort(left), mergesort(right));
}

function merge(left, right) {
    let res = [];
    while(left.length && right.length) {
        if(left[0] <= right[0]) 
            res.push(left.shift());
        else 
            res.push(right.shift());
    }

    while(left.length) res.push(left.shift());
    while(right.length) res.push(right.shift());

    return res;
}


let a = function() {
    console.log(mergesort([10, 5, 2, 6, 3, 4]));
    console.log(mergesort([0]));
    console.log(mergesort([4, 3, 6, -1, 7]));
};

function ListNode(val) {
    this.val = val;
    this.next = null;
};

let b = function() {
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    //head.next.next.next.next = new ListNode(5);
    list_mergesort(head);
};

function list_mergesort(list) {
}

function list_merge(left, right) {

}

b();
