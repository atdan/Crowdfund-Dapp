import { ProjectDetails } from '../components/ProjectDetails'
import { ProjectBackers } from '../components/ProjectBackers'
import { UpdateProject } from '../components/UpdateProject'
import { BackProject } from '../components/BackProject'
import { DeleteProject } from '../components/DeleteProject'

export const Project = () => {
  return (
    <>
        <ProjectDetails/>
        <ProjectBackers/>
        <UpdateProject />
        <BackProject/>
        <DeleteProject/>
    </>
  )
}
