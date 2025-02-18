document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function (event) {
        let phone = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (phone.length > 10) phone = phone.slice(0, 10); // Enforce 10-digit limit

        let formattedPhone = "";
        if (phone.length > 6) {
            formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");
        } else if (phone.length > 3) {
            formattedPhone = phone.replace(/(\d{3})(\d{0,3})/, "$1-$2");
        } else {
            formattedPhone = phone;
        }

        event.target.value = formattedPhone;
    });

    phoneInput.addEventListener("keypress", function (event) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault(); // Prevents typing non-numeric characters
        }
    });

    phoneInput.addEventListener("paste", function (event) {
        event.preventDefault();
    });
});
