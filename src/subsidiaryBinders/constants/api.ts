import { REPOSITORY_JSON_FILE_PATH } from 'config/index';

import { BitbucketApiVersionsEnum } from 'subsidiaryBinders/enums/api';

export const BITBUCKET_REPOSITORY_REQUEST_ROUTES = {
  getUser: `${BitbucketApiVersionsEnum.v2}/user`,
  repositoriesByWorkspace: (workspaceName: string) => `${BitbucketApiVersionsEnum.v2}/repositories/${workspaceName}`,
  // TODO: For future usage - add third param with fileName, which will be added src/main/${fileName}
  // TODO: Also, this method will be rename from packageJsonFile to repositoryFile
  packageJsonFile: (workspaceName: string, repositoryName: string) =>
    `${BitbucketApiVersionsEnum.v2}/repositories/${workspaceName}/${repositoryName}/src/main/${REPOSITORY_JSON_FILE_PATH}`,
  createBranch: (workspaceName: string, repositoryName: string) =>
    `${BitbucketApiVersionsEnum.v2}/repositories/${workspaceName}/${repositoryName}/refs/branches`,
  createCommit: (workspaceName: string, repositoryName: string) =>
    `${BitbucketApiVersionsEnum.v2}/repositories/${workspaceName}/${repositoryName}/src`,
  createPullRequest: (workspaceName: string, repositoryName: string) =>
    `${BitbucketApiVersionsEnum.v2}/repositories/${workspaceName}/${repositoryName}/pullrequests`
};
