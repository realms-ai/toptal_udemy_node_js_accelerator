import { getDb } from '../../config/database.js';
import { ObjectId } from 'mongodb';
class Productm {
    product;
    constructor(product) {
        this.product = product;
    }
    async save(id) {
        console.log('Product Data: ', this.product);
        const db = await getDb();
        if (id)
            await db
                .collection('products')
                .updateOne({ _id: new ObjectId(id) }, { $set: this.product });
        else
            await db.collection('products').insertOne(this.product);
    }
    static async fetchAll(query = {}, userId) {
        if (userId)
            query['userId'] = new ObjectId(userId);
        const db = await getDb();
        console.log('Query: ', query);
        return await db.collection('products').find(query).toArray();
        // db.collection('products').find({_id: {_in: pids}}).toArray();
    }
    static async findById(id) {
        const db = await getDb();
        console.log('Id: ', id);
        return await db
            .collection('products')
            .find({ _id: new ObjectId(id) })
            .toArray();
    }
    static async deleteById(id) {
        const db = await getDb();
        await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    }
}
export { Productm };
