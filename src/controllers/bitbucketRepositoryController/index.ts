import { REPOSITORY_MAIN_BRANCH, REPOSITORY_JSON_FILE_PATH } from 'config/index';

import { BitBucketApiService } from 'services/api/bitbucketService';

import { PackageJSONFile } from 'domain/bitbucketRepository';

import { UserCredentials } from 'domain/bitbucketRepository';
import { Nullable } from 'types/index';

interface BitbucketRepositoryControllerClassInterface {
  authorizeUser(username: string, password: string): Promise<void>;
  getWorkspaceRepositories(): Promise<string[] | undefined>;
  selectRepository(repositoryName: string): void;
  getPackageDependencies(): Promise<string[] | undefined>;
  selectPackageDependency(dependencyName: string): void;
  selectPackageVersion(version: string): void;
  updatePackageJson(branchName: string, commitMessage: string, pullRequestTitle: string): Promise<void>;
}

class BitbucketRepositoryControllerClass implements BitbucketRepositoryControllerClassInterface {
  private _userCredentials: Nullable<UserCredentials> = null;
  private _repositoryName: Nullable<string> = null;
  private _packageJSONFile: Nullable<PackageJSONFile> = null;
  private _dependencyName: Nullable<string> = null;
  private _dependencyVersion: Nullable<string> = null;

  // TODO: In future this method must be located in separate controller (which will be responsible for auth). For interface segregation
  public async authorizeUser(username: string, password: string): Promise<void> {
    const { isSuccess } = await BitBucketApiService.validateUserExist({ username, password });

    if (isSuccess) this._userCredentials = { username, password };
    else {
      // TODO: Process and return error by type, which will be determined in subsidiaryBinders/enums/errors.ts
    }
  }

  public async getWorkspaceRepositories(): Promise<string[] | undefined> {
    const { isSuccess, data } = await BitBucketApiService.getRepositoriesList();

    if (isSuccess && data) return data.map(({ name }) => name);
    else {
      // TODO: Process and return error by type, which will be determined in subsidiaryBinders/enums/errors.ts
      return;
    }
  }

  public selectRepository(repositoryName: string): void {
    // TODO: Add comparing entered repositoryName by user and existed repositoriesNames in collection of repositories.
    // TODO: Also, for this functionality we will need to store repositories collection in class field
    this._repositoryName = repositoryName;
  }

  public async getPackageDependencies(): Promise<string[] | undefined> {
    if (!this._repositoryName) {
      // TODO: Process and return error
      return;
    }

    const { isSuccess, data: packageJson } = await BitBucketApiService.getPackageJsonFile(this._repositoryName);

    if (isSuccess && packageJson) {
      this._packageJSONFile = packageJson;
      return Object.keys(packageJson.dependencies);
    } else {
      // TODO: Process and return error by type, which will be determined in subsidiaryBinders/enums/errors.ts
      return;
    }
  }

  public selectPackageDependency(dependencyName: string): void {
    if (this._packageJSONFile && Object.keys(this._packageJSONFile.dependencies).includes(dependencyName))
      this._dependencyName = dependencyName;
    else {
      // TODO: Process and return error
    }
  }

  public selectPackageVersion(version: string): void {
    // TODO: Add regExp for checking format of version and if testing regExp success - save value
    this._dependencyVersion = version;
  }

  // TODO: Here the functionality should be divided into separate methods so that
  // TODO: one method does not perform all the logic. For now it’s implemented here since
  // TODO: I made it on time to implement it on Friday, but the plan was to separate it into
  // TODO: separate methods
  public async updatePackageJson(
    branchName: string,
    commitMessage: string,
    pullRequestTitle: string
  ): Promise<void | undefined> {
    if (!this._repositoryName || !this._dependencyName || !this._dependencyVersion || !this._userCredentials) {
      // TODO: Process and return error
      return;
    }

    const updatedJSON = { ...this._packageJSONFile, [this._dependencyName]: this._dependencyVersion };

    const { isSuccess: isBranchSuccessCreated, data: newBranch } = await BitBucketApiService.createBranch(
      this._repositoryName,
      {
        name: branchName,
        target: { hash: REPOSITORY_MAIN_BRANCH }
      }
    );

    if (isBranchSuccessCreated && newBranch) {
      const { isSuccess: isCommitSuccessCreated } = await BitBucketApiService.createCommit(
        this._repositoryName,
        {
          branch: newBranch.name,
          message: commitMessage,
          parents: [REPOSITORY_MAIN_BRANCH],
          source: { path: REPOSITORY_JSON_FILE_PATH },
          content: JSON.stringify(updatedJSON, null, 2)
        },
        this._userCredentials
      );

      if (isCommitSuccessCreated) {
        const { isSuccess: isPRSuccessCreated } = await BitBucketApiService.createPullRequest(
          this._repositoryName,
          {
            title: pullRequestTitle,
            source: { branch: { name: branchName } },
            destination: { branch: { name: REPOSITORY_MAIN_BRANCH } }
          },
          this._userCredentials
        );

        if (isPRSuccessCreated) {
          // TODO: Return success message or something else
        } else {
          // TODO: Process and return error by type, which will be determined in subsidiaryBinders/enums/errors.ts
          return;
        }
      } else {
        // TODO: Process and return error by type, which will be determined in subsidiaryBinders/enums/errors.ts
        return;
      }
    } else {
      // TODO: Process and return error by type, which will be determined in subsidiaryBinders/enums/errors.ts
      return;
    }
  }
}

export const BitbucketRepositoryController = new BitbucketRepositoryControllerClass();
