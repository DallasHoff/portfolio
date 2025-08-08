import type { NavbarLink } from '~/components/app/navbar.vue';

export const navbarLinks: NavbarLink[] = [
	{
		label: 'About Me',
		icon: 'fa-light fa-user-tie-hair',
		path: '/',
	},
	{
		label: 'Photos',
		icon: 'fa-light fa-image',
		path: '/photos',
	},
];
