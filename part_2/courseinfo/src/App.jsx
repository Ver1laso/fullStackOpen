// const TotalExercises = ({course}) => {
//   let total = 0
//   course.parts.forEach(part =>{
//     total += part.exercises
//   })
//   return <p><b>total of {total} exercises</b></p>
// }
const initialValue = 0
const total = course.parts.reduce((s,p) => {
  return s + p.exercises 
}, initialValue)

const TotalExercises = ({course}) => {
  const total = course.parts.reduce((s,p) => s + p.exercises, initialValue);
  return <p><b>Total of {total} exercises</b></p>
}


const Course = ({course}) =>{
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map(part => (
        <p key={part.id}>{part.name}: {part.exercises}</p>
      ))}
    </>
  )

}


const App = () => {

  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id:1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return(
    <>
     <Course course={course} />
     <TotalExercises course={course} />
     </>
    )
}

export default App
