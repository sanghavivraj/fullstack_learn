# JavaScript


### difference
    -browser VS terminal run  js
        -in the browser , most of the time we are doing the interact with the dom and other web platform  Api likes cookies , you don't have the document, windows and all other objects that are the provides by the browser.  
    
    -node.js/terminal run js
        -node.js is the browser less enviorment where there are no preview of the document,window and browser Api are not available.  
        -node.js is basically used for the backend development and Api building and all. 

### DOM (Document object model) 
         -it's like tree where the componet is used or work in step by step.  


## HTML vs HTML5
![alt text](image.png)


## browser events
    -innerText and innerContent   
        -innertext:only show thecontent which are in the tag  
        - where the innercontent show all the tect which we can hide from the tag  
        -innerHTML: give all the valueinclude the tag also 

## copy  
    -shallow Copy  
        - it copy the orginal content and  laos chnage the orignal content when we can chnage anythin in the copy.  
    -deep Copy
        -it also change the content but in the copy text not in the origanl content
    

## Array  
    -slice or splice  
        - slice give the indexvalue of the first not last for rxample the array has 5 values [1,2,3,4,5] so the slice has the value(1,3) to it give the value of [1,2] not give the index3 value.  
        - splice give the [1,2,3] value and also manuplate the origanl array also for example, the array is [1,2,3,4,5] so the splice give the [1,2,3] and the orignal array is[4,5] only becuase the splice manuplate the orginal array also.

## closur  
    -means the function inside function means the inner function is access all the properities of the outerfunction.

```js
// colsur
    function member1()
     {
        firstname ="member1";

        function member2()
        {  secondname="driv"  
            console.log(firstname);

            function member3()
            {
                console.log(secondname);
            }

            member3()
            
        }
        member2()
    }

    member1()

```
## fibonacci  

```js 
function febo(n)
{
    let a=0, b=1, result =[];

    for(i=0;i<n;i++)
    {
        result.push(a);
        let temp=a+b;
        temp=a+b;
        a=b;
        b=temp;
    }
    console.log("result : ",result.join(" "));
    
}
febo(8);
```
    -push() methos which is used to push the value into the array.  
    -join() method is used to get answer in the string.  

## factorial  
```js
function fact(n)
{
    if(n==0 || n==1) return 1;
    return n*fact(n-1); //recursion
}

console.log("factorial is :",fact(7));

```
    -Recursion is a programming technique where a function calls itself in order to solve a problem.

### Recursive Palindrome Check
```js
    // Recursive Palindrome Check (Ignore Non-Alphabet)
    // 👉 Check if a string is a palindrome ignoring spaces, punctuation, and cases using recursion.

    // Example Input: "A man, a plan, a canal: Panama"
    // Expected Output: true

    function plain(str)
    {
        let cleanstr="";
        for(i=0;i<str.lenght;i++)
        {
            let ch = str[i].toLowerCase();
            if(ch >='a' && ch <='z')
            {
                cleanstr += ch;
            }
        }

    // strat=str[0], end=str.lengh
    function check(start,end)
    {
        if(start>=end) return true;
        if(cleanstr[start]!=cleanstr[end]) return false;
        return check(start+1,end-1);
    }
        const ischeck =check(0,cleanstr.length -1);
        if(ischeck)
        {
            console.log("this string is plaindrom :",str);
                
        }
        else{
            console.log("this string is not palindrom:",str);
            
        }
        return ischeck;
    }
    

    console.log(plain("A man, a plan, a canal: Panama"));
```



##  regex and proto or protype

### Regex  
    -if we should change the similar words which are occure in the string more then two times then we use the regex=/very/g.   so in this ve can change very to bro.
    -for exmaple, str= very very good you are in your work.  
    -console.log(text.replace(regex, "fantom")).  

    -If we want to replace or delete the whit space then we used the (/\s/g, "")
    - test() method which is used to check whether string match the pattern or not.  
        -For exmaple, str="/hello/"  
        -console.log(str.test("hello world)) //true.  
        -console.log(str.text("hi vraj")) //false.    
    -match() methos is used to check the string which are match with pattern or not but there is diffrence in the test and match method is that the match method give whole array as answer like the string in which index and all at the same time the text give only true or flase value.
    
### prototype
    -prototype is like a shared place where you put common things (like methods or features), and every object you create can use those features.  
```js
function toy(name)
{
    this.name=name;
}

toy.prototype.body = function() 
{
    console.log("hi i am body of" + this.name);
    
};

let car= new toy("car");
car.body();
```  

### proto
    -it's build in methos which is ude in the object and it connect he object in to onothere object.

```js
//__proto__
let animal= {
    eats:true
};

let rabbit = {
    jumps:true
};

rabbit.__proto__=animal;

console.log(rabbit.jumps);
console.log(rabbit.eats);
```

## TypeScript
    -Typescript is basically a superset for the javascript.   
    -It also include the extra feature.  
    -Type safety it allows you to specify data types.

## Events IN JavaScript 
    -there are many type of evetns in the js and there are also diffrent style to write it.  
        -First is you can add directly in the html div tag that onclick="alear('owl').  
        -Second is you can add in thescript tag.  
        -Third is use eventListener.  
            -The third perameter is called event propogation. and the false is called event bubbleing and the true one is called event capuraching

```html
    <!-- first way -->
    <li><img widht=200px id='owl' src="https://imgs.search.brave.com/dnmDc5CEO5KeHJ7R3CYh-RoCbFLlNRN1ph9BP_Q0Uxw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vaWdVTF9i/X202Yy01ZWw1LU1s/dnJ0d1ozd3JVNVNL/TkVxUFF0REFnQ1Qw/SS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVuWlhS/MGVXbHRZV2RsL2N5/NWpiMjB2YVdRdk5q/YzAvT1RrME9EVTRM/M0JvYjNSdi9MM2Rv/YVhSbExXOTNiQzVx/L2NHY19jejAyTVRK/NE5qRXkvSm5jOU1D/WnJQVEl3Sm1NOS9k/MGRHVlVod2NsQndi/ek56L1NrSjFYMGs1/VlRCQ1ltUTEvWlhF/d1dGazVkRjk2ZUdj/dC9lRlZMY3poMWN6/MA.jpeg" alt=""></li>

    <!-- second way -->
     <script>
        document.getElementById('owl').onclick=function(){
            alert("owl is clicked")
        }
     </script>

     <!-- Third way -->
      <script>
        document.getElementById('owl').addEventListener('click',function(){
            alert("owl click again")
        },flase)//this three pereameter is important in eventlistener
     </script>
```
    

 ## what is npm and nvm 
    -NVM(node version manager)
        -NVM helps you to insatll and switch betweeen difference version of the Node.js on your ssytem.  
        -Useful if you work on multiple projects that need different Node versions.
        -Example, Project A uses Node.js v14   
                Project B uses Node.js v18  
    
    -NPM(node package manager)
        -NPM is a tool used to install packages (libraries) in your project.  
        -When you install Node.js, NPM is automatically included.
                

## Ayschronous and Synchronous
    -Asychronous means the code will not be excuted in the proper format.means wehave no idea about the stpes like which part of the code will be excuted first.  
    -sychronous means the code will be excuted in the proper format means we have idea that which part of the code first excute and whihc after that.



## Promise
    -it is also create with the new key word and we used it as the arrow function.  
    =Also we use the then and catch for the promise.  
 ```js
        function fetchdata(){
    return new Promise ((resolve,reject)=> {
        setTimeout(()=>{
            let success = false;
            if(success){
                resolve("data fetch suceessfully")
            }
            else{
                reject("data should be failed to featch");
            }
        },3000);
    })
}


fetchdata()
    .then((data)=>{console.log(data);
    })
    .catch((error)=>{console.log(error);
    })

```

###  ARIA (Accessible Rich Internet Applications).
    -This is the method od the addeventlistener where we can use for gatting the maximum value from the ARIA attribute.  
    example:- ariaValueMax.trim()where we use this to get value and the trim is used to remove the extra space from the string.

## LocalStroage:- 
    -This is the very important as a stroage becuase we use this to store som eitems with the help of this.  
    -this is the prebulit function which havascript provide us .  
    -When we use the localstroage we only type the name of the local stroage so it's enable the api automatically.




<!-- packages for node and react  -->
<!-- node concept, react concepts -->






<!-- database type of ket arcthiure, index advance feature ,triger -->
 


