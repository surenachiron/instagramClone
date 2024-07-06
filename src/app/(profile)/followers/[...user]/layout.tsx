import UtileSide from '@/app/home/_component/utileSide';
import NavigateMobile from '@/app/home/_component/utileSide/NavigateMobile';
import BackPage from '@/components/BackPage';

type Props = {
  user: [username: string, user_id: string];
};

export async function generateMetadata({ params }: { params: Props }) {
  return {
    title: `Who Follows ${decodeURIComponent(params.user[0])}`,
  };
}

export default async function FollowersLayout({ children, params }: { children: React.ReactNode; params: Props }) {
  return (
    <div className="grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 tablet:container py-0 tablet:py-5">
      <UtileSide />
      <div className="col-span-1 tablet:col-span-3 bg-white tablet:bg-inherit">
        <div className="text-start block">
          <div className="flex justify-between items-center bg-white tablet:bg-inherit text-black py-2 px-3 sticky top-0 border-b tablet:border-0 border-l-grayMiddle">
            <BackPage className="bg-white left-3" link={`/profile/${decodeURIComponent(params.user[0])}`} />
            <h3 className="font-bold tablet:hidden">Followers</h3>
            <div className="w-[30px]"></div>
          </div>
        </div>
        {children}
        <NavigateMobile />
      </div>
    </div>
  );
}
