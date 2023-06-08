class Queue {
    constructor () {
        this.data = [];
    }
    enqueue(val) {
        this.data.push(val);
    }
    dequeue(val) {
        this.data.concat.shift()
    }
}

// this queue uses [] at it's core, which means it's using O(n).

// to make a real queue