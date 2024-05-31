import ShowStoriesMap from '../_component/HomeContent/story/ShowStoriesMap';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const ShowStories = async () => {
  const data = await getData();
  return <ShowStoriesMap data={data} />;
};

export default ShowStories;
