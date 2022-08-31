import { urlAPI } from "../config";

export const getCategories = async () => {

    const myHeaders = new Headers();

    const URL = urlAPI.url + "/api/category";
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    try {
        const consulta = await fetch(URL, requestOptions);
        const respuesta = await consulta.json();
        return respuesta
    } catch (error) {
        console.log(error);
    }
}

export const postCategoriesNote = async (note) => {
    const dateNow= new Date()
    var raw = JSON.stringify({
        "title": note.title,
        "content": note.content,
        "edited": dateNow
      });
    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };
    const URL = urlAPI.url + "/api/note";
    try {
      const consulta = await fetch(URL, requestOptions);
      const respuesta = await consulta.json();
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };