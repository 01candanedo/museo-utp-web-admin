import axios from "axios";

const host_pruebas = "https://2726-190-219-223-92.ngrok-free.app/api"
const host_principal = "https://ds6.glaciar.club/api"

const BASE_URL = host_pruebas;

const getCategories = async () => {
    try {
        return (await axios.get(BASE_URL + '/categorias/all')).data
    } catch (error) {
        throw new Error('Error en la solicitud de busqueda de categorias: '+error);
    }
};

const postCategories = async (namecategories) => {
    try {
        const config = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        };
        return (await axios.post(BASE_URL + '/categorias/', JSON.stringify({ nombre: namecategories }), config)).data
    } catch (error) {
        throw new Error('Error en la solicitud de adicion de categoria: '+error);
    }
};

const deleteCategories = async (idcategory) => {
    try {
        const config = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        };
        return (await axios.delete(BASE_URL.concat('/categorias/').concat(idcategory), config)).data
    } catch (error) {
        throw new Error('Error en la solicitud de adicion de categoria: '+error);
    }
};

export const CategoriesService = {
    getCategories,
    postCategories,
    deleteCategories,
}