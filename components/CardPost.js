const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between gap-6 items-center">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.content}
        </div>
      </div>
      <button className="btn btn-warning">X</button>
    </li>
  );
};

export default CardPost;
