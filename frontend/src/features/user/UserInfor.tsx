/** @format */

import { useQuery } from "@tanstack/react-query";
import { getMyInfor } from "../../api/user/getMyInfor";
import { UserProps } from "../../interfaces/userInterface";
import LoadAndErr from "../../ui/common/Spinner";

function UserInfor() {
  const { data, isPending, isError } = useQuery<UserProps>({
    queryKey: ["user"],
    queryFn: () => getMyInfor(),
  });

  return (
    <div className="flex flex-col gap-3 text-center flex-shrink-0">
      <LoadAndErr isLoading={isPending} isError={isError} />
      {/* avartar */}
      <img
        className="h-[20rem] w-[20rem] rounded-full"
        loading="lazy"
        src={data?.avartar}
      />

      {/* infor */}
      <span className="text-3xl font-semibold">{data?.name}</span>
      <span className="text-[rgb(169,169,169)]">{data?.email}</span>
    </div>
  );
}

export default UserInfor;
