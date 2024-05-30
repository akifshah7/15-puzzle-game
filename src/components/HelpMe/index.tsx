import React from 'react';

interface HelpMeProps {
  nextMove: () => void;
}

const HelpMe: React.FC<HelpMeProps> = ({ nextMove }) => {
  return (
    <div className="button-wrapper">
      <button onClick={nextMove}>Help Me</button>
    </div>
  );
};

export default HelpMe;
