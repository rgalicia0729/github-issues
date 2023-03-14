import { Link, Navigate, useParams } from 'react-router-dom';
import { Loading } from '../../shared/Loading';

import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hooks/useIssue';

export const IssueView = () => {

  const params = useParams();
  const { id } = params;

  const { issueQuery, issueCommentsQuery } = useIssue(Number(id));

  if (issueQuery.isLoading) {
    return <Loading />
  }

  if (!issueQuery.data) {
    <Navigate to='issues/list' />
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>

      <IssueComment issue={issueQuery.data!} />

      {
        issueCommentsQuery.isLoading && <Loading />
      }

      {
        issueCommentsQuery.data?.map(issue => (
          <IssueComment key={issue.id} issue={issue} />
        ))
      }
    </div>
  )
}
