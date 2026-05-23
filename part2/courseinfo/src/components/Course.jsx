import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
console.log('course', courses)


const individual_courses = courses.map(course => {
                return course.name
            })
console.log(individual_courses)

    return (
        <div>
            {courses.map(course => 
                <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts}/>
                </div>
            )}
            
        </div>
    )
}

export default Course