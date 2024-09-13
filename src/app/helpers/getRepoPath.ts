import { environment } from "src/environments/environment";
import { getPathSeparator } from "./getPathSeparator";

export const getRepoPath = (folder: string, repoName: string): string => {
    const sep = getPathSeparator();
    return `${environment.absoluteBaseRepoPath}${sep}${folder}${sep}${repoName}`;
}