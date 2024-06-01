const Part = ({part}) => {
    return ( 
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

const totalExercises = ( parts ) => {
    return parts.reduce((sum, part) => sum + part.exercises, 0)
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
            <div>total of {totalExercises(course.parts)} exercises</div>
        </div>
    )
}

export default Course