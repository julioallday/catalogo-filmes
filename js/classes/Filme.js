export class Filme {
  constructor(
    titulo,
    nota,
    duracao,
    imagem,
    favorito = false,
    assistido = false
  ) {
    this.titulo = titulo;
    this.nota = nota;
    this.duracao = duracao;
    this.imagem = imagem;
    this.favorito = favorito;
    this.assistido = assistido;
  }
 
}
