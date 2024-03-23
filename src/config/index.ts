import dotenv from 'dotenv';
dotenv.config();

export const REPOSITORY_MAIN_BRANCH = process.env.REPOSITORY_MAIN_BRANCH || '';
export const REPOSITORY_JSON_FILE_PATH = process.env.REPOSITORY_JSON_FILE_PATH || '';
export const BITBUCKET_CLOUD_API_URL = process.env.BITBUCKET_CLOUD_API_URL || '';
export const BITBUCKET_WORKSPACE_NAME = process.env.BITBUCKET_WORKSPACE_NAME || '';
export const BITBUCKET_REPOSITORY_ACCESS_TOKEN = process.env.BITBUCKET_REPOSITORY_ACCESS_TOKEN || '';
