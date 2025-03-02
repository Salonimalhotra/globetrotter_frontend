import React , {useState,useEffect} from 'react'
import ClueContainer from './Components/ClueContainer';
import OptionsContainer from './Components/OptionsContainer';
import styled from 'styled-components';
import { data } from './data';
import FeedbackModal from './Components/FeedbackModal';
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from 'react-confetti';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #666;
`;

const ResetButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  flex: 1 1 45%; /* Adjusts the button to take up approximately half the width */
  margin-right: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;
export const Globetrotter = () => {

    const [showFeedbackModal,setShowFeedbackModal] = useState(false);
    const [clue, setClue] = useState('');
    const [answer,setAnswer] = useState('');
    const [index,setIndex] = useState(0);
    const [isCorrectGuess,setIsCorrectGuess] = useState(false);
    const [options,setOptions] = useState([]);
    const { width, height } = useWindowSize();
    const [funFact,setFunfact] = useState('');
    const [trivia,setTrivia] = useState('');
    const [score,setScore] = useState([0,0]);
    const [showReset,setShowReset] = useState(false);

    const handleOptionClick = (option) => {
        if(answer == option){
            setIsCorrectGuess(true);
            setScore((prevScore) => {
                const newScore = [...prevScore];
                newScore[0] += 1; // Update the correct score
                return newScore;
            });
        }
        else{
            setIsCorrectGuess(false);
            setScore((prevScore) => {
                const newScore = [...prevScore];
                newScore[1] += 1; // Update the correct score
                return newScore;
            });
            
        }
        setShowFeedbackModal(true);
    }

    const handleNextClick = () => {
        setIsCorrectGuess(false);
        setShowFeedbackModal(false);
        fetchClue(index+1);
        setIndex(index+1);
        if(index>=21){
          setShowReset(true);
        }
    }

    useEffect(()=>{
      if(showReset){
        setIndex(0);
        fetchClue(index);
      }
    },[showReset])

    const fetchClue = async (index) => {
        try {
          const response = await fetch(`http://localhost:8091/globetrotter/destination/${index}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setClue(data.clues[0]); // Assuming the API returns an object with a 'clue' property
          setAnswer(data.city);
          setOptions(data.options);
          setFunfact(data.funFact[0]);
          setTrivia(data.trivia[0]);
        } catch (error) {
          console.error('Error fetching clue:', error);
        }
      };
    
      useEffect(() => {
        fetchClue(0); // Fetch the clue on component mount
      }, [showReset]);
    
      const handleReset = () => {
        setScore([0,0]);
       
        setShowReset(false);
      }
  
    return (
        <div>
            <Header>Globetrotter</Header>
            <SubHeading>Where in the world ? Take a guess !</SubHeading>
            
            {isCorrectGuess && <Confetti width={width} height={height} recycle={false} numberOfPieces={400}/>}
            {!showReset && <>{showFeedbackModal ? <FeedbackModal isCorrectGuess={isCorrectGuess} handleNextClick={handleNextClick} funFact={funFact} trivia={trivia} score={score}/> :
            <GameContainer>
                <ClueContainer clue={clue}/>
                <OptionsContainer options={options} handleOptionClick={handleOptionClick}/>
            </GameContainer>}</>}
            {showReset && <><ResetButton onClick={() => handleReset()}>Reset</ResetButton>
                  Total Correct Answers : {score[0]}</>}
        </div>
    )
}
