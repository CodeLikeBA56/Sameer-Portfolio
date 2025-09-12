/*========== Contact Form Validation Check ==========*/

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formBtn.onclick = function (event) {
  event.preventDefault();
  sendEmail();
};

for (let i = 0; i < formInputs.length; i++) { // add event to all form input field
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) // check form validation
      formBtn.removeAttribute("disabled");
    else
      formBtn.setAttribute("disabled", "");
  });
}

/*========== Send email through EmailJs ==========*/

const senderName = document.getElementById("name");
const senderEmail = document.getElementById("email");
const senderMessage = document.getElementById("message");

function sendEmail() {
  const name = senderName.value.trim();
  const email = senderEmail.value.trim();
  const message = senderMessage.value.trim();
  
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }
  
  const serviceId = "service_gasm89q";
  const templateId = "template_ztctj1z";
  const params = { name, email, message };
  
  emailjs.send(serviceId, templateId, params)
  .then(res => {
    alert("Message sent successfully!");
    senderName.value = "";
    senderEmail.value = "";
    senderMessage.value = "";
  })
  .catch(error => {
    console.error("EmailJS error:", error);
    alert("Oops! Something went wrong. Try again later.");
  });
}