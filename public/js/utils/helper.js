export const wait = async function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

export const reload = function () {
  window.location.reload();
};
