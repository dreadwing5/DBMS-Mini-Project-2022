import axios from "axios";
import {
  renderMessage,
  renderErrorMessage,
  renderSpinner,
} from "../controller.js";
import { wait, reload } from "../utils/helper.js";

export const insertData = async (data, url) => {
  try {
    renderSpinner();
    const res = await axios.post(url, data);
    renderMessage();
    await wait(1);
    reload();
  } catch (err) {
    // Handle Error Here

    renderErrorMessage();
    await wait(1);
    reload();
    console.error(err);
  }
};
