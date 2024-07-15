import { Metadata } from 'next';
import UtileSide from '@/app/(home)/_component/utileSide';
import NavigateMobile from '@/app/(home)/_component/utileSide/NavigateMobile';
import { supabaseServer } from '@/supabase/utils/server';
import BackPage from '@/components/BackPage';

export async function generateMetadata({ params }: { params: { comments: string } }) {
  const supabase = supabaseServer();
  const { data } = await supabase.from('posts').select(`user_id, content`).eq('id', params.comments).single();

  if (!data)
    return {
      title: 'Comment',
    };

  return {
    title: 'Comments of' + ' | ' + data?.content,
  };
}

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 tablet:container py-0 tablet:py-5 bg-white">
      <UtileSide />
      <div className="col-span-1 tablet:col-span-3">
        <div className="text-start block tablet:hidden">
          <div className="flex justify-between items-center bg-white text-black py-2 px-3 sticky top-0 border-b border-l-grayMiddle">
            <BackPage className="bg-white left-3" />
            <h3 className="font-bold">Comment</h3>
            <div className="w-[30px]"> </div>
          </div>
        </div>
        <div className="bg-white h-full tablet:hidden flex justify-start min-h-[80vh] px-3">{children}</div>
        <NavigateMobile />
      </div>
    </div>
  );
}
