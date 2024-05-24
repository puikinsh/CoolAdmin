import axios from "axios";
import { URL_MS_GOOGLE, X_API_KEY } from "../secrets";
import { getUserInfo, refreshAndGetTokens } from "./authentication";

(async function($) {
    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const { tokens } = await refreshAndGetTokens();
            const { data } = await axios.get(
                `${URL_MS_GOOGLE}/google-auth-webhook`,
                {
                    headers: {
                        "X-Cognito-Auth": tokens.idToken,
                    },
                }
            );

            if (data.url) {
                openAuthorizationWindow(data.url);
            } else {
                console.error(
                    "URL de Gmail no encontrada en la respuesta",
                    data
                );
            }
        } catch (error) {
            console.error("Error to handle form:", error);
        }
    }

    function openAuthorizationWindow(url) {
        const nuevaVentana = window.open(
            url,
            "Authorizacion",
            "width=800,height=600,_blank"
        );

        const chequeoVentana = setInterval(async () => {
            if (nuevaVentana.closed) {
                clearInterval(chequeoVentana);
                await handleWindowClosed();
                location.reload();
            }
        }, 1000);
    }

    async function handleWindowClosed() {
        try {
            const button = document.getElementById("gmailButton");
            if (button) {
                const info = await getUserInfo();
                if (info.gmailAuthorization) {
                    button.innerHTML = "GMAIL AUTHORIZED";
                }
            }
        } catch (error) {
            console.error("Error to handle windwow's close", error);
        }
    }

    document
        .getElementById("gmail-auth")
        .addEventListener("submit", handleFormSubmit);
})();
