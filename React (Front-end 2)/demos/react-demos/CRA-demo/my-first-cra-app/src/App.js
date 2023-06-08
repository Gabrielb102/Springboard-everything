import './App.css';
import Recipe from './Recipe.js'

function App() {
  return (
    <div className="App">
      <Recipe name="Doughnuts" ingredients={["flour", "sprinkles", "sugar"]} />
    </div>
  );
}

export default App;
