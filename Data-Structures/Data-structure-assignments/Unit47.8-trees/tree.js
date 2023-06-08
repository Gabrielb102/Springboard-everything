/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let toSum = [this.root];
    let sum = 0
    while (toSum.length && toSum[0]) {
      let current = toSum.pop();

      sum += current.val;

      for (let child of current.children) {
        toSum.push(child)
      }
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let toCheck = [this.root];
    let numEvens = 0
    while (toCheck.length && toCheck[0]) {
      let current = toCheck.pop();

      if (current.val % 2 === 0) {
        numEvens++;
      };

      if (current.children) {
        for (let child of current.children) {
          toCheck.push(child)
        }  
      }
    }
    return numEvens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let toCheck = [this.root];
    let numHigher = 0
    while (toCheck.length && toCheck[0]) {
      let current = toCheck.pop();

      if (current.val > lowerBound) {
        numHigher++;
      };

      if (current.children) {
        for (let child of current.children) {
          toCheck.push(child)
        }  
      }
    }
    return numHigher;
  }
}

module.exports = { Tree, TreeNode };
