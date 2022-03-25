import axios from "axios";

import { isInsertMode } from "../utils/Utils";

export const loadDropdown = async (tableName, dropdown) => {
  try {
    const resp = await axios.get(`/dropdown/${tableName}`);
    for (const { name } of resp.data) {
      let option = document.createElement("option");
      option.value = name;
      option.text = name.charAt(0).toUpperCase() + name.slice(1);

      dropdown.appendChild(option);
    }
  } catch (err) {
    console.error(err);
  }
};
