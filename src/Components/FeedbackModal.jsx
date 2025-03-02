import React from 'react';
import styled from 'styled-components';


const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  justify-self: center;
  min-width: 400px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${({ isCorrectGuess }) => (isCorrectGuess ? 'green' : 'red')};
`;

const ModalContent = styled.div`
  font-size: 1rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-inline: 50px;
  margin-block: 20px
} 
`;

const NextButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  flex: 1 1 45%; /* Adjusts the button to take up approximately half the width */
  margin: 10px;
  &:hover {
    background-color: #0056b3;
  }

`;

const FeedbackModal = ({ isCorrectGuess , handleNextClick,funFact,trivia,score}) => {
  return (
    
      <ModalContainer>
        <ModalTitle isCorrectGuess={isCorrectGuess}>
          {isCorrectGuess ? 'Correct!' : 'Try Again!'}
        </ModalTitle>
        <ModalContent>
          
         <b> {isCorrectGuess
            ? 'Congratulations, you guessed correctly!'
            : 'Unfortunately, that was not the correct guess. Please try again.'}
            </b>
            <div><b>Fun Fact : </b> {funFact}</div>
            <div><b>Trivia : </b> {trivia}</div>
       
        </ModalContent>
        <NextButton onClick={() => handleNextClick()} >Next</NextButton>
       <div> <>  Correct: {score[0]}</>  <>  Incorrect: {score[1]}</></div>
      </ModalContainer>
  
  );
};

export default FeedbackModal;