import "./Box.css";

const Box = ({color, width, height, removeFunc}) => {
    const style = {backgroundColor: color, height: height, width: width}; 
    return (
    <div className="Box" data-testid="box">
        <div style={style}></div>
        <button data-testid="x" onClick={removeFunc}>x</button>
    </div>
)}

export default Box;