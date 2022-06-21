import { MongoClient, ObjectId } from 'mongodb';
import CustomError from '../../../errores/CustomError.js'

const mongo_url = process.env.MONGO_URL
const base = process.env.MONGO_BASE
const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 6000 });
await client.connect();

export default class ContainerDao {
    constructor(collection) {
        this.collectionName = collection
        this.collection = client.db(base).collection(collection)
    }
    async getAll() {
        try {
            const array = await this.collection.find().toArray()
            return array
        }
        catch (err) {
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
    }
    async getById(id) {
        let wanted
        let query = { "id": id };

        try {
            wanted = await this.collection.findOne(query);
        }
        catch (err) {
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
        if (!wanted) {
            throw new CustomError(404, `Documento no encontrado ${JSON.stringify(query)}`)
        }
        return wanted
    }
    async add(data) {
        try {
            console.log(data)
            const { insertedId } = await this.collection.insertOne(data)
            console.log("insertID" + insertedId)
            return insertedId;
        }
        catch (err) {
            console.log(err.message)
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
    }
    async update(id, query) {
        try {
            this.deleteById(id);
            this.add(query)
        } catch (error) {
            throw new CustomError(500, `Error en ${this.collectionName}`, err)
        }
    }
    async deleteById(id) {
        let query = { "id": id };
        await this.collection.deleteOne(query, function (err, obj) {
            if (err) {
                throw new CustomError(500, `Error cuando borrabamos en ${this.collectionName}`, err)
            }
        });
    }

}
