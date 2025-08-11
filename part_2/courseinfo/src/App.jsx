import {Course} from './components/comps.jsx'


// const initialValue = 0 // Se puede usar esta constante o directamente puedes sustituir intialValue por 0 en reduce



const App = () => {

  const courses = [
    {
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  // FORMA MANUAL DE HACERLO PERO NO OPTIMA YA QUE HAY QUE METER A MANO TODOS LOS ARRAYS
  // return(
  //   <>
  //   <h1>Web development curriculum</h1>
  //    <Course course={course[0]} />
  //    <TotalExercises course={course[0]} />
  //    <Course course={course[1]} />
  //    <TotalExercises course={course[1]} />
  //    </>
  //   )

  return(
    <>
    <h1>Web Development Curriculum</h1>
    {courses.map(course =>
      <Course key={course.id} course={course} />
    )}
    </>
  )
}

export default App
