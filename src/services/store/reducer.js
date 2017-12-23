import * as types from "./constants";

import fixtures from "./fixtures";

const initialState = {
	//	products
	name: "",
	items: fixtures,
	//	store object to
	edits: [],
	cart: [],
	storeValid: false,
};


export default function reducer(state = initialState, action)
{
	switch (action.type) {

		case types.STORE_VALID_CART:
			var {cart, items} = state;

			cart = [];

			return {
				...state,
				cart,
				items
			}
			break;

		case types.STORE_REMOVE_TO_CART:
			var {cart, items} = state;

			var indexCart = cart.findIndex((obj) => obj == action.payload.id);
			cart.splice(indexCart, 1);

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);
			items[indexItems].quantity++;

			return {
				...state,
				items,
				cart
			}
			break;

		case types.STORE_ADD_TO_CART:
			var {cart, items} = state;

			cart.push(action.payload.id);

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);
			items[indexItems].quantity--;

			return {
				...state,
				items,
				cart
			}
			break;

		case types.STORE_REMOVE_TO_CART:

			return {
				...state,
			}
			break;

		case types.STORE_DELETE_PRODUCT:
			var {items, edits, cart} = state;

			var indexEdit = edits.findIndex((obj) => obj.id == action.payload.id);
			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);
			var indexCart = cart.findIndex((obj) => obj.id == action.payload.id);

			if (indexEdit > -1) {
				edits.splice(indexEdit, 1);
			}

			if (indexItems > -1) {
				items.splice(indexItems, 1);
			}

			if (indexCart > -1) {
				cart.splice(indexCart, 1);
			}

			return {
				...state,
				items, edits, cart
			}
			break;

		case types.STORE_INCREMENT_PRODUCT_QUANITY:
			var {items} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems].quantity++;

			return {
				...state,
				items
			};
			break;

		case types.STORE_DECREMENT_PRODUCT_QUANITY:
			var {items} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems].quantity--;

			if (items[indexItems].quantity <= 0) {
				items[indexItems].quantity = 0;
			}

			return {
				...state,
				items
			};
			break;


		case types.STORE_CONFIRM_EDIT:
			var {items, edits} = state;

			var indexEdit = edits.findIndex((obj) => obj.id == action.payload.id);
			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems] = edits[indexEdit];

			return {
				...state,
				items
			};
			break;


		case types.STORE_ADD_PRODUCT:
			var {items} = state;

			items.push(
				{
					id: Date.now(),
					name: action.payload.name,
					image: action.payload.image,
					desc: action.payload.desc,
					price: action.payload.price,
					quantity: 0,
					available: false,
				}
			);

			return {
				...state,
				items
			}
			break;

		case types.STORE_TOGGLE_EDIT:
			var {edits} = state;

			var index = edits.findIndex((obj) => obj.id == action.payload.id);

			if (index > -1) {
				edits.splice(index, 1);
			} else {
				edits.push(
					{...action.payload}
				);
			}

			return {
				...state,
				edits
			};
			break;

		case types.STORE_CHANGE_NAME_STORE:
			return {
				...state,
				name: action.payload.name
			};
			break;


		case types.STORE_EDIT_FIELD_PRODUCT:
			var {edits} = state;

			var index = edits.findIndex((obj) => obj.id == action.payload.id);

			edits[index][action.payload.field] = action.payload.value;

			return {
				...state,
				edits
			}
			break;

		case types.STORE_VALID_NAME_STORE:
			return {
				...state,
				storeValid: true
			};
			break;

		default:
			return state;
	}
};