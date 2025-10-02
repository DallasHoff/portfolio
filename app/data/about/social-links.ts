import type { SocialLink } from '~/components/about/social-links.vue';

export const socialLinks: SocialLink[] = [
	{
		label: 'My LinkedIn Profile',
		icon: 'fa-brands fa-linkedin',
		url: 'https://www.linkedin.com/in/dallas-hoffman/',
		event: 'linkedin-link',
	},
	{
		label: 'My GitHub Profile',
		icon: 'fa-brands fa-github',
		url: 'https://github.com/DallasHoff',
		event: 'github-link',
	},
	{
		label: 'Email Me',
		icon: 'fa-light fa-envelope',
		url: 'mailto:contact@dallashoffman.com',
		event: 'email-link',
	},
];
