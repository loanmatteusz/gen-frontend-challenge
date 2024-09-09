import { Routes } from '@angular/router';

import { BaseComponent } from "./modules/components/pages/base/base.component";
import { PrivateComponent } from "./modules/components/pages/private/private.component";

import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { MusicComponent } from './modules/music/music.component';

export const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [guestGuard],
		children: [
			{
				path: '',
				component: SignInComponent,
			},
			{
				path: 'sign-up',
				component: SignUpComponent,
			},
		],
	},
	{
		path: '',
		component: PrivateComponent,
		canActivate: [authGuard],
		children: [
			{
				path: 'music',
				component: MusicComponent,
			},
		],
	},
];
