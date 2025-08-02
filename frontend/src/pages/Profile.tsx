/** @format */

import MyCmt from "../features/comments/MyCmt";
import UserInfor from "../features/user/UserInfor";

function Profile() {
  return (
    <div className="flex gap-12">
      {/* ACCOUNT INFOR */}
      <UserInfor />

      {/* CMT */}
      <MyCmt />
    </div>
  );
}

export default Profile;
