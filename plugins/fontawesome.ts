import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faUserTieHair,
	faDisplayCode,
	faNewspaper,
	faEnvelope,
	faBracketCurlyLeft,
	faBracketCurlyRight,
	faCalendarPlus,
	faCalendarPen,
} from '@fortawesome/pro-light-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(
	faLinkedin,
	faGithub,
	faUserTieHair,
	faDisplayCode,
	faNewspaper,
	faEnvelope,
	faBracketCurlyLeft,
	faBracketCurlyRight,
	faCalendarPlus,
	faCalendarPen,
);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('fa-icon', FontAwesomeIcon);
});

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		FaIcon: typeof FontAwesomeIcon;
	}
}
