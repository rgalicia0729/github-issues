import { useQuery } from '@tanstack/react-query';

import { githubAapi } from '../../apis/githubApi';
import { sleep } from '../../helpers/sleep';
import { Issue } from '../interfaces/issue';

export const getIssue = async (issueNumber: number): Promise<Issue> => {
    await sleep(2);
    const { data } = await githubAapi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    await sleep(2);
    const { data } = await githubAapi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
}

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssue(issueNumber)
    );

    const issueCommentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueQuery.data?.number!),
        {
            enabled: issueQuery.data !== undefined
        }
    );

    return {
        issueQuery,
        issueCommentsQuery
    }
}