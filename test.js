
let savedResolve, savedReject;

const myPromise = new Promise((resolve, reject)=>{
    savedResolve = resolve;
    savedReject = reject;
})

myPromise
    .then((value)=>console.log("resolved", value))
    .catch((err)=> console.log("rejected", err))