import { state } from "../../state";


export function todoInit(){
    class Todo extends HTMLElement{
        shadow = this.attachShadow({mode : "open"})
        data = state.getState()
        constructor(){
            super();
            this.render();
            
            state.Suscribe(()=>{
               this.data =  state.getState();
            })
        }
        render(){
            this.shadow.innerHTML = `
                <li class="contenedor__cards">
                    <strong class="cards__strong">${this.textContent}</strong>
                    <form class="contenedor__check-trash">
                        <input type="checkbox" id="${this.id}" class="checkboxs" name="checkbox" >
                        <button type="submit" class="boton__trash boton-none"></button>
                    </form>
                </li>
            `
            const style = document.createElement('style');
            style.textContent = `
                .contenedor__cards {
                    background-color: #FFF599; 
                    border-radius: 4px;
                    margin-top: 25px;
                    width: 100%;
                    Height: 112px;
                    display: flex;
                    justify-content: space-between;
                    align-items:start;
                    strong{
                        font-size: 18px;
                        font-weight: bold;
                        margin: 20px;
                    }
                    .tachado{
                        text-decoration: line-through;
                        text-decoration-thickness: 4px; /* Hace la línea un poco más gruesa */
                        text-decoration-color: red; /* Puedes cambiar el color también */
                         /* Sombra para simular una línea más gruesa */
                    }
                    .contenedor__check-trash{
                        display:flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        margin-right: 30px;

                        .checkboxs{
                            transform: scale(2);
                            margin: 20px
                        }
                         .checkboxs:hover{
                            transition: ease 0.5s;
                            transform: scale(2.5);
                        }
                        .boton__trash{
                            background-image: url('https://cdn-icons-png.flaticon.com/512/63/63481.png');
                            background-size: contain;
                            width: 40px; 
                            height: 40px;
                            border: none;
                            cursor: pointer;
                            background-color: transparent; 
                            padding: 0; 
                        }
                        .boton__trash:hover{
                            transition: ease 0.5s;
                            transform: scale(1.2);
                        }
                        .boton-none{
                            display: none;
                        }
                    }
                }
            `;
            this.shadow.appendChild(style)
            const checkBoxEl = this.shadow.querySelector('.checkboxs');
            checkBoxEl?.addEventListener('change', (e)=>{
                state.setComplete(e.target?.id)
                if(e.target?.checked){
                    //SI EL BOTON ESTA CHECKED MUESTRO EL TACHO Y TACHO EL TEXTO
                    const botonTrash = this.shadow.querySelector('.boton__trash');
                    botonTrash?.classList.remove('boton-none');

                    const strongEl = this.shadow.querySelector('.cards__strong');
                    strongEl?.classList.add('tachado')
                }else{
                    //SI EL CHECKED ES FALSE SACO LO TACHADO Y OCULTO EL BOTON
                    const strongEl = this.shadow.querySelector('.cards__strong');
                    strongEl?.classList.remove('tachado')

                    const botonTrash = this.shadow.querySelector('.boton__trash');
                    botonTrash?.classList.add('boton-none');
                }
            })
            //TOMO EL EVENTO, SELECCIONO EL ID Y ELIMINO LA TAREA
            const formTrashEl = this.shadow.querySelector('.contenedor__check-trash');
            formTrashEl?.addEventListener('submit', (e)=>{
                e.preventDefault();
                const tareaId = e.target.checkbox.id;
                
                const oldState = state.getState()
                const newState = oldState.filter(item => item.id !== tareaId);
                
                state.deleteState(tareaId)
            })
            
        }
        
    }
    customElements.define("todo-item", Todo);
}

