import { state } from "../../state"


export function cardsInit() {

    let estado = state.getState();
    state.Suscribe(()=>{
        estado = state.getState()
        const contenedor = document.createElement('ol')
        contenedor.innerHTML = `
             ${estado.map(elemento => `
                <todo-item id="${elemento.id}" class="todo-item">${elemento.tarea}</todo-item>
             `)
            
            }
            
        `
        if(divEl.firstChild){
            console.log("FirstChild Existia y lo borro")
            divEl.firstChild.remove();
            divEl.appendChild(contenedor)
        }else{
            console.log("FirstChild no existia")
            divEl.appendChild(contenedor)
        }
    })
   
   
    const rootEl = document.querySelector('.root');
    const divEl = document.createElement('div');
    divEl.classList.add('divEl')
    const style = document.createElement('style');
    style.innerText = `
        .divEl{
             display:flex;
             flex-direction:column;
             align-items: center;
            justify-content: center;
            width:100%;
             color: black;
        }
        ol{
        width: 90%;
        }
        .todo-item{
            width: 100%;
        }
        
    `
    
   
    
    rootEl?.appendChild(style)
    rootEl?.append(divEl);
    
}