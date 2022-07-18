let boxes ;
const clearBtn = document.querySelector('[data-clear]');
const container=document.querySelector('.container');
const closeModalBtn= document.querySelector('[data-close-modal]')
const modal=document.querySelector('.modal')
const openModalBtn=document.querySelector('[data-open-modal]')
const form=document.querySelector('.modal form')
const randomBtn=document.querySelector('[data-rainbow]')
const indicator = document.querySelector('[data-color-indicator]')
const buttons={
     erase  :document.querySelector('[data-color="erase"]'),
     gray   :document.querySelector('[data-color="gray"]'),
     blue   :document.querySelector('[data-color="blue"]'),
     green  :document.querySelector('[data-color="green"]'),
     red    :document.querySelector('[data-color="red"]'),
     aqua  :document.querySelector('[data-color="aqua"]'),
    //  black  :document.querySelector('[data-color="black"]'),
     gold  :document.querySelector('[data-color="gold"]'),
     darkred  :document.querySelector('[data-color="darkred"]'), 
     darkblue  :document.querySelector('[data-color="darkblue"]'),
     darkgreen  :document.querySelector('[data-color="darkgreen"]'),
     orange  :document.querySelector('[data-color="orange"]'),
     purple  :document.querySelector('[data-color="purple"]'),
     khaki  :document.querySelector('[data-color="khaki"]'),
     indigo  :document.querySelector('[data-color="indigo"]'),
     brown  :document.querySelector('[data-color="brown"]'),
     blueviolet  :document.querySelector('[data-color="blueviolet"]'),
     hotpink  :document.querySelector('[data-color="hotpink"]'), 
     peru  :document.querySelector('[data-color="peru"]'),
     royalblue  :document.querySelector('[data-color="royalblue"]'),
     tomato  :document.querySelector('[data-color="tomato"]'),
     teal  :document.querySelector('[data-color="teal"]'),
     lightblue  :document.querySelector('[data-color="lightblue"]'),
     chartreuse  :document.querySelector('[data-color="chartreuse"]'),
     firebrick  :document.querySelector('[data-color="firebrick"]'),
     darkcyan  :document.querySelector('[data-color="darkcyan"]'),
     mediumspringgreen  :document.querySelector('[data-color="mediumspringgreen"]')
}

const colorMode={
    gray: true,
    rainbow:false,
    red:false,
    green:false,
    blue:false,
    erase:false,
    aqua:false,
    black:false,
    gold:false,
    darkred:false,
    darkblue:false,
    darkgreen:false,
    orange:false,
    purple:false,
    khaki:false,
    indigo:false,
    brown:false,
    blueviolet:false,
    hotpink:false,
    peru:false,
    royalblue:false,
    tomato:false,
    teal:false,
    lightblue:false,
    chartreuse:false,
    firebrick:false,
    darkcyan:false,
    mediumspringgreen:false
}

const colors = {
    gray    : '2,2,2',
    red     : '255,0,0',
    green   : '0,255,0',
    blue    : '0,0,255',
    gray    : '128, 128, 128',
    aqua    : '0, 255 ,255',
    black   : '0, 0, 0',
    gold    : '255, 215, 0',
    darkred : '139, 0, 0',
    darkblue: '0, 0, 139',
    darkgreen:'0, 139, 0' ,
    orange  : '255, 165, 0',
    purple  : '128, 0, 128',
    khaki   : '240, 230, 140',
    indigo  : '75, 0, 130',
    brown   : '165, 42, 42',
    blueviolet: '138, 43, 226',
    hotpink : '255, 105, 180',
    peru    : '205, 133, 63',
    royalblue: '65, 105, 225',
    tomato  : '255, 99, 71',
    teal    : '0, 128, 128',
    lightblue: '173, 216, 230',
    chartreuse: '127, 255, 0',
    firebrick: '178, 34, 34',
    darkcyan: '0, 139, 139',
    mediumspringgreen : '0, 250, 154'
}

const sides = (() =>{
    const getUserPrefferedSides=(e)=>{
        const inputVal=parseInt(e.target.querySelector('input').value)
        if(isNaN(inputVal)) return
        modal.classList.remove('active')
        localStorage.setItem('numberOfSides',`${inputVal}`)
        e.target.querySelector('input').value=''
        return inputVal;
    }
    const getPrevSides= () =>{
        let initialBoxSize= parseInt(localStorage.getItem('numberOfSides')) || 16;
        return initialBoxSize
    }
    return {getUserPrefferedSides,getPrevSides}
})();

const sketchpad = (()=>{
    let pointerMode = 'up';
    document.body.addEventListener('pointerdown', (e)=> {
    pointerMode = 'down'
})
    window.addEventListener('pointerup', (e)=> {
    pointerMode = 'up'
})
    const create=(val)=>{
            const numOfSide=val
            const sketchPad= document.createElement('div')
            sketchPad.setAttribute('class','container__sketchpad')
            sketchPad.style.gridTemplateColumns=  `repeat(${numOfSide},1fr)`
            sketchPad.style.gridAutoRows= `repeat(${numOfSide},1fr)`
            for(i=0;i<numOfSide**2;i++){
                const box=document.createElement('div')
                box.setAttribute('class','box')
                box.setAttribute('data-pass','0')
                sketchPad.appendChild(box)
            }
            return sketchPad
    };
    const remove = ()=> {
        container.innerHTML=''
    };
    const add=(val)=>{
        remove()
        const sketchpad=create(val)
        container.appendChild(sketchpad)
        boxes=container.querySelectorAll('[data-pass]')
            boxes.forEach(box=>{
                    box.addEventListener('pointerover',(e)=>{
                        if(pointerMode === 'down' || e.ctrlKey === true){
                            if(colorMode.erase === true){
                                draw.erase(box);
                            } else {
                            let colorVal;
                            for (const color in colorMode) {
                                if (Object.hasOwnProperty.call(colorMode, color)) {
                                    if (colorMode[color] === true){
                                        const val = `${color}`;
                                        colorVal = val
                                    }
                                }
                            }
                            draw.paint(colorVal, box)
                        }
                        } else if(e.altKey === true){
                            draw.erase(box);
                        } else {
                            return
                        }
                    }
                )
            })
            colorMode.erase= false
        };
    const addOnLoad=(initial)=>{
            add(initial)
    }
    return {
        create,
        add,
        addOnLoad
        }
})()

const draw =(()=>{
    const setRandColor = (l) => {
        const hue=rand(0,360)
        const saturation= (x)=>{
            const min= (x-1) * 10
            const max= x * 10
            return rand(min,max)
        }
        return `hsl(${hue}, ${saturation(l)}%, ${(10 - l) * 10}%)`
    };
    const setLinearColor = (l,baseColor) => {
        return `rgba(${baseColor}, ${l / 10})`
    };
    const rand = (min=0,max) => {
        max ?? 360;
        return Math.floor(Math.random()*(max - min)) + min;
    };
    const paint = (color,box) =>{
        let passes= parseInt(box.getAttribute('data-pass'))
        if(passes >= 10) return;
        passes++
        box.setAttribute('data-pass',`${passes}`)
        const testColor = setLinearColor(passes, colors[color]);
        box.style.backgroundColor = `${testColor}`;
    }
    const  erase = (box) => {
        let passes= parseInt(box.getAttribute('data-pass'))
        if(passes <= 0) { passes = 0 }
        const baseColor=box.style.backgroundColor;
        const first = baseColor.indexOf('(')
        const last = baseColor.indexOf(')')
        const baseColorVal = baseColor.substring(first + 1, last)
        let RGBA = baseColorVal.split(',')
        if (RGBA.length === 3){
            RGBA.push("0.9")
        } else {
            let opacity = RGBA.pop()
            opacity = Number(opacity) * 10
            opacity = (opacity - 1) / 10
            RGBA.push(`${opacity}`)
        }
        const newBaseColorVal=RGBA.join(',')
        const newBaseColor= `rgba(${newBaseColorVal})`
        box.style.backgroundColor= newBaseColor;
        if(passes < 1) return;
        box.setAttribute('data-pass',`${passes - 1}`)
        };
    const clear = () =>{
        boxes.forEach(box=>{
            box.setAttribute('data-pass','0')
            box.style.backgroundColor=setLinearColor(0)
        })
    }
    return {setLinearColor,clear,setRandColor,paint,erase}
})()

document.addEventListener('load',sketchpad.addOnLoad(sides.getPrevSides()))

clearBtn.addEventListener('click',
    draw.clear
)

closeModalBtn.addEventListener('click',()=>{
    modal.classList.remove('active')
})

openModalBtn.addEventListener('click',()=>{
    modal.classList.add('active')
    form.querySelector('[data-input]').focus()
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const inputVal=sides.getUserPrefferedSides(e)
    sketchpad.add(inputVal)
})

buttons.erase.addEventListener('click',
    ()=>{
        colorMode.erase = !colorMode.erase
    }
)

const UI = (function(){
    const updateColorIndicator= color =>{
        indicator.style.backgroundColor = color
    }
    const setColorMode = color => {
        for (const mode in colorMode) {
            if (Object.hasOwnProperty.call(colorMode, mode)) {
                colorMode[mode]=false;
            }
        }
        colorMode[color]=true
        updateColorIndicator(color)
    }
    return { setColorMode }
})()

for (const button in buttons) {
    if (Object.hasOwnProperty.call(buttons, button)) {
        const element = buttons[button];
        const color = element.dataset.color
        element.style.backgroundColor=color
        element.addEventListener('click', () => {
            const color = element.dataset.color
            UI.setColorMode(color)
        })
    }
}

