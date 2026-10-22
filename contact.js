emailjs.init({
    publicKey: "VfYYxHS3n2o_GWKDv"
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.send(
        "service_29qhw9b",
        "template_48rs9rf",
        {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }
    )
    .then(function () {
        document.getElementById("status").innerHTML =
        "✅ Thank you! Your enquiry has been sent.";
        document.getElementById("contactForm").reset();
    })
    .catch(function (error) {
        console.log(error);
        document.getElementById("status").innerHTML =
        "❌ Failed to send.";
    });
});


// OUR CLIENT JS
function openTab(evt, tabName) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Remove active class from all buttons
    var tabButtons = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Show selected tab
    var selected = document.getElementById(tabName);

    if (selected) {
        selected.style.display = "block";
        selected.classList.add("active");
    }
    // Highlight selected button
    evt.currentTarget.classList.add("active");
}


// SHOW FIRST TAB WHEN PAGE LOADS
window.onload = function () {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }
    // Default tab
    document.getElementById("club").style.display = "block";
    document.getElementById("club").classList.add("active");
};


function openPopup(image){
    document.getElementById("popup").style.display="flex";
    document.getElementById("popupImage").src=image;
}

function closePopup(){
    document.getElementById("popup").style.display="none";
}
 

window.onclick=function(event){
    let popup=document.getElementById("popup");
    if(event.target==popup){
        popup.style.display="none";
    }
}

function openImage(src){
    document.getElementById("imagePopup").style.display="flex";
    document.getElementById("popupImage").src=src;
}

function closeImage(){
    document.getElementById("imagePopup").style.display="none";
}

// Close when clicking outside the image

document.getElementById("imagePopup").addEventListener("click",function(e){
    if(e.target.id==="imagePopup"){
        closeImage();
    }
});





