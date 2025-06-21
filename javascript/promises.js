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

