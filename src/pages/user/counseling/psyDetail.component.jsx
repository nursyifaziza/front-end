import React from "react";
import { useParams } from "react-router";
import mockPsychologists from "./mockPsychologist";

const PsychologistDetails = () => {
  const { id } = useParams();

  const psychologist = mockPsychologists.find((psychologist) => psychologist.id === parseInt(id, 10));

  if (!psychologist) {
    return <div>Psychologist not found</div>;
  }

  return (
    <div>
      <h2>{psychologist.name}'s Details</h2>
      <p>Biography: {psychologist.biography}</p>
      <p>Qualifications: {psychologist.qualifications}</p>
      <p>Client Reviews:</p>
      <ul>
        {psychologist.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
};

export default PsychologistDetails;
