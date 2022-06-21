import admin from "firebase-admin";
import CustomError from '../../../errores/CustomError.js';
import config from '../../../../config/config.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore()

export default class ContainerDao {
    constructor(collection) {
        this.collectionName = collection
        this.collection = db.collection(collection)
    }
    async getAll() {
        try {
            const array = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                array.push({ id: doc.id, ...doc.data() })
            })
            return array
        }
        catch (err) {
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
    }
    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        }
        catch (err) {
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
    }
    async add(data) {
        try {
            const guardado = await this.coleccion.add(data);
            return { ...nuevoElem, id: guardado.id }
        }
        catch (err) {
            throw new CustomError(500, `Error cuando agrego un documento en ${this.collectionName}`, err)
        }
    }
    async update(query) {
        try {
            const actualizado = await this.coleccion.doc(query.id).set(query);
            return actualizado
        }
        catch (err) {
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
    }
    async deleteById(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            throw new CustomError(500, `Error cuando borramos un documento ${this.collectionName}`, err)
        }
    }
}
