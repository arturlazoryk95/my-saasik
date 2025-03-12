const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between gap-6">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed">{post.content}</div>
      </div>
      <button className="btn btn-info">X</button>
    </li>
  );
};

export default CardPost;
