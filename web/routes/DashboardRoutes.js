import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Accueil',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		link: '/profile',
		title: "Profil de l'utilisateur",
		icon: "user"
	},
	{
		id: uuid(),
		link: '/post-add',
		title: 'Créer une publication',
		icon: "layers"
	},
	{
		id: uuid(),
		link: '/materials',
		title: 'Liste des materiels',
		icon: "book"
	},
	{
		id: uuid(),
		link: '/pricing',
		title: 'Pricing'
	},
	{
		id: uuid(),
		link: '/chatbot',
		title: 'ChatBot',
		icon: "cloud"
	},
	{
		id: uuid(), link: '/404', name: '404 Error'
	},

	{
		id: uuid(),
		title: 'Authentication',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/sign-in', name: "S'authentifier" },
			{ id: uuid(), link: '/sign-up', name: "S'inscrire" },
			{ id: uuid(), link: '/forget-password', name: 'Mot de passe oublié' }
		]
	},
	{
		id: uuid(),
		title: 'Components',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/components/accordions', name: 'Accordions' },
			{ id: uuid(), link: '/components/alerts', name: 'Alerts' },
			{ id: uuid(), link: '/components/badges', name: 'Badges' },
			{ id: uuid(), link: '/components/breadcrumbs', name: 'Breadcrumbs' },
			{ id: uuid(), link: '/components/buttons', name: 'Buttons' },
			{ id: uuid(), link: '/components/button-group', name: 'ButtonGroup' },
			{ id: uuid(), link: '/components/cards', name: 'Cards' },
			{ id: uuid(), link: '/components/carousels', name: 'Carousel' },
			{ id: uuid(), link: '/components/close-button', name: 'Close Button' },
			{ id: uuid(), link: '/components/collapse', name: 'Collapse' },
			{ id: uuid(), link: '/components/dropdowns', name: 'Dropdowns' },
			{ id: uuid(), link: '/components/list-group', name: 'Listgroup' },
			{ id: uuid(), link: '/components/modal', name: 'Modal' },
			{ id: uuid(), link: '/components/navs', name: 'Navs' },
			{ id: uuid(), link: '/components/navbar', name: 'Navbar' },
			{ id: uuid(), link: '/components/offcanvas', name: 'Offcanvas' },
			{ id: uuid(), link: '/components/overlays', name: 'Overlays' },
			{ id: uuid(), link: '/components/pagination', name: 'Pagination' },
			{ id: uuid(), link: '/components/popovers', name: 'Popovers' },
			{ id: uuid(), link: '/components/progress', name: 'Progress' },
			{ id: uuid(), link: '/components/spinners', name: 'Spinners' },
			{ id: uuid(), link: '/components/tables', name: 'Tables' },
			{ id: uuid(), link: '/components/toasts', name: 'Toasts' },
			{ id: uuid(), link: '/components/tooltips', name: 'Tooltips' }
		]
	},
];

export default DashboardMenu;
