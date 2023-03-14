import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { githubAapi } from '../../apis/githubApi';
import { sleep } from '../../helpers/sleep';
import { Issue, State } from '../interfaces/issue';

type getIssuesProps = {
    labels: string[];
    state?: State;
    page?: number;
}

const getIssues = async ({ labels, state, page = 1 }: getIssuesProps): Promise<Issue[]> => {
    await sleep(2);

    const params = new URLSearchParams();

    if (state) params.append('state', state);

    if (labels.length > 0) {
        const labelsString = labels.join(',');
        params.append('labels', labelsString);
    }

    params.append('page', page?.toString());
    params.append('per_page', '5');

    const { data } = await githubAapi.get<Issue[]>('/issues', { params });
    return data;
}

type useIssuesProps = {
    labels: string[];
    state?: State;
}

export const useIssues = ({ labels, state }: useIssuesProps) => {
    const [page, setPage] = useState<number>(1);

    const issuesQuery = useQuery(
        ['issues', { state, labels, page }],
        () => getIssues({ labels, state, page })
    );

    return {
        issuesQuery,
        page
    }
}