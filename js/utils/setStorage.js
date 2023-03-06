export const registraInformacaoStorage = (chave, valor) => {
  localStorage.setItem(chave, JSON.stringify(valor));
};
