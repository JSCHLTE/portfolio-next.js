import AnimatedText from "@/app/utils/animated-text/AnimatedText";

const JobTitle = ({ title, workPlace, location, dateStart, dateEnd, tasks, active }) => {

    const formatDate = (dateString) => {
        const correctString = dateString.toLowerCase();
        if(!correctString || correctString == 'present') return 'Present';
        const [year, month] = correctString.split('-');
        const dateObj = new Date(Date(year, month - 1, 1));
        return dateObj.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
            timeZone: 'America/New_York',
        });
    }

  return (
    <section className={`works-item ${active ? active : ''}`}>
    <h2 className='works-title'><AnimatedText text={title}/></h2>
      <p className='works-meta'>
        <span>{workPlace} – {location}</span> | 
        <time dateTime={dateStart}> {formatDate(dateStart)}</time> - <time dateTime={dateEnd ? dateEnd : ''}>{formatDate(dateEnd)}</time>
      </p>
      <ul className='works-desc'>
        {tasks.map((task, index) => (
            <li key={index}>{task}</li>
        ))}
      </ul>
  </section>
  )
}

export default JobTitle