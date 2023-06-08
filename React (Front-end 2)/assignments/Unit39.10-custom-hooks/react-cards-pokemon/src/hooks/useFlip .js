import { useState } from "react";

const useFlip = (faceUp = true) => {
    const [ flipped, setFlipped ] = useState(faceUp);
    const flip = () => {
        setFlipped(!flipped);
    }
    return [ flipped, flip ]
}

export default useFlip;