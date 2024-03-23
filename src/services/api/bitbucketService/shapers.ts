import { Repository, RepositoriesModel, RepositoryModel, Branch, BranchModel } from 'domain/bitbucketRepository';

export const repositoryShaper = ({ uuid, full_name, name, description, is_private }: RepositoryModel): Repository => ({
  uuid,
  fullName: full_name,
  name,
  description,
  isPrivate: is_private
});

export const repositoriesShaper = (repositories: RepositoriesModel): Repository[] =>
  repositories.values.map(repo => repositoryShaper(repo));

export const branchShaper = ({ type, name }: BranchModel): Branch => ({
  type,
  name
});
