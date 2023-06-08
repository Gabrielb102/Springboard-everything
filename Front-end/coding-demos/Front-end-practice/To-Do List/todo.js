const todoform = document.querySelector("#todoform");
const ul = document.querySelector("ul");
var list = [];
let storage = JSON.parse(localStorage.getItem("yourList"))
console.log(storage);
list = list.concat(storage);

if (list.length > 0) {
    for (let item of list) {
    createTodo(item);
    }
}

function createTodo(newItem) {
    let task = document.createElement("li");
    let label = document.createElement("label");
    label.innerText = newItem;
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.id = "done";
    let clearBtn = document.createElement("button");
    clearBtn.innerText = "Clear";
    clearBtn.id = "clear";
    task.appendChild(label);
    task.appendChild(doneBtn);
    task.appendChild(clearBtn);
    ul.appendChild(task);
}

todoform.addEventListener('submit', function(e) {
    e.preventDefault();
    const newtodo = document.querySelector("#newtodo");
    list.push(newtodo.value);
    createTodo(newtodo.value);
    newtodo.value = '';
    localStorage.setItem('yourList', JSON.stringify(list));
})

ul.addEventListener('click', function(e){
    if (e.target.id === 'done') {
        e.target.parentElement.classList.toggle("done");
    } 
    if (e.target.id === 'clear') {
        e.target.parentElement.remove();
        let indexToClear = list.indexOf(e.target.previousSibling.previousSibling.innerText);
        //console.log("indexToClear: " + indexToClear);
        list.splice(indexToClear, 1);
        //console.log("list: " + list)
        localStorage.setItem('yourList', JSON.stringify(list));
    }
});