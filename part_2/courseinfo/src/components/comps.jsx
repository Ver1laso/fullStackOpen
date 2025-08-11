export const TotalExercises = ({course}) => {
  const total = course.parts.reduce((s,p) => s + p.exercises, 0);  // si quitas initialValue y pones un 0 hace el mismo trabajo y con menos codigo
  return <p><b>Total of {total} exercises</b></p>
}


export const Course = ({course}) =>{
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map(part => (
        <p key={part.id}>{part.name}: {part.exercises}</p>
      ))}
      <TotalExercises course={course} />
    </>
  )

}

