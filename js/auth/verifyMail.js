const { verifyEmail, getUserInfo } = require("../authentication");

(async () => {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const info = await getUserInfo();
            const verifyButton = document.getElementById("verify-mail");
            if (info.email_verified) {
                verifyButton.hidden = true;
            }
            if (verifyButton) {
                verifyButton.addEventListener("click", async (e) => {
                    e.preventDefault();
                    await verifyEmail();
                    alert("Email has been verified");
                    location.reload();
                });
            }
        } catch (error) {
            if (
                error.message ==
                "User needs to be authenticated to call this API."
            ) {
                window.location.href = "/login.html";
            }
        }
    });
})();
