import axios from 'axios';

export const githubAapi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
});