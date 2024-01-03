const addNoteBtn = document.querySelector('#add-on');
const userInputVal = document.querySelector('#input');
const contentBox = document.querySelector('.content');


let data = '';
const addNote = () =>{
    let UserData = userInputVal.value;
    let localData = JSON.parse(localStorage.getItem('ToDoItem'));
    if(localData == '' || localData === null){
        data = data + `<div class="box">
        <label for="checklist1">
        <input type="checkbox" name="checkBox" class="check">
        </label>
        <p class="check-text">${UserData}</p>
        <button type="button" class="edit">Edit</button>
        <i class="cross fa-regular fa-circle-xmark"></i>
        </div>`;
        contentBox.innerHTML = data;
    }else{
        localData = JSON.parse(localStorage.getItem('ToDoItem'));
        let secondData = `<div class="box">
        <label for="checklist1">
        <input type="checkbox" name="checkBox" class="check">
        </label>
        <p class="check-text">${UserData}</p>
        <button type="button" class="edit">Edit</button>
        <i class="cross fa-regular fa-circle-xmark"></i>
        </div>` + localData;
        localStorage.setItem('ToDoItem' , JSON.stringify(secondData));
        contentBox.innerHTML = JSON.parse(localStorage.getItem('ToDoItem'));
    }
}

const saveNote = () =>{
    localStorage.setItem('ToDoItem' , JSON.stringify(`${contentBox.innerHTML}`))
}

const dataOnLoad = () =>{
    let localStData = JSON.parse(localStorage.getItem('ToDoItem'))
    contentBox.innerHTML = localStData;
}

addNoteBtn.addEventListener('click' , function(){
    if(userInputVal.value == ''){
        alert("Please Enter The Value")
    }else{
        addNote();
        saveNote();
    }
    userInputVal.value = '';
});

userInputVal.addEventListener('keyup' , function(e){
    if(userInputVal.value == ''){
        alert("Please Enter The Value")
    }else{
        if(e.key === 'Enter'){
            addNote();
            saveNote();
        }else{
            return;
        }
    }
    userInputVal.value = '';
});





window.addEventListener('load' , function(){
    dataOnLoad();
})


contentBox.addEventListener('click' , function(e){
    if(e.target.matches('.cross')){
        e.target.parentNode.remove()
        saveNote();
    }
})

contentBox.addEventListener('click' , function(event){
    if(event.target.matches('.check')){
        if(event.target.checked === true){
            event.target.parentNode.nextElementSibling.classList.add('check2');
            saveNote();
            JSON.parse(localStorage.getItem('ToDoItem'))
        }
        else if(event.target.checked === false){
            event.target.parentNode.nextElementSibling.classList.remove('check2');
            saveNote();
            JSON.parse(localStorage.getItem('ToDoItem'))
        }
    }
})



contentBox.addEventListener('click' , function(event){
    if(event.target.matches('.edit')){
        let result = confirm('Do You Want To Change AnyThing')
        if(result){
            let changeValue = prompt("Please Enter Correct Value");
            if(changeValue){
                event.target.previousElementSibling.innerHTML = changeValue;
                event.target.previousElementSibling.classList.remove('check2')
                saveNote();
            }else{
                return;
            }
        }else{
            return;
        }
    }
})