import { ModalRoute } from './ModalRoute';
import DuplicateShowSinglePost from './DuplicatePost';

export default async function PhotoModal({ params: { post } }: { params: { post: string } }) {
  return (
    <ModalRoute>
      <DuplicateShowSinglePost params={{ post: post }} />
    </ModalRoute>
  );
}
