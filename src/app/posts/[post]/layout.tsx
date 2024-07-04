import { supabaseServer } from '@/supabase/utils/server';
import UtileSide from '@/app/home/_component/utileSide';
import NavigateMobile from '@/app/home/_component/utileSide/NavigateMobile';
import BackPage from '@/components/BackPage';

export async function generateMetadata({ params }: { params: { post: string } }) {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('posts')
    .select(`user_id, content, profiles(full_name)`)
    .eq('id', params.post)
    .single();

  if (!data)
    return {
      title: 'Post',
    };

  return {
    title: data?.profiles?.full_name + ' | ' + data?.content,
  };
}

export default async function PostsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { post: string };
}) {
  const supabase = supabaseServer();
  const { data } = await supabase.from('posts').select(`profiles(user_name)`).eq('id', params.post).single();

  return (
    <div className="grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 tablet:container py-0 tablet:py-5">
      <UtileSide />
      <div className="col-span-1 tablet:col-span-3">
        <div className="text-start block tablet:hidden">
          <div className="flex justify-between items-center bg-white text-black py-2 px-5 sticky top-0 border-b border-l-grayMiddle">
            <BackPage className="bg-white left-3" link={`/profile/${data?.profiles?.user_name}`} />
            <h3 className="font-bold">Post</h3>
            <div className="w-[30px]"> </div>
          </div>
        </div>
        <div className="bg-white">{children}</div>
        <NavigateMobile />
      </div>
    </div>
  );
}
