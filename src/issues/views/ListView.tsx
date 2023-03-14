import { useState } from 'react';

import { Loading } from '../../shared/Loading';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';
import { State } from '../interfaces/issue';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChanged = (labelName: string): void => {
    (selectedLabels.includes(labelName))
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  }

  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? <Loading />
            : <IssueList
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChanged={(newState) => setState(newState)}
            />
        }
        <button
          className="btn btn-outline-primary mt-2"
          disabled={!issuesQuery.hasNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load More...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
