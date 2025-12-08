export default function add(a,b){
    return a+b;
}

//promise:fetching api
//async/await
//async function getpost(){}



async function loadCourses(){
    const res= await fetch("https://jsonplaceholder.tyicode.com/posts")
    .then((res)=>res.json())
}
