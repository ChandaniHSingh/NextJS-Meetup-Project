import React from 'react'
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  return (
	< div className={classes.detail}>
		<div>
		<img src={props.image} alt={props.title} />
		</div>
		<div >
		<h3>{props.title}</h3>
		<address>{props.address}</address>
		<p>{props.description}</p>
		</div>
	</div>
  )
}

export default MeetupDetail