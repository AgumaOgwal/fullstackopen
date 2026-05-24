const Person = ({ person, handleDelete }) => 

    <p>
        {person.name} {person.number}
        <button onClick={()=>handleDelete(person)}> delete</button>
    </p>


export default Person
