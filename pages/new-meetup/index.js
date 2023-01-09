import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const NewMeetupPage = () =>{

	const router = useRouter();
	const addMeetupHandler = async(newMeetupData) =>{
		console.log(newMeetupData);
		const response = await fetch('/api/new-meetup',{
			method : 'POST',
			body : JSON.stringify(newMeetupData),
			headers : {
				'Content-Type' : 'application/json'
			}
		});

		const data = await response.json();
		console.log(data)
		router.push('/')
		
	}

	return(
    <Fragment>
      <Head>
        <title>Add New React Meetup</title>
        <meta name='description' content='A huge data of React meetups we can visit' />
      </Head>
		<NewMeetupForm onAddMeetup={addMeetupHandler}/>
	</Fragment>
	)
}

export default NewMeetupPage;