
// Dumb component that simply displays the title and user-created story
const MadlibStory = ({title, story}) => {
    return (
        <>
            <h1>{title}</h1>
            <p>{story}</p>
        </>
    );
}

export default MadlibStory;