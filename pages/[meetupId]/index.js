import React, { Fragment } from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'

const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
		<MeetupDetail 
			key={props.meetupData._id}
			id={props.meetupData._id}
			image={props.meetupData.image}
			title={props.meetupData.title}
			address={props.meetupData.address}
    		description={props.meetupData.description}
		/>
	</Fragment>
  )
}
export const getStaticPaths = async() =>{
	const client = await MongoClient.connect('mongodb+srv://chandani:mongochs@cluster0.3jp5l9p.mongodb.net/meetups?retryWrites=true&w=majority');
	const db = client.db();
	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find({},{_id:1}).toArray();
	return {
		fallback : false,
		paths : meetups.map(
			(meetup)=>(
				{
					params : {
						meetupId : meetup._id.toString()
					}
				}
			)
		)
	}
}
export const getStaticProps = async(context) =>{
	const meetupId = context.params.meetupId;
	// console.log(context.params.meetupId);
	const client = await MongoClient.connect('mongodb+srv://chandani:mongochs@cluster0.3jp5l9p.mongodb.net/meetups?retryWrites=true&w=majority');
	const db = client.db();
	const meetupsCollection = db.collection('meetups');
	const selectedMeetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});

	return {
		props : {
			meetupData : {
				id : selectedMeetup._id.toString(),
				title : selectedMeetup.title,
				image : selectedMeetup.image,
				address : selectedMeetup.address,
				description : selectedMeetup.description
			}
		}
	}
}

export default MeetupDetailPage