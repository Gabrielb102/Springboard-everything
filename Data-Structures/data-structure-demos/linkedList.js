const { Node } = require("./nodeClass");

class linkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    traverse() {
        let currentNode = this.head;
        while(currentNode) {
            console.log(currentNode);
            currentNode = currentNode.next;
        }
    }

    find(val) {
        let currentNode = this.head;
        while(currentNode) {
            if (currentNode.val === val) return true;
            currentNode = currentNode.next;
        }
    }

    append(val) {
        const newNode = new Node(val);
        // first node syntax
        // it's actually critical that data is added which keeps the head and tail values updated
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        // set the tail node next address as this node, then set this node as the new tail
        this.tail.next = newNode;
        this.tail = newNode;
    }
}

// to store the list, just a reference to the first node is stored
// storing the whole ass thing would be allow for indexing, but also require storage, and shifting and all that.


const firstPage = new Node("google.com");

const history = new linkedList();
history.head = firstPage