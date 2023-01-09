// import { MongoClient } from "mongodb";

// const handle = async(req,res)=>{
// 	if(req.method === 'GET'){
// 		const client = await MongoClient.connect('mongodb+srv://chandani:mongochs@cluster0.3jp5l9p.mongodb.net/meetups?retryWrites=true&w=majority');
// 		const db = client.db();

// 		const meetupsCollection = db.collection('meetups');
// 		const result = await meetupsCollection.find();

// 		client.close();
// 		res.status(201).json(result);
// 	}
// }

// export default handle;