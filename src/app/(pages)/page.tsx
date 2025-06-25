import { projectsThumbData } from "@/app/components/projects/projectsThumbData"
import ProjectsCard from "@/app/components/projects/ProjectsCard"
import '@/app/components/projects/projects.css'

export const metadata = {
  title: 'Projects | Jordan Schulte',
  description: 'Explore projects by Jordan Schulte — showcasing web development, creative coding, and UI/UX design work.',
};

export default function Home() {
  return (
    <div className='projects-wrapper'>
        {projectsThumbData.map((project) => (
            <ProjectsCard key={project.slug} project={project}/>
        ))}
    </div>
  );
}
