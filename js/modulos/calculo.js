import { filmes } from "../listas/filmes.js";

export const somaMinutosAssistidos = () => {
    let arrayAssistidos = filmes.filter((filme) => {
      const assistido = filme.assistido;
      const termo = true;
      return assistido == termo;
    });
    let gerenciadorValor = [];
    arrayAssistidos.forEach((element) => {
      gerenciadorValor.push(element.assistido ? element.duracao : 0);
    });
   let resultado = gerenciadorValor.reduce((a, b) => {
      return a + b;
    }, 0);
  const total = document.getElementById("total-assistido");
    total.innerText = resultado;
  }
  