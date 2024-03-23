export type UserCredentials = {
  username: string;
  password: string;
};

export type Repository = {
  uuid: string;
  fullName: string;
  name: string;
  description: string;
  isPrivate: boolean;
};

export type RepositoryModel = {
  uuid: string;
  full_name: string;
  name: string;
  description: string;
  is_private: boolean;
};

export type RepositoriesModel = {
  next: string;
  previous: string;
  values: RepositoryModel[];
};

export type PackageJSONDependencies = {
  [key: string]: string;
};

export type PackageJSONFile = {
  name: string;
  version: string;
  private: boolean;
  dependencies: PackageJSONDependencies;
  // TODO: Add all needed values
};

export type Branch = {
  type: string;
  name: string;
};

export type BranchModel = {
  type: string;
  name: string;
  // TODO: Add all needed values
};

export type CreateBranchData = {
  name: string;
  target: { hash: string };
};

export type CreateCommitData = {
  branch: string;
  message: string;
  parents: string[];
  source: { path: string };
  content: string;
};

export type CreatePRData = {
  title: string;
  source: {
    branch: {
      name: string;
    };
  };
  destination: {
    branch: {
      name: string;
    };
  };
};
