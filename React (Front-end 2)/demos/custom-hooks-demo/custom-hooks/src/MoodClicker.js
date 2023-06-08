import useToggleState from "./hooks/useToggleState";
import './MoodClicker.css';

const MoodClicker = () => {
    
    // useToggleState returns the current state and the function to toggle it, 
    // they can be destuctured just like with other hooks
    // this also handles the state so that it doesn't have to be imported into this file anymore.

    const [isDrunk, toggleMood] = useToggleState(true);
    const [isDarkMode, toggleMode] = useToggleState(false);

    return (
        <div className={isDarkMode ? 'MoodClicker-Dark' : 'MoodClicker-Light'}>
            <h1>{isDrunk ? '😚' : '😟' }</h1>
            <button onClick={toggleMood} >Change Mood</button>
            <button onClick={toggleMode} >Toggle Dark Mode</button>
        </div>
    )
}

export default MoodClicker;