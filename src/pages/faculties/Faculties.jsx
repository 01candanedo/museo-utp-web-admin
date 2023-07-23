import SideBar from '../../components/common/SideBar';
import SideBarResponsive from '../../components/common/SideBarResponsive';
import '../../styles/dashboard.css'
import '../../styles/normalize.css'
import '../../styles/articles.css';
import { useState, useEffect } from "react"
import { FacultiesService } from '../../services/faculties.service';

function Faculties() {
    const [faculties, setFaculties] = useState([]);
    const [namefaculties, setNameFaculties] = useState('');
    function reloadTable() {
        FacultiesService.getFaculties().then((data) => setFaculties(data));
    }

    useEffect(() => {
        reloadTable()
    }, []);
   
    const handleFromSubmit = (event) => {
        event.preventDefault();
        const confirmAdd = window.confirm("¿Estás seguro de que deseas agregar esta facultad?");
        if (confirmAdd) {
            FacultiesService.postFaculties(namefaculties)
            .then(() => {
                reloadTable()
                setNameFaculties('')
            })
            .catch(() => {
                alert('Error en la solicitud de insercion de categoria. Por favor, inténtalo nuevamente.')
            });
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta facultad?");
        if (confirmDelete) {
            FacultiesService.deleteFaculties(id)
            .then(() => {
                reloadTable()
                setNameFaculties('')
            })
            .catch(() => {
                alert('Error en la solicitud de borrado de categoria. Por favor, inténtalo nuevamente.')
            });
        }  
    }

    return (
      <div className='container'>
            <SideBar />

            <section className="main">

                <SideBarResponsive />
                
                <main class="table">
                    <section class="table_header">
                        <h1>Lista de Facultades</h1>
                    </section>
                    <section class="table_body">
                        <section class="table_header">
                            <h1>Facultad</h1>
                        </section>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                            {faculties.map((faculty) => (
                                <tr key={faculty.id}>
                                    <td>{faculty.nombre}</td>
                                    <td>
                                        <button className="article-button-delete" onClick={() => handleDelete(faculty.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </section>

                    <section class="table_header">
                        <h2>Agregar Facultad</h2>
                    </section>

                    <section class="table_body">
                        <form onSubmit={handleFromSubmit}>
                            <input
                                className="article-input"
                                type="text" 
                                name="descripcion"
                                required
                                placeholder="Descripcion..."
                                value={namefaculties}
                                onChange={(event) => setNameFaculties(event.target.value)}
                            />
                            <button className="article-button" type="submit">Agregar</button>
                        </form>
                    </section>
                </main>
            </section>
      </div>
  )
}

export default Faculties