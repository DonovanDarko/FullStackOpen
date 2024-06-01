const Part = ({ part }) => {
    return ( 
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => 
                    <Part key={part.id} part={part} />
                )}
            </ul>
        </div>
    )
}

export default Course