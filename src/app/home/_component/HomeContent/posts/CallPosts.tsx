import ShowPosts from './ShowPosts';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
  return res.json();
}

const CallPosts = async () => {
  const Posts = await getPosts();

  return <ShowPosts data={Posts} />;
};

export default CallPosts;
