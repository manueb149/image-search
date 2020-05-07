import React from 'react';
import Imagen from './Imagen';

const ListadoImagenes = ({imagenes}) => {
    return (
        <div className="p-5 row col-12">
            {imagenes.map( imagen => (
                <Imagen key={imagen.id} imagen={imagen} />
            ))}
        </div>
    );
}
 
export default ListadoImagenes;