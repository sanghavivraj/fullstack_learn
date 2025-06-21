document.addEventListener("DOMContentLoaded",()=> {

   const countDisplay =  document.getElementById('count')
    const decrease = document.getElementById('decrease')
    const reset = document.getElementById('reset')
    const increase = document.getElementById('increase')

    let count =0;

    function updateDisplay () {
        countDisplay.textContent=count;
    }

    increase.addEventListener('click',()=> {
        count++;
        updateDisplay();
    }) 

    decrease.addEventListener('click',()=>{
        count--;
        updateDisplay();
    })

    reset.addEventListener('click',()=>{
        count=0;
        updateDisplay();
    })
})