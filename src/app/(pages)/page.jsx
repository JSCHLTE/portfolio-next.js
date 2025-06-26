import { projectsThumbData } from "@/app/(pages)/projects/projectsThumbData"
import ProjectsCard from "@/app/(pages)/projects/ProjectsCard"
import '@/app/(pages)/projects/projects.css'
import AnimatedText from '@/app/utils/animated-text/AnimatedText';

export const metadata = {
  title: 'Projects | Jordan Schulte',
  description: 'Explore projects by Jordan Schulte — showcasing web development, creative coding, and UI/UX design work.',
};

export default function Home() {
  return (
    <div className="project-wrapper">
      <h1><AnimatedText text='Projects' /></h1>
      <div className='projects-wrapper'>
          {projectsThumbData.map((project) => (
              <ProjectsCard key={project.slug} project={project}/>
          ))}
      </div>
    </div>
  );
}
