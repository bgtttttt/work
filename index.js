const wrapper = document.getElementById('wrapper');
const wrapperI = document.getElementById('wrapper-info');

async function temp() {
    let pr = await fetch(`https://api.weatherapi.com/v1/current.json?key=6c1f86ac60b843448eb145323242312&q=Minsk`);
    let a = await pr.json();
    console.log(a)

    wrapperI.children[0].innerHTML = a.current.temp_c +'°C';
}
async function course() {
    let pr = await fetch('https://api.nbrb.by/exrates/currencies');
    let a = await pr.json();

    let usd = a[a.map(function(o) { return o.Cur_Abbreviation; }).lastIndexOf("USD")];
    let usd_pr = await fetch(`https://api.nbrb.by/exrates/rates/${usd.Cur_ID}`);
    let usd_byn = (await usd_pr.json()).Cur_OfficialRate;
    
    wrapperI.children[1].innerHTML=Math.floor(usd_byn*100)/100
}
function init() {temp(); course();}

document.addEventListener('DOMContentLoaded', () => init())

document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        addTask(taskText);
        todoInput.value = '';
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        todoList.appendChild(li);

        const editButton = li.querySelector('button.edit');
        const deleteButton = li.querySelector('button.delete');
        const taskSpan = li.querySelector('span');

        editButton.addEventListener('click', () => {
            li.classList.add('editing');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskSpan.textContent;
            li.replaceChild(input, taskSpan);
            input.focus();

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.classList.add('save');
            li.querySelector('.buttons').appendChild(saveButton);

            saveButton.addEventListener('click', () => {
                const newText = input.value.trim();
                if (newText === '') return;

                taskSpan.textContent = newText;
                li.replaceChild(taskSpan, input);
                li.classList.remove('editing');
                li.querySelector('.buttons').removeChild(saveButton);
            });
        });

        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });
    }
});
