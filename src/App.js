import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda ] = useState('');
  const [ imagenes, setImagenes ] = useState([]);
  const [ actualpage, setActualpage ] = useState(1);
  const [ totalpages, setTotalpages ] = useState(1);

  useEffect(() => {

    const handleError = message => {
      if(!message.ok){
        return Promise.resolve('error');
      }
      return message;
    }

    const consultarApi = async () => {

      if(busqueda.trim() === '') return;

      const apiKey = '16013216-2b2fe4ec86363aac1938ed708&';
      const ipp= '30';
      const url = `https://pixabay.com/api/?key=${apiKey}q=${busqueda}&per_page=${ipp}&page=${actualpage}`;

      const result = await fetch(url)
        .then(handleError)
        .then(response => response);
      if(result === 'error') return;
      const images = await result.json();
      console.log(images);
      setImagenes(images.hits);

      const totalPaginas = Math.ceil(images.totalHits/ipp);
      setTotalpages(totalPaginas);

      const scroll = document.querySelector('.jumbotron');
      scroll.scrollIntoView({ behavior: "auto" })
    }
    consultarApi();
  }, [busqueda, actualpage]);

  const paginaAnterior = () => { if(actualpage > 1) setActualpage(actualpage-1); }
  const paginaSiguiente = () => { if(actualpage < totalpages) setActualpage(actualpage+1); }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center mb-5">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {(actualpage === 1) ? null :
          (
            <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo;Aterior</button>
          )
        }
        {(actualpage === totalpages) ? null :
          (
            <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaSiguiente}
            >Siguiente&raquo;</button>
          )
        }
      </div>
    </div>
  );
}

export default App;
