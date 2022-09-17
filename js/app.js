//! Variables

// access to Send and Reset button
const sendButton = document.querySelector("#sendBtn"),
    resetButton = document.querySelector("#resetBtn");

// access to inputs of email form
const email = document.querySelector("#email"),
    subject = document.querySelector("#subject"),
    message = document.querySelector("#message");

// access to form
const form = document.querySelector("form");

// access to loader div
const loader = document.querySelector("#loaders");

//! Event Listeners

eventListeners();

function eventListeners() {
    // app initialization
    document.addEventListener("DOMContentLoaded", appInit);

    // validate fields
    email.addEventListener("blur", validateFields);
    subject.addEventListener("blur", validateFields);
    message.addEventListener("blur", validateFields);

    // listener for Send and Reset button
    resetButton.addEventListener("click", resetBtn);

    // submit form and show spinier
    form.addEventListener("submit", submitForm);
}

//! Functions

// initialization of app
function appInit() {
    // disabling Send button when DOM loaded
    sendButton.disabled = true;
}

// function for validating email input
function validateFields() {
    // validate length
    fieldLength(this);

    // validate email
    if (this.id == "email") {
        validateEmail(this);
    }

    // check for have (error) class or no
    let error = document.querySelectorAll(".error");

    if (email.value !== "" && subject.value !== "" && message.value !== "") {
        if (error.length == 0) {
            sendButton.disabled = false;
        }
    }
}

// function for length of fields
function fieldLength(field) {
    if (field.value.length > 0) {
        field.style.borderBottomColor = "green";
        field.parentElement.lastElementChild.style.color = "green";
        field.classList.remove("error");
    } else {
        field.style.borderBottomColor = "red";
        field.parentElement.lastElementChild.style.color = "red";
        field.classList.add("error");
    }
}

// function for validation of email input
function validateEmail(field) {
    if (field.value.includes("@") && field.value.includes(".")) {
        field.style.borderBottomColor = "green";
        field.parentElement.lastElementChild.style.color = "green";
        field.classList.remove("error");
    } else {
        field.style.borderBottomColor = "red";
        field.parentElement.lastElementChild.style.color = "red";
        field.classList.add("error");
    }
}

// Reset form
function resetBtn() {
    form.reset()
}

// sending email and submit form
function submitForm(e) {
    e.preventDefault();

    // access to first spinner image in loader div
    const spinner = document.querySelector("#spinner");
    // show first spinner after submit form
    spinner.style.display = "block";

    // make second img tag
    const secondImg = document.createElement("img");
    secondImg.src = "img/mail.gif";
    secondImg.style.display = "block";

    setTimeout(() => {
        // hide first spinner
        spinner.style.display = "none";

        // add second spinner to loader after remove first image
        loader.appendChild(secondImg);

        // set second time out for remove second gif and reset form
        setTimeout(() => {
            resetBtn();
            secondImg.style.display = "none";
        }, 4000);
    }, 3000);
}
