import HomeHeader from './_component/Header';
import HomeContent from './_component/HomeContent/HomeContent';
import ProfileSide from './_component/profileSide';

const HomePage = () => {
  return (
    <div>
      <div className="grid col-span-1 tablet:col-span-3">
        <HomeHeader />
      </div>
      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-3">
        <HomeContent />
        <ProfileSide />
      </div>
    </div>
  );
};

export default HomePage;
