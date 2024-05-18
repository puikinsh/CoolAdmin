const { verifyEmail } = require("../authentication");

(async ()=>{
    document.addEventListener('DOMContentLoaded', () => {
        const verifyButton = document.getElementById("verify-mail");
        if (verifyButton) {
            verifyButton.addEventListener('click', async (e) => {
                e.preventDefault();
                await verifyEmail() 
                alert("Email has been verified")               
            });
        }
    })
})()