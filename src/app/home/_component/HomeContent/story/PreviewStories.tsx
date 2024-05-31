import PreviewStoryMap from './PreviewStoryMap';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// also i should get user stories that log in in app

const PreviewStories = async () => {
  const data = await getData();
  return (
    // when we want to call data from here, then we'll send it to client side function that include swiper
    <>
      <PreviewStoryMap data={data} />
      <div className="flex justify-center">
        <hr className="w-4/5 h-0.5 my-3 bg-[#e2e2e2]" />
      </div>
    </>
  );
};

export default PreviewStories;
