import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
	faCircle,
	faFilter,
	faMagnifyingGlass,
	faPen,
	faPlus,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

library.add(faPen, faTrashCan, faPlus, faFilter, faMagnifyingGlass, faCircle);

export const pen = icon({ prefix: 'fas', iconName: 'pen' }).html;
export const trashCan = icon({ prefix: 'fas', iconName: 'trash-can' }).html;
export const plus = icon({ prefix: 'fas', iconName: 'plus' }).html;
export const filter = icon({ prefix: 'fas', iconName: 'filter' }).html;
export const magnifyingGlass = icon({
	prefix: 'fas',
	iconName: 'magnifying-glass',
}).html;
export const circle = icon({
	prefix: 'fas',
	iconName: 'circle',
}).html;
