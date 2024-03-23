import { createInterface, Interface } from 'readline';

import { BitbucketRepositoryController } from 'controllers/bitbucketRepositoryController';

interface RepositoryApplicationPackagesUpdateCLIControllerClassInterface {
  init(): Promise<void>;
  // TODO: I don’t implement methods below, because application functionality flow
  // TODO: not work, but you can see all logic implementation in BitbucketRepositoryController
  // selectRepository(): Promise<void>;
  // selectPackage(): Promise<void>;
  // changePackageVersion(): Promise<void>;
  // updatePackage(): Promise<void>;
}

// TODO: For more correct structure _readLineInterface and _getUserInput must placed in separate class with name UserCLIController
// TODO: which will be responsible for all CLI operations, which will be in application and RepositoryApplicationPackagesUpdateCLIControllerClass
// TODO: will be extended from UserCLIController

class RepositoryApplicationPackagesUpdateCLIControllerClass
  implements RepositoryApplicationPackagesUpdateCLIControllerClassInterface
{
  private _readLineInterface: Interface;

  constructor() {
    this._readLineInterface = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private _getUserInput(prompt: string): Promise<string> {
    return new Promise(resolve => this._readLineInterface.question(prompt, answer => resolve(answer)));
  }

  public async init(): Promise<void> {
    const username = await this._getUserInput('Enter your BitBucket username: ');
    const password = await this._getUserInput('Enter your BitBucket password: ');

    const result = await BitbucketRepositoryController.authorizeUser(username, password);

    // TODO: based on 'result' - the next steps will be or error in console about invalid
    // TODO: credentials or continuation of execution flow step by step
  }
}

export const RepositoryApplicationPackagesUpdateCLIController =
  new RepositoryApplicationPackagesUpdateCLIControllerClass();
