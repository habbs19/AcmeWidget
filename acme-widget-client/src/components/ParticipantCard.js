import React from 'react'
import { Card } from 'primereact/card';
import PropTypes from 'prop-types';

const ParticipantCard = (props) => {
     
    return (
        <>
            <Card title={props.title} subTitle={props.subtitle} key={props.id}>
                {props.content}
            </Card>
            
        </>
    )
}

export default ParticipantCard;

ParticipantCard.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};