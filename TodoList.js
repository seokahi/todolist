const todo_input = document.getElementById('todo-input');
const todo_button = document.getElementById('todo-button');
const todoList = []


function loadList() {
    const list = window.localStorage.getItem('todolist');
    if(list.length !=0 ){
        const list2 = list.split(",").filter(function(item){return item !==''});
        for(i=0;i<list2.length;i++) {
            createui(list2[i]);
            todoList.push(list2[i]);
        }
    }

}
function delteList(event) {
    const parentElement  = document.getElementById('todos'); 
    const value = event.target.parentElement.parentElement.children[0].textContent;
    console.log(todoList)
    const index = todoList.indexOf(value);

    todoList.splice(index,1);
    console.log(parentElement);
    parentElement.removeChild(parentElement.childNodes[index]);
    window.localStorage.setItem('todolist',todoList);
}

function modifyList(event) {
    const parentElement  = document.getElementById('todos'); 
    const value =  event.target.parentElement.parentElement.children[0].textContent;
    const new_value = value.replace('deletemodify','');
    const index = todoList.indexOf(new_value);

    const new_content = prompt('할 일을 입력해주세요');
    parentElement.childNodes[index].childNodes[0].textContent = new_content;
    todoList[index] = new_content;
    window.localStorage.setItem('todolist',todoList);
}

function createui(todoContent) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    const modifyButton = document.createElement('button');

    buttonContainer.setAttribute('class','button-container');
    li.id="todo";
    p.id ="todo-content";
    removeButton.id = "todo-remove";
    modifyButton.id = "todo-modify" ;
    p.textContent = `${todoContent}`
    removeButton.textContent = "delete";
    modifyButton.textContent = "modify";

    buttonContainer.appendChild(removeButton);
    buttonContainer.appendChild(modifyButton);
    li.appendChild(p);
    li.appendChild(buttonContainer);

    document.getElementById('todos').appendChild(li);

    removeButton.addEventListener('click',delteList);
    modifyButton.addEventListener('click',modifyList);
}

function createList() {
    const todoContent = todo_input.value;
    createui(todoContent)
    todoList.push(todoContent);
    window.localStorage.setItem('todolist',todoList);
    console.log(todoList);
}

function addList() {
    createList()
}


loadList()
todo_button.addEventListener('click', addList);