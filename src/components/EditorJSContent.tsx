const EditorJSContent = ({ content }) => {
    return (
        <div>
            {content.blocks.map((block, index) => (
                <div key={index}>
                    {block.type === 'paragraph' && <p>{block.data.text}</p>}
                    {/* Add additional cases for other block types */}
                </div>
            ))}
        </div>
    );
};

export default EditorJSContent;
