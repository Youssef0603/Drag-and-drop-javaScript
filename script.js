const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', ()=>{
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover',(e) => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY) 
        const draggable = document.querySelector('.dragging')
        if(afterElement == null){
            container.appendChild(draggable)
        }else{
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y){
    //not get the element we are dragging just get the rest
   const draggableElemtns = [...container.querySelectorAll('.draggable:not(.dragging)')]

   return draggableElemtns.reduce((closest, child ) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2 
    //offset < 0 mean that we are hovering above that element we want to replace
    if(offset < 0 && offset > closest.offset){
        return {offset: offset, element: child}
    }else{
        return closest
    }
   },{offset: Number.NEGATIVE_INFINITY}).element

}