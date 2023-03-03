
export const CalendarEventBox = ({event}) => {
    
    const { title, notes, user} = event;


  return (
    <>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </>
  )
}
