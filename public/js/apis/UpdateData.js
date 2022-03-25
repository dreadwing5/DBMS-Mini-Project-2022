import axios from "axios";
import { wait, reload } from "../utils/helper.js";

import {
  renderMessage,
  renderErrorMessage,
  renderSpinner,
} from "../controller.js";

export const updateData = async (data) => {
  try {
    let params = new URLSearchParams(location.search);
    let event = params.get("name");
    let id = params.get("id");

    const updateUrl = `/update/${event}/${id}`;
    renderSpinner();
    const resp = await axios.put(updateUrl, data);
    renderMessage();
    await wait(1);
    window.location.href = `/student/${event}`;
  } catch (err) {
    // Handle Error Here
    renderErrorMessage();
    await wait(1);
    reload();
    console.error(err);
  }
};
