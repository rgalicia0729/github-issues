import { useInfiniteQuery } from '@tanstack/react-query';

import { Issue, State } from '../interfaces/issue';
import { sleep } from '../../helpers/sleep';
import { githubAapi } from '../../apis/githubApi';

type getIssuesProps = {
    pageParam?: number;
    queryKey: (string | useIssuesInfiniteProps)[]
}

const getIssues = async ({ pageParam = 1, queryKey }: getIssuesProps): Promise<Issue[]> => {
    await sleep(2);

    const [, args] = queryKey;
    console.log(queryKey);
    const { state, labels } = args as useIssuesInfiniteProps;

    const params = new URLSearchParams();

    if (state) params.append('state', state);

    if (labels.length > 0) {
        const labelsString = labels.join(',');
        params.append('labels', labelsString);
    }

    params.append('page', pageParam?.toString());
    params.append('per_page', '5');

    const { data } = await githubAapi.get<Issue[]>('/issues', { params });
    return data;
}

type useIssuesInfiniteProps = {
    labels: string[];
    state?: State,
    page?: number
}

export const useIssuesInfinite = ({ labels, state, page }: useIssuesInfiniteProps) => {
    const issuesQuery = useInfiniteQuery(
        ['issues', { state, labels, page }],
        getIssues,
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length === 0) return;

                return pages.length + 1;
            }
        }
    );

    return {
        issuesQuery
    }
}