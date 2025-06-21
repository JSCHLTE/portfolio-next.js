import AnimatedText from '@/app/utils/animated-text/AnimatedText';

const ProjectsCard = ({ project }) => {
    const { thumbnail, title, desc, github, live } = project

    function formatClassName(tag) {
        return tag.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }    

  return (
    <>
    <div className='projects-card-wrapper'>
        <div className='projects-card-thumbnail-wrapper'>
            <div className='projects-img-wrapper skeleton'>
                <img src={thumbnail} alt='Project thumbnail'/>
            </div>
        </div>
        <div className='projects-card-info-wrapper'>
            <h2 className='projects-card-title'><AnimatedText text={title} /></h2>
            <p className='projects-card-desc'>{desc}</p>
        </div>
        <div className='projects-card-buttons'>
            {live ? <a href={live} target='_blank' rel='noopener noreferrer' className='projects-card-button live button-press'>View Live <i className="fa-solid fa-up-right-from-square"></i></a> : ''}
            {github ? <a href={github} target='_blank' rel='noopener noreferrer' className='projects-card-button github button-press'>View Repo <i className="fa-brands fa-github"></i></a> : ''}
        </div>
    </div>
    </>
  )
}

export default ProjectsCard