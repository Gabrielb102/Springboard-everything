const Queue = require("./Queue");
const Stack = require("./Stack");

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this
    }

    let current = this.root;
    while(current) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          break;
        } else {
          current = current.left;
        }
      } 
      if (current.val < val) {
        if (!current.right) {
          current.right = newNode;
          break;
        } else {
          current = current.right;
        }
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this
    }

    function ins (node, val) {
      if (val < node.val) {
        if (!node.left) {
          node.left = newNode;
          return;
        } else {
          ins(node.left, val);
        }
      } 
      if (node.val < val) {
        if (!node.right) {
          node.right = newNode;
          return;
        } else {
          ins(node.right, val);
        }
      }
    }

    ins(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) {
      return undefined;
    }

    let current = this.root;

    while(current) {
      if (current.val === val) return current;
      if (val < current.val) {
        if (current.left) {
          current = current.left;
        } else {
          return undefined;
        }
      } 
      if (current.val < val) {
        if (current.right) {
          current = current.right;
        } else {
          return undefined;
        }
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) {
      return undefined;
    }

    function findHelper(node,val) {
      if (node.val === val) return node;
      if (val < node.val) {
        if (node.left) {
          return findHelper(node.left, val)
        } else {
          return undefined;
        }
      } 
      if (node.val < val) {
        if (node.right) {
          return findHelper(node.right, val)
        } else {
          return undefined;
        }
      }
    }

    return findHelper(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    if (!this.root) {
      return null;
    }
    const allNodes = [];
    
    function dfsPOhelper(node) {
      allNodes.push(node.val);
      if (node.left) {
        dfsPOhelper(node.left);
      }
      if (node.right) {
        dfsPOhelper(node.right);
      }
      return allNodes;
    }
    return dfsPOhelper(this.root);
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    if (!this.root) {
      return null;
    }
    const allNodes = [];
    
    function dfsPOhelper(node) {
      if (node.left) {
        dfsPOhelper(node.left);
      }
      allNodes.push(node.val);
      if (node.right) {
        dfsPOhelper(node.right);
      }
      return allNodes;
    }
    return dfsPOhelper(this.root);
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if (!this.root) {
      return null;
    }
    const allNodes = [];
    
    function dfsPOhelper(node) {
      if (node.left) {
        dfsPOhelper(node.left);
      }
      if (node.right) {
        dfsPOhelper(node.right);
      }
      allNodes.push(node.val);

      return allNodes;
    }
    return dfsPOhelper(this.root);
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const searchItems = new Queue();
    const allNodes = [];
    if (this.root) searchItems.enqueue(this.root);

    while(searchItems.size) {
      let current = searchItems.dequeue();
      allNodes.push(current.val);
      if (current.left) {
        searchItems.enqueue(current.left);
      }
      if (current.right) {
        searchItems.enqueue(current.right);
      }
    }
    return allNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  // remove(val) {

  // }

  // /** Further Study!
  //  * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  // isBalanced() {

  // }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  // findSecondHighest() {
    
  // }
}

module.exports = BinarySearchTree;
