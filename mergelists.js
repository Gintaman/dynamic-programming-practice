let Node = function(val) {
    this.val = val;
    this.next = null;
};

let a = new Node(1);
a.next = new Node(2);
a.next.next = new Node(3);
a.next.next.next = new Node(4);

let b = new Node(2);
b.next = new Node(3);
b.next.next = new Node(4);
b.next.next.next = new Node(5);

let printList = function(list) {
    let temp = list;
    while(temp !== null) {
        console.log(temp.val);
        temp = temp.next;
    }
}

let mergeLists = function (list1, list2) {
    //dummy node
    let res = new Node(null);
    //keep reference to head of result
    let head = res;
    while(list1 !== null && list2 !== null) {
        if(list1.val < list2.val) {
            res.next = list1;
            list1 = list1.next;
        }
        else {
            res.next = list2;
            list2 = list2.next;
        }
        res = res.next;
    }

    if(list1) {
        res.next = list1;
    }
    else if(list2) {
        res.next = list2;
    }

    return head.next;
};

printList(mergeLists(a, b));
