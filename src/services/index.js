import {
	createStore, applyMiddleware, compose
} from "redux";

import thunk from "redux-thunk";

import reducers from './reducers';

export default function (initialState) {

	let enhancer = {}

	const middlewares = [
		thunk
	];

	if (process.env.NODE_ENV == "development") {
		//  Dev remote devtools
		const composeEnhancers = typeof window === 'object' &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
				window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
					// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
					name: "ISEN-APPLICATION",
				}) : compose;

		enhancer = composeEnhancers(
			applyMiddleware(
				...middlewares,
			)
		);
	} else {
		enhancer = applyMiddleware(
			...middlewares,
		);
	}

	const store = createStore(reducers, initialState,
		compose(
			enhancer,
		)
	);

	return store;
}