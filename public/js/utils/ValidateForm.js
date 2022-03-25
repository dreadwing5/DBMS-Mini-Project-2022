import { renderConfirmationModal } from "../controller.js";

export const validateForm = () => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  if (!forms.length) return;

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          event.preventDefault();
          renderConfirmationModal(); //handleSubmission
        }
      },
      false
    );
  });
};
