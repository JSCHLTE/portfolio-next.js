const FormatDate = ({ date }) => {

    const [year, month, day] = date.split("-");
    const localDate = new Date(year, month - 1, day);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/New_York"
      }).format(localDate)

  return (
    <span>{formattedDate}</span>
  )
}

export default FormatDate