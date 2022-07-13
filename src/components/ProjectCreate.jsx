import { useSelector } from "react-redux";


const ProjectCreate = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <>
      {currentUser.isArtist() && (
        <div data-cy="project-create-ui">ProjectCreate Interface</div>
      )}
    </>
  );
};

export default ProjectCreate;
