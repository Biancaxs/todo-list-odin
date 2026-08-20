import { project } from './project.js'
import { todo } from "./todo.js"

let projects = []

let currentProject

export function initializeApp(){
    let standardProject = project("Standard")
    projects.push(standardProject)
    currentProject = standardProject
}

export function newProjects(name){
    let newProject = project(name)
    projects.push(newProject)
    currentProject = newProject
}

export function selectProject(index){
    currentProject = projects[index]
}

export function addTask(title, description, date, priority, project, notes){
    const newTodo = todo(title, description, date, priority, notes)
    const targetProject = projects.find(p => p.name === project)
    targetProject.addTodo(newTodo)
}

export function getProjects(){
    return projects
}

export function getCurrentTodos(){
    return currentProject.todos
}