
import * as types from "./constants";


export function store_change_name_store(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_CHANGE_NAME_STORE,
			payload
		})
	}
}

export function store_valid_store_name() {
	return(dispatch, state) => {
		dispatch({
			type: types.STORE_VALID_NAME_STORE
		});
	}
}


export function store_toggle_edit_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_TOGGLE_EDIT,
			payload
		})
	}
}



export function store_add_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_ADD_PRODUCT,
			payload
		})
	}
}

export function store_edit_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_EDIT_FIELD_PRODUCT,
			payload: {
				id: payload.id,
				field: payload.field,
				value: payload.value
			}
		})
	}
}


export function store_confirm_edit(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_CONFIRM_EDIT,
			payload
		})
	}
}




export function store_increment_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_INCREMENT_PRODUCT_QUANITY,
			payload
		})
	}
}




export function store_decrement_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_DECREMENT_PRODUCT_QUANITY,
			payload
		})
	}
}


export function store_add_product_to_cart(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_ADD_TO_CART,
			payload
		})
	}
}

export function store_remove_product_to_cart(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_REMOVE_TO_CART,
			payload
		})
	}
}

export function store_delete_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_DELETE_PRODUCT,
			payload
		})
	}
}


export function store_valid_cart() {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_VALID_CART
		})
	}
}