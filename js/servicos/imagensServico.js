import { obj } from '../listas/mock.js'

export function imagemDinamica(termo) {

  const itensList = obj.items;
  let filmeEncontrado = itensList.filter((filme) => {
    return filme.title.toLowerCase().includes(termo.toString().toLowerCase());
  });
  
  if(!filmeEncontrado[0]){
    return false;
  } else {
    let caracteristicasFilme = {
      titulo: filmeEncontrado[0].title,
      imagem: filmeEncontrado[0].image
    }
    return caracteristicasFilme;
  }
}

// export async function imagemDinamica(termo) {
//   const response = await fetch(
//     "https://imdb-api.com/en/API/MostPopularMovies/k_on0ql82d"
//   );
//   const data = await response.json();
//   const itemsList = data.items;
  // let filmeEncontrado = itemsList.filter((filme) => {
  //   return filme.title.toLowerCase().includes(termo.toString());
  // });
  // console.log(filmeEncontrado);
  // if(!filmeEncontrado[0]){
  //   return false;
  // } else {
  //   let caracteristicasFilme = {
  //     titulo: filmeEncontrado[0].title,
  //     imagem: filmeEncontrado[0].image
  //   }
  //   return caracteristicasFilme;
  // }
  
// }

