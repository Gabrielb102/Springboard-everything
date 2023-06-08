/** Node: node for a doubly linked list. */

class Node {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val, null, this.tail);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.length++;
    this.tail.next = newNode;
    this.tail = newNode;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val, this.head, null);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.head = newNode;
    this.length++;
  }

  /** clear(): empties the list and sets properties to initial conditions */

  clear() {
    this.tail = null;
    this.head = null;
    this.length = 0;
  }

  /** pop(): return & remove last item. */

  pop() {
    const exTail = this.tail;
    if (this.length === 1) {
      this.clear()
      return exTail.val;
    }
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.length--;
    return exTail.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    const exHead = this.head;
    if (this.head.next) {
      const newHead = this.head.next;
      newHead.prev = null;
      this.head = newHead;
      this.length--;
    } else {
      this.clear()
    }
    return exHead.val;  
  }

  /** getNode(idx): get Node at idx. */

  getNode(idx) {

    if (idx >= this.length) {
      return null;
    }

    let currentNode = this.head;

    for (let i = 0; i < idx; i++) {
      if (currentNode.next) currentNode = currentNode.next;
    }
    return currentNode;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    const currentNode = this.getNode(idx);
    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    const currentNode = this.getNode(idx);
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);
    if (idx === 0 ) {
      this.head = newNode;
    } 
    if (idx === this.length) {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this.length ++;
      return;
    }
    if (this.length) {
      const spot = this.getNode(idx);
      if (idx > 0) {
        console.log('spot: ', spot);
        newNode.prev = spot.prev;
        spot.prev.next = newNode;
      }
      newNode.next = spot
      spot.prev = newNode;
    }
    this.length++; 
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let currentNode = this.getNode(idx);
    if (this.length === 1) {
      this.clear();
      return;
    }
    currentNode.prev.next = currentNode.next;
    currentNode.next.prev = currentNode.prev;
    this.length--;
  }

  /** average(): return an average of all values in the list */

  average() {
    let currentNode = this.head;
    let sum = 0;
    if (this.length === 0) {
      return 0;
    }
    for (let i = 0; i < this.length; i++) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    return sum/(this.length);
  }
}

module.exports = LinkedList;
