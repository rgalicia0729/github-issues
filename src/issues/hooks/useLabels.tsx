import { useQuery } from '@tanstack/react-query';

import { githubAapi } from '../../apis/githubApi';
import { sleep } from '../../helpers/sleep';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const { data } = await githubAapi.get<Label[]>('/labels');

    return data;
}

export const useLabels = () => {
    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60
        }
    );

    return {
        labelsQuery
    }
}