import mongoose from 'mongoose';

const connection = {};



async function connect() {
    try {
        if (connection.isConnected) {
            return;
        }
        if (mongoose.connections.length > 0) {
            connection.isConnected = mongoose.connections[0].readyState;
            if (connection.isConnected === 1) {
                return;
            }
            await mongoose.disconnect();
        }
        const db = await mongoose.connect('mongodb+srv://shajib:shajib786@cluster0.yk68owb.mongodb.net/?retryWrites=true&w=majority');
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
    }
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        }
    }
}
const db = { connect, disconnect };
export default db;