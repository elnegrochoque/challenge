import { urlAPI } from "../config";

export const getNote = async () => {

    const myHeaders = new Headers();

    const URL = urlAPI.url + "/api/notewhitcategories";
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
export const getNoteArchived = async () => {

    const myHeaders = new Headers();

    const URL = urlAPI.url + "/api/notearchived";
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

export const delNote = async (id) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "idnotes": id
    });

    const URL = urlAPI.url + "/api/note";
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
    };
    try {
        const consulta = await fetch(URL, requestOptions);
        const respuesta = await consulta.json();
        return respuesta
    } catch (error) {
        console.log(error);
    }
}


export const postNote = async (note) => {

    const dateNow = new Date()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": note.title,
        "content": note.content,
        "edited": dateNow,
        "categories": note.categories,
        "archived": false
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const URL = urlAPI.url + "/api/notecategories";
    try {
        const consulta = await fetch(URL, requestOptions);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
export const putNote = async (noteAux, note) => {
    const dateNow = new Date()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "idnotes": note.idnotes,
        "title": noteAux.title,
        "content": noteAux.content,
        "edited": dateNow,
        "categories": note.categories,
        "archived": note.archived
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const URL = urlAPI.url + "/api/notewhitcategories";
    try {
        const consulta = await fetch(URL, requestOptions);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const putArchivedNote = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "idnotes": id,
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const URL = urlAPI.url + "/api/notearchived";
    try {
        const consulta = await fetch(URL, requestOptions);
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
export const getNotesFiltered = async (filter) => {

    const myHeaders = new Headers();

    const URL = urlAPI.url + "/api/notefiltered/" + filter;
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
export const getNotesArchivedFiltered = async (filter) => {

    const myHeaders = new Headers();

    const URL = urlAPI.url + "/api/notearchivedfiltered/" + filter;
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