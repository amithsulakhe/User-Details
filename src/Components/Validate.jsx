export const checkValidateform=(email,pass)=>{
    const isemail=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    if(!isemail) return "Enter a valid Email";
    return null

}