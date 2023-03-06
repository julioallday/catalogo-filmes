import { Filme } from "../classes/Filme.js";
import { filmes } from "../listas/filmes.js";
import { imagemAleatoria, inputsObj } from "../componentes/inputs.js";
import { botoesObj } from "../componentes/botoesObj.js";
import { componenteSvgAssistido } from "../componentes/svgAssistido.js";
import { componenteSvgNaoAssistido } from "../componentes/svgNaoAssistido.js";
import { limparInputs } from "../utils/limpaInputs.js";
import { registraInformacaoStorage } from "../utils/setStorage.js";
import { somaMinutosAssistidos } from "./calculo.js";

export const listarFilmes = () => {
  const section = document.getElementById("listagem");
  section.innerHTML = "";
  const ul = document.createElement("ul");

  ul.classList = "lista-cards";

  filmes.forEach((element, index) => {
    const li = document.createElement("li");
    li.classList = "item";

    ul.appendChild(li);
    section.appendChild(ul);

    li.innerHTML = `<div class="card">
                        <div class="imagem">
                            <img src="${element.imagem}">
                        </div>
                        <div class="informacoes">
                        <div class="detalhes">
                            <span>${element.nota}⭐</span>
                            <span>${element.duracao}min⏳</span>
                        </div>
                        <div class="titulo">
                            <p>${element.titulo}</p>
                        </div>
                        </div>
                        <div class="botoes">
                        <a id="${index}-assistido">
                        ${
                          element.assistido
                            ? componenteSvgAssistido("30px")
                            : componenteSvgNaoAssistido("30px")
                        }</a>
                            <a id="${index}-favorito"><?xml version="1.0" encoding="utf-8"?>
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo
                             Mixer Tools -->
                            <svg width="20px" viewBox="0 0 24 24" fill=${
                              element.favorito ? "red" : "none"
                            } xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.62 20.81C12.28 20.93 11.72
                            20.93 11.38 20.81C8.48 19.82 2 15.69 2 
                            8.68998C2 5.59998 4.49 3.09998 7.56
                            3.09998C9.38 3.09998 10.99 3.97998 12 
                            5.33998C13.01 3.97998 14.63 3.09998 
                            16.44 3.09998C19.51 3.09998 22 5.59998
                              22 8.68998C22 15.69 15.52 19.82 12.62
                            20.81Z" stroke="${
                              element.favorito ? "gold" : "#c0c0c0"
                            }" 
                            stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"/>
                            </svg></a>
                        </div>
                    </div>`;
    somaMinutosAssistidos();
    favoritar(element, index);
    assistir(element, index);
  });
  registraInformacaoStorage("filmes", filmes);
};

export const mostrarTela = () => {
  botoesObj.cadastrar.onclick = cadastrarFilme;

  inputsObj.pesquisa.addEventListener("input", () => {
    const filmesEncontrados = pesquisarFilmes();
    const encontrouAlgumFilme = filmesEncontrados[0] ? true : false;
    if (!encontrouAlgumFilme) {
      alert("Não foi encontrado nenhum filme com esse titulo");
      inputsObj.pesquisa.value = "";
    } else {
      setTimeout(() => {
        listarFilmes(filmesEncontrados);
      }, 500);
    }
  });
  botoesObj.pesquisar.addEventListener("click", pesquisarFilmes);
  listarFilmes(filmes);
};

export const assistir = (element, index) =>
  document
    .getElementById(`${index}-assistido`)
    .addEventListener("click", () => {
      element.assistido = !element.assistido;
      somaMinutosAssistidos();
      registraInformacaoStorage("filmes", filmes);
      listarFilmes(filmes);
    });

export const favoritar = (element, index) => {
  let botao = document.getElementById(`${index}-favorito`);
  botao.addEventListener("click", () => {
    let filmesFavoritos = validaFavoritos(filmes, true);
    window.filmesFavoritos = filmesFavoritos;

    if (filmesFavoritos.length < 3) {
      element.favorito = !element.favorito;
    } else if (!element.favorito) {
      alert("Já existem três filmes favoritos");
    } else {
      element.favorito = !element.favorito;
    }
    console.log(
      `Filme ${index}`,
      `${element.favorito ? "foi curtido" : "foi descurtido"}`
    );
    registraInformacaoStorage("filmes", filmes);
    listarFilmes(filmes);
  });
};

export const cadastrarFilme = () => {
  const tituloValido = validaTitulo(inputsObj.titulo.value);
  const duracaoMaximaUltrapassada = Number(inputsObj.duracao.value) > 400;
  if (!tituloValido) {
    alert("Já possue um filme com o mesmo título!");
  } else if (duracaoMaximaUltrapassada) {
    alert("Duração máxima ultrapassada!");
    limparInputs(inputsObj.duracao);
  } else {
    const obj = new Filme(
      inputsObj.titulo.value,
      Number(inputsObj.nota.value),
      Number(inputsObj.duracao.value),
      inputsObj.imagem.value ? inputsObj.imagem.value : imagemAleatoria
    );
    filmes.push(obj);
    registraInformacaoStorage("filmes", filmes);

    limparInputs(
      inputsObj.titulo,
      inputsObj.duracao,
      inputsObj.nota,
      inputsObj.imagem
    );
    alert("Filme adicionado com sucesso!");
    listarFilmes(filmes);
  }
};

export const pesquisarFilmes = () => {
  return filmes.filter((filme) => {
    const nomeMinusculo = filme.titulo.toLowerCase();
    const termoMinusculo = inputsObj.pesquisa.value.toLowerCase();
    return nomeMinusculo.includes(termoMinusculo);
  });
};

export const validaTitulo = (termo) => {
  return filmes.every(
    (element) => element.titulo.toLowerCase() != termo.toLowerCase()
  );
};

const validaFavoritos = (filmes, termo) => {
  return filmes.filter((filme) => {
    const nomeMinusculo = filme.favorito.toString();
    const termoMinusculo = termo.toString();
    return nomeMinusculo.includes(termoMinusculo);
  });
};
