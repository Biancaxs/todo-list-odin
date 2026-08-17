export function todo(title, description, dueDate, priority, notes){
    return{
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        isComplete: false,

        toggleComplete(){
            this.isComplete = !this.isComplete
        }
    }
}

