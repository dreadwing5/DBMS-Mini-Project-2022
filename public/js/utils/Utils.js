import { trim, camelCase, startCase } from "lodash-es";
import Quill from "quill";
import axios from "axios";

import ImageUploader from "quill-image-uploader";
import ImageResize from "quill-image-resize";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/imageResize", ImageResize);

import { QUILL_CONFIG } from "./QuillConfig";

const quillContainer = document.querySelector("#editor-container");

export const isInsertMode =
  document.getElementById("myForm")?.dataset.isinsertmode;

export const quill = (function () {
  if (!quillContainer) return;
  if (isInsertMode === "true") {
    QUILL_CONFIG.placeholder = "Write your description here...";
  }
  const quill = new Quill("#editor-container", QUILL_CONFIG);
  return quill;
})();

/* Show the column name in report page */
const column__names = document.querySelectorAll(".column__name");
column__names?.forEach((name) => {
  let columnName = name.dataset.column__name;
  name.innerHTML = startCase(columnName);
});
/* Show the column data in report page */
const column__data = document.querySelectorAll(".column__data");

column__data?.forEach((data) => {
  let columnData = data.dataset.column__data;
  data.innerHTML = columnData ? columnData : "NA";
});

/* Handle Description here */

const table__footer = document.querySelector(".table__footer");

/* Check for undefined case and parse the value */
const isDescriptionRequired =
  table__footer && JSON.parse(table__footer.dataset.isdescriptionrequired);

// console.log("isDescriptionRequired", isDescriptionRequired);

if (isDescriptionRequired) {
  const table__description = document.querySelectorAll(".table__description"); //get all the description table
  table__description.forEach((table) => {
    const footer = table.closest(".table__footer"); //find the footer class related to that table
    footer.style.display = ""; //Show the description field
    table.innerHTML = table.dataset.description; //Fill the data for description
  });
}

/* Description End here */

/* Handle Table Name Here */

const tables = document.querySelectorAll(".table__row");
tables?.forEach((table) => {
  const report__title = table.previousElementSibling;
  report__title.style.display = "";
});

const editData = (row) => {
  // let eventName = row.dataset.mod;
  let id = row.closest(".table").rows[1].cells[1].innerText.trim(" ");
  let eventID = row.closest(".table").dataset.id;
  let eventName = document.getElementById(`event-name-${eventID}`).innerText;
  eventName = trim(camelCase(eventName), "Report");
  console.log(eventName);
  window.location.href = `/edit?name=${eventName}&id=${id}`;
};

const deleteData = (row) => {
  let data = row.closest(".table"); //This will select the entire table
  data.remove();
};

const table__data = document.querySelector(".table__data");
table__data?.addEventListener("click", (e) => {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains("edit__entry")) {
    editData(e.target);
  }
  if (e.target.classList.contains("delete__entry")) {
    deleteData(e.target);
  }
});

/* Admin Related DOM manipulation */

// Add Data

const add__field = document.querySelector(".add-new");
const tableName = document.querySelector(".table__name--dropdown")?.dataset
  .tableName;
add__field?.addEventListener("click", () => {
  const row = document.querySelector(".hidden-row");
  row.style.display = "";
  const field__name = document.querySelector(".field__name");
  field__name.focus(); //Move the cursor to the text field
  //Fetch the last index and update the current index
  const prevIndex =
    row.previousElementSibling?.querySelector(".field__idx").innerHTML;
  const index = document.querySelector(".row__number");
  if (prevIndex) index.innerHTML = Number(prevIndex) + 1;

  const submit__button = document.querySelector(".table__submit--button");
  submit__button.removeAttribute("disabled"); //enable the submit button

  //Submit the data
  submit__button.addEventListener("click", () => {
    const field__name = document.querySelector(".field__name");
    //Hnadle Empty value here
    if (!field__name.value) {
      const danger = document.querySelector(".text-danger");
      danger.style.display = "";
      setTimeout(() => {
        danger.style.display = "none";
      }, 1000);
    }

    //Send Post Request
    const sendPostRequest = async () => {
      try {
        const data = { name: field__name.value };
        const resp = await axios.post(`/dropdown/${tableName}`, data);
        submit__button.disabled = true;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.getElementById("alert").style.display = "block";
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        console.error(err);
      }
    };

    sendPostRequest();
  });
});

//Delete Data
const admin_table__data = document.querySelector(".field--table__data");
admin_table__data?.addEventListener("click", (e) => {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains("delete__entry")) {
    const id = Number(e.target.closest(".field__id").dataset.id);

    //Send Delete Request
    const sendDeleteRequest = async () => {
      try {
        const payload = { id: id };
        const resp = await axios.delete(`/dropdown/${tableName}`, {
          data: payload,
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // document.getElementById("alert").style.display = "block";
        // setTimeout(() => window.location.reload(), 1000);
        const row = e.target.closest(".table__field");
        console.log(row); //This will select the entire table
        row.remove();
      } catch (err) {
        console.error(err);
      }
    };
    sendDeleteRequest();
  }
});
