import { Match } from './match';

export interface TreeNode {
	left: TreeNode | undefined;
	right: TreeNode | undefined;
	parent: TreeNode | undefined;
	onParentLeft: boolean | undefined;
	match: Match;
}
