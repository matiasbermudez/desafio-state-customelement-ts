const state = {
    data : [],
    listeners: [],
    getState(){
        this.syncWithLS()
        return this.data;
    },
    setState(newState){
        //SINCRONIZO EL ESTADO
        this.syncWithLS();
        
        this.data = newState;
        console.log(this.data)
        //GUARDO LA DATA ACTUALIZADA EN EL LOCALSTORAGE PRIMERO BORRANDOLO
        localStorage.removeItem("tareas")
        localStorage.setItem("tareas", JSON.stringify(this.data));
        for(const cb of this.listeners){
            cb();
        }
        
    },Suscribe(callback: ()=> any){
        this.listeners.push(callback)
    },
    syncWithLS(){
        const tareasLS = localStorage.getItem("tareas");
        this.data = tareasLS ? 
                            JSON.parse(tareasLS)
                            : [];
    },
    setComplete(id:string){
        const oldState = state.getState();
        const newState = oldState.map(index => {
            if(index.id == id){
                return {...index , estado : !index.estado}
            }
            
            return index
        })
        console.log("Console new state: ",newState)
    },
    deleteState(id:string){
        console.log("Old State",this.data);
       const newState = this.data.filter( elemento => elemento.id != id);
       this.setState(newState)
    
    }

}

export { state }