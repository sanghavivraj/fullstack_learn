//Dom manupulation 



// get the element    event listening


//exmaple 1

document.getElementById("ChangeTextButton").
addEventListener('click',function() {
       let paragrh = document.getElementById("myParagraph");
       paragrh.textContent="the paragraph is changed"
       
        
    })


//example 2

document.getElementById("highlightFirstCity").
addEventListener('click',function (){
   let citiesList= document.getElementById('citiesList');
   citiesList.firstElementChild.classList.add("highlight")
})

//example 3
document.getElementById("changeOrder").
addEventListener('click',function (){
    let coffeeType = document.getElementById("coffeeType");
    coffeeType.textContent="Espresso";
    coffeeType.style.backgroundColor="red"
})


//exmaple4
document.getElementById("addNewItem").
addEventListener("click",function(){
    let newItem = document.createElement('li')
    newItem.textContent="Milk"
    document.getElementById('shoppingList').appendChild(newItem)
    
})


//exmaple 5
document.getElementById("removeLastTask").
addEventListener("click",function(){
    // let removeLastTask=document.removeChild
    let taskList = document.getElementById("taskList");
    taskList.lastElementChild.remove()
})


//example 6
document.getElementById("clickMeButton").
addEventListener('dblclick',function(){
    alert("hello")
})

//exmaple 7

document.getElementById("teaList").
addEventListener("click",function(event){
    if(event.target){
        alert("you selected: "+event.target.textContent);
    }
    
})


// // example 8

// document.getElementById("feedbackDisplay").addEventListener
// ("submit",function(event){
//     event.preventDefault();
// })