import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';

const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

export const handle = SvelteKitAuth({
    providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
});