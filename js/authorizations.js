import axios from "axios";
import { URL_MS_GOOGLE, X_API_KEY } from "../secrets";
import { getUserInfo, refreshAndGetTokens } from "./authentication";

(async function($) {
    try {
        document
            .getElementById("gmail-auth")
            .addEventListener("submit", async (e) => {
                e.preventDefault();

                await refreshAndGetTokens();
                const { data } = await axios.get(
                    `${URL_MS_GOOGLE}/google-auth-webhook`,
                    {
                        headers: {
                            "x-api-key": X_API_KEY,
                        },
                    }
                );

                if (data.url) {
                    window.open(data.url, "_blank"); // Redirige al usuario a la URL de Gmail
                } else {
                    console.error(
                        "URL de Gmail no encontrada en la respuesta",
                        data
                    );
                }
            });
        const button = document.getElementById("gmailButton");

        if (button) {
            const info = await getUserInfo();
            if (info.gmailAuthorization) {
                button.innerHTML = "GMAIL AUTHORIZED";
            }
        }
    } catch (error) {
        console.log(error);
    }
})();
