import './appLogic.js'

export function saveData(projects){
    const storage = JSON.stringify(projects)
    localStorage.setItem('todoProjects', storage)
}

export function loadData(){
    let data = localStorage.getItem('todoProjects')
    if(data != null){
       return JSON.parse(data)
    } else{
        return null
    }
}