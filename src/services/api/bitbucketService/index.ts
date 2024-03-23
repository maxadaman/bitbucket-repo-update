import { BITBUCKET_WORKSPACE_NAME } from 'config/index';

import {
  UserCredentials,
  Repository,
  RepositoriesModel,
  PackageJSONFile,
  BranchModel,
  Branch,
  CreateBranchData,
  CreateCommitData,
  CreatePRData
} from 'domain/bitbucketRepository';

import request from 'utils/request';
import { isApiResponse } from 'utils/typesGuardians';

import { repositoriesShaper, branchShaper } from './shapers';

import { BITBUCKET_REPOSITORY_REQUEST_ROUTES } from 'subsidiaryBinders/constants/api';
import { DEFAULT_API_ERROR_RESPONSE } from 'subsidiaryBinders/constants/errors';

import { Response } from 'types/index';

export class BitBucketApiService {
  static async validateUserExist(userCredentials: UserCredentials): Promise<Response<void | undefined>> {
    try {
      return await request.get<void>(BITBUCKET_REPOSITORY_REQUEST_ROUTES.getUser, { auth: userCredentials });
    } catch (err) {
      if (isApiResponse(err)) return err;
      return DEFAULT_API_ERROR_RESPONSE;
    }
  }

  static async getRepositoriesList(): Promise<Response<Repository[] | undefined>> {
    try {
      const { isSuccess, data, error } = await request.get<RepositoriesModel>(
        BITBUCKET_REPOSITORY_REQUEST_ROUTES.repositoriesByWorkspace(BITBUCKET_WORKSPACE_NAME)
      );

      const repositories = repositoriesShaper(data);

      return { isSuccess, data: repositories, error };
    } catch (err) {
      if (isApiResponse(err)) return err;
      return DEFAULT_API_ERROR_RESPONSE;
    }
  }

  static async getPackageJsonFile(repositoryName: string): Promise<Response<PackageJSONFile | undefined>> {
    try {
      return await request.get<PackageJSONFile>(
        BITBUCKET_REPOSITORY_REQUEST_ROUTES.packageJsonFile(BITBUCKET_WORKSPACE_NAME, repositoryName)
      );
    } catch (err) {
      if (isApiResponse(err)) return err;
      return DEFAULT_API_ERROR_RESPONSE;
    }
  }

  static async createBranch(
    repositoryName: string,
    createBranchData: CreateBranchData
  ): Promise<Response<Branch | undefined>> {
    try {
      const { isSuccess, data, error } = await request.post<BranchModel>(
        BITBUCKET_REPOSITORY_REQUEST_ROUTES.createBranch(BITBUCKET_WORKSPACE_NAME, repositoryName),
        createBranchData
      );

      const branchData = branchShaper(data);

      return { isSuccess, data: branchData, error };
    } catch (err) {
      if (isApiResponse(err)) return err;
      return DEFAULT_API_ERROR_RESPONSE;
    }
  }

  static async createCommit(
    repositoryName: string,
    createCommitData: CreateCommitData,
    userCredentials: UserCredentials
  ): Promise<Response<void | undefined>> {
    try {
      return await request.put<void>(
        BITBUCKET_REPOSITORY_REQUEST_ROUTES.createCommit(BITBUCKET_WORKSPACE_NAME, repositoryName),
        createCommitData,
        { auth: userCredentials }
      );
    } catch (err) {
      if (isApiResponse(err)) return err;
      return DEFAULT_API_ERROR_RESPONSE;
    }
  }

  static async createPullRequest(
    repositoryName: string,
    createPullRequestData: CreatePRData,
    userCredentials: UserCredentials
  ): Promise<Response<void | undefined>> {
    try {
      return await request.post<void>(
        BITBUCKET_REPOSITORY_REQUEST_ROUTES.createPullRequest(BITBUCKET_WORKSPACE_NAME, repositoryName),
        createPullRequestData,
        { auth: userCredentials }
      );
    } catch (err) {
      if (isApiResponse(err)) return err;
      return DEFAULT_API_ERROR_RESPONSE;
    }
  }
}
