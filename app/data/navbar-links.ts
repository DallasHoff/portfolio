import type { NavbarLink } from '~/components/app/navbar.vue';

export const navbarLinks: NavbarLink[] = [
	{
		label: 'About Me',
		icon: 'fa-light fa-user-tie-hair',
		path: '/',
	},
	{
		label: 'Projects',
		icon: 'fa-light fa-display-code',
		path: '/projects',
	},
	{
		label: 'Photos',
		icon: 'fa-light fa-image',
		path: '/photos',
	},
];
