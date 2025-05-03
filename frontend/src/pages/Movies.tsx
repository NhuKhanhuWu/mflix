/** @format */

import { useState } from "react";
import CustomModal from "../ui/Modal";
// import Button from "../ui/Button";
import DesktopFilter from "../features/movies/MovieFilter";

function Movies() {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div>
      {/* filter/sorter sidebar */}
      <div>
        <button
          className="primary-btn btn"
          onClick={() => setOpenModal(!isOpenModal)}>
          Filter/Sort
        </button>
        <CustomModal open={isOpenModal} setOpen={setOpenModal}>
          <DesktopFilter setOpen={setOpenModal}></DesktopFilter>
        </CustomModal>
      </div>

      {/* movies */}
    </div>
  );
}

export default Movies;
