import { project } from './project.js'
import { todo } from './todo.js'
import { saveData, loadData } from './storage.js'

let projects = loadData() || []

let currentProjectIndex = 0

export function initializeApp(){
    if(projects.length === 0){
        let standardProject = project("Standard")
        projects.push(standardProject)
        currentProjectIndex = 0 
    } else{
        projects = projects.map(p => {
            const realProject = project(p.name)
            realProject.todos = p.todos
            return realProject
        })

        currentProjectIndex = 0
    }
}

export function newProjects(name){
    let newProject = project(name)
    projects.push(newProject)
    currentProjectIndex = projects.length - 1
    saveData(projects)
}

export function selectProject(index){
    currentProjectIndex = index
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
    if (!projects[currentProjectIndex]) {
        currentProjectIndex = 0
    }
    return projects[currentProjectIndex].todos 
}

export function deleteTask(taskIndex){
    projects[currentProjectIndex].todos.splice(taskIndex, 1)
    saveData(projects)
}

export function deleteProject(projectIndex){
    projects.splice(projectIndex, 1)

    currentProjectIndex = 0
    saveData(projects)
}

export function toggleTaskStatus(taskIndex){
    const toggleTask = projects[currentProjectIndex].todos[taskIndex]
    toggleTask.isComplete = !toggleTask.isComplete
    saveData(projects)
}

export function editTask(taskIndex, newTitle, newDescription, newDate, newPriority, newNotes){
    const editTodo = projects[currentProjectIndex].todos[taskIndex]
    editTodo.description = newDescription
    editTodo.date = newDate
    editTodo.priority = newPriority
    editTodo.notes = newNotes
    saveData(projects)
}

export function getCurrentProjectName() {
    if (!projects[currentProjectIndex]) {
        return "";
    }
    return projects[currentProjectIndex].name;
}

export function getCurrentProjectIndex() {
    return currentProjectIndex;
}