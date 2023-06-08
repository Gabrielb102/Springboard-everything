import { useParams } from "react-router-dom";
import "./static/Color.css"

const Color = () => {
    
    const { color } = useParams();

    const styleColor = {
        backgroundColor : color
    };

    return (
        <div className="Color" style={styleColor}>
            <h3>{color}</h3>
        </div>
    )
}

export default Color;