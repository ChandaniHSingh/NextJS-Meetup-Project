import { Fragment, useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 5, 12345 Some City',
//     description: 'This is a first meetup!'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Some address 10, 12345 Some City',
//     description: 'This is a second meetup!'
//   }
// ];

const HomePage = (props) =>{
  // const[loadedMeetups,setLoadedMeetups]=useState([]);

  // useEffect(()=>{
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // },[]);
  console.log(props.meetups);

	return(
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='A huge data of React meetups we can visit' />
      </Head>
		  <MeetupList meetups ={props.meetups}/>
    </Fragment>
	)
}

// export const getServerSideProps = async (context) =>{
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API
//   return {
//     props : {
//       meetups : response.json()
//     }
//   }
// }

export const getStaticProps = async() =>{
  // fetch data from API
  const client = await MongoClient.connect('mongodb+srv://chandani:mongochs@cluster0.3jp5l9p.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  
  client.close();

  return {
    props : {
      meetups : meetups.map((meetup)=>({
        title : meetup.title,
        address : meetup.address,
        image : meetup.image,
        description : meetup.description,
        id : meetup._id.toString(),
      })),
    },
    revalidate : 1
  }
}
export default HomePage;