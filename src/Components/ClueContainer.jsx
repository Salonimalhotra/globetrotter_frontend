import React from 'react'
import styled from 'styled-components';

const ClueContainerStyled = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 95%;
  text-align: center;
  margin-left: 0px;
`;

const ClueText = styled.p`
  font-size: 1.2rem;
  color: #444;
`;

const ClueContainer = ({clue}) => {


  return (
    <ClueContainerStyled>
      <ClueText>
        {clue}
      </ClueText>
    </ClueContainerStyled>
  )
}

export default ClueContainer;