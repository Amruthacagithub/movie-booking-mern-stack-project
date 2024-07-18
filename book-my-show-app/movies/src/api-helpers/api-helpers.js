import axios from "axios";

export const getAllMovies = async() => {
    try{
        const res = await axios
        .get("http://localhost:5000/movie")

        if(res.status !== 200){
            return console.log("No Data");
        }
        const data = await res.data;
        return data;
    }
    catch(err){
        return console.log(err);
    }

}

export const sendUserAuthRequest = async(data,signup) =>{
    try{
        const res = await axios
        .post(`http://localhost:5000/user/${signup? "signup":"login"}`, {
        name: signup? data.name:"",
        email: data.email,
        password: data.password,
    })
    if(res.status !== 200 && res.status !== 201){
        return console.log("Unexpected Error");
     }
     const resData = await res.data;
     return resData;
       
    }
    catch(err){
        return console.log(err);
    }
   
}
    
export const sendAdminAuthRequest = async(data) => {
    try{
        const res = await axios
        .post("http://localhost:5000/admin/login", {
            email: data.email,
            password: data.password,
        })

        if(res.status !== 200){
            return console.log("Unexpected Error");
        }

        const resData = await res.data;
        return resData;
    }
    catch(err){
        return console.log(err);
    }
}