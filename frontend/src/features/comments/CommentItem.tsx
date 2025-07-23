/** @format */

import { CommentProps } from "../../interfaces/commentInterface";
import formatDate from "../../services/formatDate";
import SmallAvartar from "../../ui/SmallAvartar";

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  console.log(comment.user.avatar);
  return (
    <div className="min-h-20 flex gap-4">
      {/* avatar */}
      <div className="h-full">
        <SmallAvartar avartar={comment.user.avatar} />
      </div>

      {/* text */}
      <div>
        <div className="mb-2">
          <span className="font-bold text-[var(--color-red-600)]">
            {comment.user.name}
          </span>{" "}
          -<span className="font-light"> {formatDate(comment.date)}</span>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
