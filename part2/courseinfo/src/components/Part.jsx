const Part = ({ parts }) => {

    console.log('Parts', parts)
    return (
        <div>
            {parts.map(part => <p key={part.id}> {part.name} {part.exercises}</p>)}
        </div>
    )
}

export default Part