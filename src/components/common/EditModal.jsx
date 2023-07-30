import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import '../../styles/editmodal.css'
import { ArticlesService } from '../../services/articles.service';
import { CategoriesService } from '../../services/categories.service';

const EditModal = ({ article, isOpen, onClose }) => {
  const [namearticle, setNameArticle] = useState(article.nombre);
  const [location, setLocation] = useState(article.ubicacion);
  const [duenostate, setDueno] = useState(article.dueno);
  const [yearstate, setYear] = useState(article.year);
  const [description, setDescription] = useState(article.descripcion);
  const [filtercategory, setFilterCategory] = useState(article.categoria);
  const [mapcategory, setMapCategory] = useState([]);
  const [deletecounter, setDeleteCounter] = useState(0);
  //const [idmultimedios, setIdMultimedios] = useState(mapearMultimedios());
  const [idtotmultimedios, setIdTotMultimedios] = useState([]);

  const handleFromSubmit = (event) => {
        event.preventDefault();
        ArticlesService.updateArticle(article.id, new FormData(event.currentTarget))
        .then(() => {
          reloadServices()
          onClose();
        })
        .catch(() => {
            alert('Error en la solicitud de insercion del articulo. Por favor, inténtalo nuevamente.')
        });
  };

    const addIdDelete = (addId) => {
      if (!idtotmultimedios.includes(addId)) {
        setIdTotMultimedios([...idtotmultimedios, addId]);
        setDeleteCounter(deletecounter + 1);
      }else {
        setIdTotMultimedios(idtotmultimedios.filter((id) => id !== addId));
        setDeleteCounter(deletecounter - 1);
      }
  };

  /*function mapearMultimedios() {
      let arr1 = [];
    
      if (Array.isArray(article.fotos) && article.fotos.length > 0) {
        for (const foto of article.fotos) {
          arr1.push(foto.id);
        }
      } else {
        
      }

      if (Array.isArray(article.videos) && article.videos.length > 0) {
        for (const video of article.videos) {
          arr1.push(video.id);
        }
      } else {
        
      }

      if (Array.isArray(article.audios) && article.audios.length > 0) {
        for (const audio of article.audios) {
          arr1.push(audio.id);
        }
      } else {
        
      }
  return arr1;
}*/

  
  useEffect(() => {
    CategoriesService.getCategories().then((data) => setMapCategory(data));
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-modal">
      <div className="edit-modal-content">
        <h2>Editar Artículo</h2>
          <form onSubmit={handleFromSubmit}>
            <input
                className="article-input"
                type="text" 
                name="nombre"
                required
                placeholder="Ingrese Nombre..."
                value={namearticle}
                onChange={(event) => setNameArticle(event.target.value)}
            />
            <input
                className="article-input"
                type="text" 
                name="ubicacion"
                required
                placeholder="Se encuentra en..."
                value={location}
                onChange={(event) => setLocation(event.target.value)}
            />
            <input
                className="article-input"
                type="text" 
                name="dueno"
                required
                placeholder="Pertenece a...?"
                value={duenostate}
                onChange={(event) => setDueno(event.target.value)}
            />
            <input
                className="article-input"
                type="number" 
                name="year"
                required
                placeholder="Del año...?"
                value={yearstate}
                onChange={(event) => setYear(event.target.value)}
            />
            <select
                className="select-articles"
                placeholder="Elija la facultad..."
                value={filtercategory}
                onChange={(event) => setFilterCategory(event.target.value)}>
                {mapcategory.map((mcategory) => (
                    <option
                        value={mcategory.nombre}
                        key={mcategory.id}
                        >
                        Categoria: {mcategory.nombre}
                    </option>
                ))}
            </select>
            <section className="quill-title">
                <h2>Descripción</h2>
            </section>
            <div className="editor-quill" name="descripcion">
                <textarea
                    className="article-ta"
                    type="textarea"
                    name="descripcion"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
          </div>
          <input
            type='hidden'
            name="articulosBorrarId"   
            value={JSON.stringify(idtotmultimedios)}
          />
            <input
                className="article-input"
                id='my-files'
                type="file"
                name="multimedios"
                accept=".jpg, .jpeg, .png, .gif, .mp4, .mp3, audio/*, video/*"
                multiple
            />
            <button className="article-button" type="submit">Guardar Cambios</button>
            <button className="article-button" onClick={onClose}>Cancelar</button>
        </form>
        <section>
          <h1>Cantidad de multimedios a eliminar: { deletecounter }</h1>
            <table>
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(article.fotos) && article.fotos.length > 0 ? (
                  article.fotos.map((foto) => (
                    <tr key={foto.id}>
                      <td>
                        <img src={foto.url} alt={`foto-${foto.id}`} width="50" height="50" />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={idtotmultimedios.includes(foto.id)}
                          onChange={() => addIdDelete(foto.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No hay fotos disponibles.</p>
                )}
              </tbody>
            </table>
          
            <table>
                <thead>
                  <tr>
                    <th>Video</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(article.videos) && article.videos.length > 0 ? (
                  article.videos.map((video) => (
                    <tr key={video.id}>
                      <td>
                        <img src={video.url} alt={`video-${video.id}`} width="50" height="50" />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={idtotmultimedios.includes(video.id)}
                          onChange={() => addIdDelete(video.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No hay videos disponibles.</p>
                )}
                </tbody>
            </table>
          
            <table>
                <thead>
                  <tr>
                    <th>Audio</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(article.audios) && article.audios.length > 0 ? (
                  article.audios.map((audio) => (
                    <tr key={audio.id}>
                      <td>
                        <audio controls>
                          <source src={audio.url} type="audio/mpeg" />
                        </audio>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={idtotmultimedios.includes(audio.id)}
                          onChange={() => addIdDelete(audio.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No hay audios disponibles.</p>
                )}
                </tbody>
            </table>
        </section>
      </div>
    </Modal>
  );
};

export default EditModal;
