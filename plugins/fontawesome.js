import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faSquareEnvelope,
	faUserTieHair,
	faDisplayCode,
	faNewspaper,
} from '@fortawesome/pro-light-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(
	faSquareEnvelope,
	faLinkedin,
	faGithub,
	faUserTieHair,
	faDisplayCode,
	faNewspaper
);

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {});
});
