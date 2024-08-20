import {
  emitirTextoEditor,
  selecionaDocumento,
} from './socket-front-documento.js';

const parametro = new URLSearchParams(window.location.search);
const nomeDocumento = parametro.get('nome');

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');

tituloDocumento.textContent = nomeDocumento || 'Documento sem título';

selecionaDocumento(nomeDocumento);

textoEditor.addEventListener('keyup', () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor };
