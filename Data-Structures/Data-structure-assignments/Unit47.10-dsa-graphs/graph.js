const Stack = require("./stack.js");
const Queue = require("./queue");

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vert of vertexArray) {
      this.addVertex(vert);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!v1.adjacent.has(v2)) v1.adjacent.add(v2);
    if (!v2.adjacent.has(v1)) v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2)) v1.adjacent.delete(v2);
    if (v2.adjacent.has(v1)) v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let current = start;
    const seen = new Set([start]);
    const nodes = [current.value];
    const searchStack = new Stack();
    searchStack.push(current);
    while (searchStack.size) {
      current = searchStack.pop()
      if (current.adjacent.size) {
        for (let neighbor of current.adjacent) {
          if (!seen.has(neighbor)) searchStack.push(neighbor);
        }
      }
      if (!seen.has(current)) nodes.push(current.value);
      seen.add(current);
    }

    console.log('nodes: ', nodes);
    return nodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let current = start;
    const seen = new Set([start]);
    const nodes = [current.value];
    const searchQueue = new Queue();
    searchQueue.enqueue(current);
    while (searchQueue.size) {
      current = searchQueue.dequeue()
      if (current.adjacent.size) {
        for (let neighbor of current.adjacent) {
          if (!seen.has(neighbor)) searchQueue.enqueue(neighbor);
        }
      }
      if (!seen.has(current)) nodes.push(current.value);
      seen.add(current);
    }

    console.log('nodes: ', nodes);
    return nodes;

  }
}

module.exports = {Graph, Node}