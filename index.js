const clearBtn = document.querySelector('[data-clear]');
const container=document.querySelector('.container');
const closeModalBtn= document.querySelector('[data-close-modal]')
const modal=document.querySelector('.modal')
const openModalBtn=document.querySelector('[data-open-modal]')
const form=document.querySelector('.modal form')
const date=document.querySelector('[data-date]')
let initialBoxSize= parseInt(localStorage.getItem('numberOfSides'))``;
let boxes , pointerDown= false;
// container.addEventListener('pointerdown',()=>{ pointerDown=true})
// container.addEventListener('pointerup',()=>{ pointerDown=false})
// document.body.addEventListener('pointerup',()=>{ pointerDown=false})
date.textContent= `${ new Date().getFullYear()}`
addSketchPadOnLoad(initialBoxSize);
alert('g')

// global functions 
function addListener(nodes){
    nodes.forEach(node=>{
        node.addEventListener('pointerover',()=>{
            // if (!pointerDown) return
            let passes= parseInt(node.getAttribute('data-pass'))
            if(passes >= 10) return
            passes++
            node.setAttribute('data-pass',`${passes}`)
            node.style.backgroundColor=setColor(passes);
        })
    })
};
function addSketchPadOnLoad(initial){
    removeSkecthPad()
    const numSide=initial;
    const sketchPad= document.createElement('div')
    sketchPad.setAttribute('class','container__sketchpad')
    sketchPad.style.gridTemplateColumns=  `repeat(${numSide},1fr)`
    sketchPad.style.gridAutoRows= `repeat(${numSide},1fr)`
    for(i=0;i<numSide**2;i++){
        const box=document.createElement('div')
        box.setAttribute('class','box')
        box.setAttribute('data-pass','0')
        sketchPad.appendChild(box)
    }
    container.appendChild(sketchPad)
    boxes=container.querySelectorAll('[data-pass]')
    addListener(boxes)
}
function rand(min=0,max){
    max ?? 360;
    return Math.floor(Math.random()*(max - min)) + min;
}
function setColor(l){
    const hue=rand(0,360)
    const saturation= (x)=>{
        const min= (x-1) * 10
        const max= x * 10
        return rand(min,max)
    }
    return `hsl(${hue}, ${saturation(l)}%, ${(10 - l) * 10}%)`
}
function erase(){
    boxes.forEach(box=>{
        let passes= parseInt(box.getAttribute('data-pass'))
        if(passes <= 0) return
        passes--
        box.setAttribute('data-pass',`${passes}`)
        box.style.backgroundColor=setColor(passes);
    })
}
function createSketchPad(val){
    const numSide=val
    const sketchPad= document.createElement('div')
    sketchPad.setAttribute('class','container__sketchpad')
    sketchPad.style.gridTemplateColumns=  `repeat(${numSide},1fr)`
    sketchPad.style.gridAutoRows= `repeat(${numSide},1fr)`
    for(i=0;i<numSide**2;i++){
        const box=document.createElement('div')
        box.setAttribute('class','box')
        box.setAttribute('data-pass','0')
        sketchPad.appendChild(box)
    }
    return sketchPad
}
function addSketchPad(val){
    removeSkecthPad()
    const sketchpad=createSketchPad(val)
    container.appendChild(sketchpad)
    boxes=container.querySelectorAll('[data-pass]')
    addListener(boxes)
}
function removeSkecthPad(){
    container.innerHTML=''
}

// program flow


clearBtn.addEventListener('click',()=>{
    boxes.forEach(box=>{
        box.setAttribute('data-pass','0')
        box.style.backgroundColor=setColor(0)
    })
})
closeModalBtn.addEventListener('click',()=>{
    modal.classList.remove('active')
})
openModalBtn.addEventListener('click',()=>{
    modal.classList.add('active')
})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const inputVal=parseInt(e.target.querySelector('input').value)
    if(isNaN(inputVal)) return
    modal.classList.remove('active')
    localStorage.setItem('numberOfSides',`${inputVal}`)
    e.target.querySelector('input').value=''
    addSketchPad(inputVal)
})

