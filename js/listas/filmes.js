let filmesLocalStorage = localStorage.getItem("filmes")
  ? JSON.parse(localStorage.getItem("filmes"))
  : [];

export const filmes = filmesLocalStorage;
