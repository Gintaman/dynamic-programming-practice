//we can't write this in 'C' style with pointers and modifying the original array
//because of scoping i think. we really need to be creating and returning arrays at
//each step

function mergesort(s, low, high) {
    if(low < high) {
        let middle = Math.floor((low + high) / 2);
        mergesort(s, low, middle);
        mergesort(s, middle+1, high);
        merge(s, low, middle, high);
    }
}

function merge(s, low, middle, high) {
    let buffer1 = [], buffer2 = [];

    //console.log("calling merge with: ", low, middle, high);
    for(let i = low; i <= middle; i++) {
        buffer1.push(s[i]);
    }
    for(let i = middle+1; i <= high; i++) {
        buffer2.push(s[i]);
    }

    i = low;
    let head1 = null, head2 = null;
    console.log(buffer1, buffer2);
    while(!(buffer1.length === 0 || buffer2.length === 0)) {
        if(buffer1[0] <= buffer2[0]) {
            buffer1.shift();
            //s[i] = buffer1.shift();
            //i++;
        }
        else {
            buffer2.shift();
            //s[i] = buffer2.shift();
            //i++;
        }
        /*if(buffer1.length) {
            head1 = buffer1.shift();
        }
        if(buffer2.length) {
            head2 = buffer2.shift();
        }
        console.log("wtf", head1, head2);
        if(head1 !== null && head2 !== null) {
            if(head1 < head2) {
                s[i] = head1;
                console.log("a: ", s[i]);
                i++;
            }
            else {
                s[i] = head2;
                console.log("b: ", s[i]);
                i++;
            }
        }*/
    }

    console.log("\n");

    //while(buffer1.length !== 0) s[i++] = buffer1.unshift();
    //while(buffer2.length !== 0) s[i++] = buffer2.unshift();
}

let s = [10, 5, 2, 6, 3, 4];
mergesort(s, 0, s.length - 1);
console.log(s);
