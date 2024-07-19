import { ModalRoute } from '../../[post]/ModalRoute';
import DuplicateCommentsPage from './DuplicateComments';

const CommentsIntersectionPage = async ({ params }: { params: { comments: string } }) => {
  return (
    <ModalRoute>
      <DuplicateCommentsPage params={{ comments: params.comments }} />
    </ModalRoute>
  );
};

export default CommentsIntersectionPage;
