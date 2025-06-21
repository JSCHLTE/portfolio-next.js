import { projectsThumbData } from "@/app/components/projects/projectsThumbData"
import ProjectsCard from "@/app/components/projects/ProjectsCard"
import '@/app/components/projects/projects.css'

export default function Home() {
  return (
    <div className='projects-wrapper'>
        {projectsThumbData.map((project) => (
            <ProjectsCard key={project.slug} project={project}/>
        ))}
    </div>
  );
}
