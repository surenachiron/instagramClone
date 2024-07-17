import ShowSinglePost from '@/app/posts/[post]/page';
import { ModalRoute } from './ModalRoute';

export default async function PhotoModal({ params: { post } }: { params: { post: string } }) {
  return (
    <ModalRoute>
      <ShowSinglePost
        params={{ post: post }}
        parentClasses="bg-white text-black overflow-auto desktop:w-3/4 border-0"
      />
    </ModalRoute>
  );
}
