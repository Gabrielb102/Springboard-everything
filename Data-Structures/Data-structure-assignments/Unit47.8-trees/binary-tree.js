/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null, parent = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let currentNode = this.root;
    if (!currentNode) return 0;
    function findLongest(node, depth = 1) {
      let leftDepth;
      let rightDepth;
      if (!node.left && !node.right) return depth;
      if (node.left) {
        leftDepth = findLongest(node.left, depth + 1);
      }
      if (node.right) {
        rightDepth = findLongest(node.right, depth + 1);
      }
      return leftDepth < rightDepth ? leftDepth : rightDepth;
    }
    return findLongest(currentNode);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let currentNode = this.root;
    if (!currentNode) return 0;
    function findLongest(node, depth = 1) {
      let leftDepth;
      let rightDepth;
      if (!node.left && !node.right) return depth;
      if (node.left) {
        leftDepth = findLongest(node.left, depth + 1);
      }
      if (node.right) {
\        rightDepth = findLongest(node.right, depth + 1);
      }
      return leftDepth > rightDepth ? leftDepth : rightDepth;
    }
    return findLongest(currentNode);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let toCheck = [this.root];
    let result = null;
    while (toCheck.length && toCheck[0]) {
      let current = toCheck.pop();

      if (!result) {
        if (current.val > lowerBound) result = current.val;
      } else if (current.val > lowerBound && current.val < result) {
        result = current.val;
      };

      if (current.left) {
        toCheck.push(current.left);
      } 

      if (current.right) {
        toCheck.push(current.right);
      }
    }
    return result;
  }

  // /** Further study!
  //  * areCousins(node1, node2): determine whether two nodes are cousins
  //  * (i.e. are at the same level but have different parents. ) */

  // areCousins(node1, node2) {

  // }

  // /** Further study!
  //  * serialize(tree): serialize the BinaryTree object tree into a string. */

  // static serialize() {

  // }

  // /** Further study!
  //  * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  // static deserialize() {

  // }

  // /** Further study!
  //  * lowestCommonAncestor(node1, node2): find the lowest common ancestor
  //  * of two nodes in a binary tree. */

  // lowestCommonAncestor(node1, node2) {
    
  // }
}

module.exports = { BinaryTree, BinaryTreeNode };
