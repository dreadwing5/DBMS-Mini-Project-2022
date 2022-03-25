import { isInsertMode } from "./Utils";
import { insertData } from "../apis/InsertData";
import { updateData } from "../apis/UpdateData";
import { quillConfig } from "./QuillConfig";
import { quill } from "./Utils.js";

const manageDate = function () {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  if (day <= 5) {
    day = 30;
    month = month === 0 ? 11 : month - 1;
    if (month === 11) {
      year--;
    }
  } else {
    day = 30;
  }
  month++;
  return year.toString() + "-" + month.toString() + "-" + day.toString();
};

export const submitForm = () => {
  const form = document.querySelector("form");
  const formData = Object.fromEntries(new FormData(form).entries());

  if (isInsertMode === "false") {
    const description = document.querySelector(".ql-editor").innerHTML; //This will again append the content of quill in to description if we are fetching  the data
    formData.description = description;
  } else {
    //Create a new instance of quill in insert page
    let description = quill.root.innerHTML;
    if (description === "<p><br></p>") {
      description = "No Description";
    }
    // formData.append("description", description);
    formData.description = description;
  }

  const categoryName = document
    .getElementById("selectBox")
    ?.getAttribute("name");
  if (categoryName) {
    const category = document.querySelector(
      `select[name=${categoryName}]`
    ).value;

    //Check for others
    const categoryValue =
      category === "others"
        ? document.querySelector(".other-text").value
        : category;
    formData[categoryName] = categoryValue;
  }

  //This is done to set the date to the last month no matter when we submit the form
  const date = manageDate();
  formData.filterDate = date;

  const url = myForm.action;
  isInsertMode === "false" ? updateData(formData) : insertData(formData, url);
};
