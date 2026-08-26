import { project } from './project.js'
import { todo } from './todo.js'
import { saveData, loadData } from './storage.js'

let projects = loadData() || []

let currentProject

export function initializeApp(){
    if(projects.length === 0){
        let standardProject = project("Standard")
        projects.push(standardProject)
        currentProject = standardProject
    } else{
        projects = projects.map(p => {
            const realProject = project(p.name)
            realProject.todos = p.todos
            return realProject
        })

        currentProject = projects[0]
    }
}

export function newProjects(name){
    let newProject = project(name)
    projects.push(newProject)
    currentProject = newProject
    saveData(projects)
}

export function selectProject(index){
    currentProject = projects[index]
}

export function addTask(title, description, date, priority, project, notes){
    const newTodo = todo(title, description, date, priority, notes)
    const targetProject = projects.find(p => p.name === project)
    targetProject.addTodo(newTodo)
    saveData(projects)
}

export function getProjects(){
    return projects
}

export function getCurrentTodos(){
    return currentProject.todos
}