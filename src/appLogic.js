import { project } from './project.js'

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