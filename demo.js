emailjs.init({
    publicKey: "VfYYxHS3n2o_GWKDv"
});

const form = document.getElementById("demoForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const params = {
        from_name: document.getElementById("name").value,
        company: document.getElementById("company").value,
        from_email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        city: document.getElementById("city").value,
        product: document.getElementById("product").value,
        demo_date: document.getElementById("date").value,
        demo_time: document.getElementById("time").value,
        message: document.getElementById("message").value
    };

    emailjs.send(
       "service_ifz9maq",
        "template_i65ch3l",
        params
    )
    .then(() => {
        document.getElementById("status").innerHTML =
            "✅ Demo Request Sent Successfully";
        form.reset();
    })
    .catch(error => {
        console.log(error);
        alert(JSON.stringify(error));
    });
});



