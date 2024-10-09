import { todoInit } from "./components/todo-item/index.ts";
import { cardsInit } from "./pages/form.ts";
import { state } from "./state";



(function main(){
    cardsInit();
    todoInit();
})()
const formEl = document.querySelector('.form__form');

formEl?.addEventListener('submit', (e)=>{
    e.preventDefault()
   
    const tarea = {
        tarea : e.target?.valor.value,
        id: crypto.randomUUID(),
        estado : false
    }
    const newState = state.getState();
    newState.push(tarea)
    state.setState(newState)
})
