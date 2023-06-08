import { useState } from 'react';

const useToggleState = (current = true) => {
    const [state, setState] = useState(current);
    const toggleState = () => {
        setState(!state)
    }
    return [state, toggleState];
}

export default useToggleState;






// const [isDrunk, setIsDrunk] = useState(true);
// const [isDarkMode, setIsDarkMode] = useState(false);
// const toggleMood = () => {
//     setIsDrunk(!isDrunk);
// }
// const toggleMode = () => {
//     setIsDarkMode(!isDarkMode);
// }
