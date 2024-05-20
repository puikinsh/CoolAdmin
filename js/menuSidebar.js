import { getUserInfo } from "./authentication";

(async function($){
    document.addEventListener('DOMContentLoaded', async() => {
        const name = document.getElementById("name");
        if (name) {
            const response = await getUserInfo()    
            if(response) {
               name.innerHTML = `${response.name} ${response.family_name}`
            }
           
        }
    })
})()