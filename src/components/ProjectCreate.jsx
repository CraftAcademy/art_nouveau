import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { isArtist } from "../modules/userRoles";
const ProjectCreate = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      { currentUser && isArtist(currentUser) ? (
        <div data-cy="project-create-ui">ProjectCreate Interface</div>
      ) : (
        <Navigate to={"/"} replace={true} state={{ message: "You can't do that as a developer" }} />
      )}
    </>
  );
};

export default ProjectCreate;
