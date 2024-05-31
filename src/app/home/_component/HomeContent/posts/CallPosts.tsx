import ShowPosts from './ShowPosts';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const CallPosts = async () => {
  const Posts = await getPosts();

  return <ShowPosts data={Posts} />;
};

export default CallPosts;
