import Box from "./Box";
import Title from "./Title";
import NewBoxForm from "./NewBoxForm";
import {useState} from "react";
import { v4 as uuid } from 'uuid';

const BoxList = () => {
    const [boxes, setBoxes] = useState([])

    const removeFunc = (id) => {
        
        const boxToDelete = boxes.find(box => {
            box.props.id === id});
        const idx = boxes.indexOf(boxToDelete);
        setBoxes(boxes => {
            boxes = boxes.splice(idx, 1);
            return boxes;
        });
    }

    const addBoxFunc = (color, height, width) => {
        const id = uuid();
        const newBox = <Box id={id} color={color} height={height} width={width} removeFunc={() => removeFunc(id)}/>;
        setBoxes(boxes => boxes = [...boxes, newBox]);
    }

    return (
        <>
            <Title length={boxes.length}/>
            <NewBoxForm addBoxFunc={addBoxFunc}/>
            {boxes}
        </>
    )}

export default BoxList;