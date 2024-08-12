import { useState } from 'react';
import './App.css';

function App() {
  const checkboxes = [1, [1, 2, [1, 2, 3], 4], 2];

  const RecursiveCheckbox = ({ checkbox, isCheck }) => {
    const [isChecked, setIsChecked] = useState(isCheck);
    console.log(isChecked)

    if (!Array.isArray(checkbox)) {
      return (
        <div>
          <input
            type="checkbox"
            id={`checkbox-${checkbox}`}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor={`checkbox-${checkbox}`}>{checkbox}</label>
        </div>
      );
    }

    return (
      <>
        {checkbox.map((box, index) => (
          <div key={index} style={{ paddingLeft: '20px' }}>
            {isChecked?
              <RecursiveCheckbox checkbox={box} isCheck={true} />:
              <RecursiveCheckbox checkbox={box} isCheck={false} />
            }
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <RecursiveCheckbox checkbox={checkboxes} isCheck={false} />
    </div>
  );
}

export default App;
