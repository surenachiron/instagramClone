import PostsViewer from './posts';

const HomeContent = () => {
  return (
    <div className="col-span-1 desktop:col-span-2">
      <PostsViewer />
    </div>
  );
};

export default HomeContent;
