import axios from "axios";
import { URL_MS_GOOGLE } from "../secrets";
import { getSessionTokensWithRefresh } from "./authentication";

(async function($){
    try {
        document.getElementById('gmail-auth').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("hola")

            await refreshAndGetTokens()
            // const {data} = await axios.get({url:`${URL_MS_GOOGLE}/google-auth-webhook`, headers:{
            //     accessT: localStorage.getItem('AccessToken'),
            //     refreshT: localStorage.getItem('RefreshToken'),
            //     idT: localStorage.getItem('IdToken'),
            // }})
            // console.log(data)
        })
    } catch (error) {
        console.log(error);
    }
})()