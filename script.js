const toDOinput = document.querySelector("#form-container > .TodoInput > form > #todo-Text");
const toDoItems = document.getElementById("created-list");
const createdlistLI = document.querySelector("#created-list > ul > li")
const toDObtn = document.getElementById('todo-btn');
const forms = document.querySelector('form')
forms.addEventListener('input', (e) => {
    e.preventDefault()
})

let inputvalue;

function makeTodo() {
    inputvalue = toDOinput.value;
    const createEle = document.createElement('li');
    createEle.textContent = toDOinput.value;
    toDoItems.appendChild(createEle);

    if (inputvalue === '') {
        Swal.fire({
            title: "Error",
            text: "شما اول باید کار مورد نظر رو وارد کنید",
            icon: "error"
        });
        createEle.remove();
        return;
    }

    createEle.addEventListener('click', () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "! کارت با موفقیت انجام شد",
            showConfirmButton: false,
            timer: 1500
        });
        createEle.remove();

        let todos = JSON.parse(localStorage.getItem("TodoListItems")) || [];
        const taskIndex = todos.indexOf(createEle.textContent);
        if (taskIndex > -1) {
            todos.splice(taskIndex, 1);
            localStorage.setItem("TodoListItems", JSON.stringify(todos));
        }
    });

    let todos = JSON.parse(localStorage.getItem("TodoListItems")) || [];
    todos.push(inputvalue);
    localStorage.setItem("TodoListItems", JSON.stringify(todos));
    toDOinput.value = '';
}


toDObtn.addEventListener('click', makeTodo)

window.addEventListener('load', () => {
    let todos = JSON.parse(localStorage.getItem("TodoListItems")) || []
    todos.forEach(element => {
        const createEle = document.createElement('li')
        createEle.textContent = element
        toDoItems.appendChild(createEle)

        createEle.addEventListener('click', () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "! کارت با موفقیت انجام شد",
                showConfirmButton: false,
                timer: 1500
            });
            createEle.remove();
            localStorage.removeItem("TodoListItems", todos)
        })
    });
});



// powered by "Hossein khashaypour"