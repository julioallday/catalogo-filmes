export const limparInputs = (...inputs) => {
  inputs.forEach((element) => {
    element.value = "";
  });
};
