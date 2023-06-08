/** Node: node for a stack. */

class Node {
    constructor(val) {
      this.val = val;
      this.prev = null;
    }
  }
  
  /** Stack: chained-together nodes where you can
   *  remove from the top or add to the top. */
  
  class Stack {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }
  
    /** push(val): add new value to end of the stack. Returns undefined. */
  
    push(val) {
      const newNode = new Node(val);
      if (!this.first) {
        this.first = newNode;
      } else {
        newNode.prev = this.last;
      }
      this.last = newNode;
      this.size++;
    }
  
    /** pop(): remove the node from the top of the stack
     * and return its value. Should throw an error if the stack is empty. */
  
    pop() {
      if (this.isEmpty()) {
        throw new Error("stack is empty");
      }
      const top = this.last;
      this.last = this.last.prev;
      this.size--;
      return top.val;
    }
  
    /** peek(): return the value of the LAST node in the stack. */
  
    peek() {
      return this.last.val;
    }
  
    /** isEmpty(): return true if the stack is empty, otherwise false */
  
    isEmpty() {
      return this.size === 0;
    }
  }
  
  module.exports = Stack;
  