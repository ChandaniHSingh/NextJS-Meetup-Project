// POST /api/new-meetup
import { MongoClient } from 'mongodb';

const handler = async (req,res) =>{
	console.log("Hii")
	if(req.method === 'POST'){
		const data = req.body;
		// const{title,image,address,description} = data;

		const client = await MongoClient.connect('mongodb+srv://chandani:mongochs@cluster0.3jp5l9p.mongodb.net/meetups?retryWrites=true&w=majority')
		const db = client.db();

		const meetupsCollection = db.collection('meetups');
		const result = await meetupsCollection.insertOne(data);

		client.close();
		res.status(201).json({message : "Inserted Successfully"});
	}
}
export default handler;