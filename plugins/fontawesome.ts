import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faUserTieHair,
	faDisplayCode,
	faNewspaper,
	faEnvelope,
} from '@fortawesome/pro-light-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(
	faLinkedin,
	faGithub,
	faUserTieHair,
	faDisplayCode,
	faNewspaper,
	faEnvelope
);

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('fa-icon', FontAwesomeIcon);
});

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		FaIcon: typeof FontAwesomeIcon;
	}
}
