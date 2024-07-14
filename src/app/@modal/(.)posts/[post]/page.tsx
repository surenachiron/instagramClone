import { ModalRoute } from './ModalRoute';
import ShowSinglePost from '@/app/posts/[post]/page';

export default async function PhotoModal({ params: { post } }: { params: { post: string } }) {
  return (
    <ModalRoute>
      <ShowSinglePost
        params={{ post: post }}
        parentClasses="bg-white text-black overflow-auto desktop:w-auto border-0"
      />
    </ModalRoute>
  );
}
