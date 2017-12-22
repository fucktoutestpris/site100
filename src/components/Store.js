import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Switch, Link, Route } from "react-router-dom";

import Product from "./Product";

import {
	store_toggle_edit_product,
	store_add_product,
	store_edit_product,
	store_confirm_edit,
	store_increment_product,
	store_decrement_product,
	store_delete_product,
	store_add_product_to_cart,
	store_remove_product_to_cart,
	store_valid_cart,
} from "../services/store/actions";

function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

class Store extends Component {

	state = {
		text:"",
		product: {
			name: "",
			image: "",
			price: "",
			desc: ""
		}
	}

	constructor(props) {
		super(props);
		this.changeProductField = this._changeProductField.bind(this);
	}

	_changeProductField(field, value) {
		var {product} = this.state;
		product[field] = value;
		this.setState({
			product
		});
	}

	render() {

		const order = [];
		let finalPrice = 0;

		this.props.store.cart.map((item) => {
			var indexItem = this.props.store.items.findIndex((obj) => item == obj.id);
			if (indexItem > -1) {
				var product = this.props.store.items[indexItem];
				var orderIndex = order.findIndex((obj) => item == obj.id);
				var exists = orderIndex > -1;
				if (!exists) {
					order.push(
						{
							id: item,
							price: parseInt(product.price),
							quantity: 1
						}
					);
				} else {
					order[orderIndex].quantity++;
				}
				finalPrice += parseInt(product.price);
			}
		});


		return (
			<div className="wrap2 fond">

			<div className="inventory">
				<div><h1 className="oui">BBD de GoldDiggers</h1></div><br/>
					<Product
						edit
						add
						{
							...this.state.product
						}
						onAdd={() => {
							function isNumber(n) {
								return !isNaN(parseFloat(n)) && isFinite(n);
							}

							if (!isNumber(this.state.product.price)) {
								alert("Sois pas radin..");
							} else {
								this.props.store_add_product(this.state.product);
								var {product} = this.state;
								product = {
									name: "",
									image: "",
									price: "",
									desc: ""
								};
								this.setState({
									product
								});
							}
						}}
						onChangeImage={(value) => this.changeProductField("image", value)}
						onChangeName={(value) => this.changeProductField("name", value)}
						onChangePrice={(value) => this.changeProductField("price", value)}
						onChangeDescription={(value) => this.changeProductField("desc", value)}
					/>

					
					{
						this.props.store.items.map((item) => {

							var index = this.props.store.edits.findIndex((obj) => obj.id == item.id);

							var edition = {};

							if (index > -1) {
								edition = this.props.store.edits[index];
							}

							return (
								<Product
									key={item.id}
									{...item}
									{...edition}
									edit={index > -1}
									onEdit={() => this.props.store_toggle_edit_product(item)}
									onCancel={() => this.props.store_toggle_edit_product(item)}
									onAdd={() => {
										this.props.store_confirm_edit(item);
										this.props.store_toggle_edit_product(item);
									}} 

									onIncrement={() => this.props.store_increment_product(item)}
									onDecrement={() => this.props.store_decrement_product(item)}

									onDelete={() => this.props.store_delete_product(item)}

									onChangeImage={(value) => this.props.store_edit_product({ id: item.id, field: "image", value: value})}
									onChangeName={(value) => this.props.store_edit_product({ id: item.id, field: "name", value: value})}
									onChangePrice={(value) => this.props.store_edit_product({ id: item.id, field: "price", value: value})}
									onChangeDescription={(value) => this.props.store_edit_product({ id: item.id, field: "desc", value: value})}

									editable
								/>
							);
						})
					}
				</div>


				<div className="store">
				<br/>
					<div><h1 className="oui"> Store </h1></div>
					{
						this.props.store.items.map((item) => {
							return (
								<Product
									key={item.id}
									{...item}
									onAdd={() => this.props.store_add_product_to_cart(item)}
								/>
							);
						})
					}
				</div>

				<div className="cart">
					<div><h1>Votre Panier</h1></div>

					<div className="blockprix">

						{
							order.map((item, index) => {

								var indexItem = this.props.store.items.findIndex((obj) => item.id == obj.id);

								if (indexItem > -1) {
									var product = this.props.store.items[indexItem];
									return (
										<div className="blockPrix"
											key={index}
											style={{
												display: "flex",
												flex: 1,
												justifyContent: "space-between",
												width: "100%",
											}}
										>
											<span className="nomPanier">
											{
												product.name
											}
											</span>
											<button onClick={() => this.props.store_remove_product_to_cart(product)}>
												-
											</button>
											<span>
											{
												item.quantity
											}
											</span>
										</div>
									);
								}
							})
						
						}
					</div>
					<div className="blockPanier">
						{
							order.length > 0 ?
								<div
									style={{
										display: "flex",
										flex: 1,
										justifyContent: "center",
										width: "100%",
										paddingTop: 35,
									}}
								>
									<div className="prix">
										Prix : { formatPrice(finalPrice) }
									</div>
									<button
										onClick={() => this.props.store_valid_cart()}
										className="ajoute-au-panier"
										id="acheter"
									>
										Acheter
									</button>
								</div>

							:
								null
						}
					</div>
				</div>
				
			</div>
		);
	}

}


const mapStateToProps = (state) => ({
	store: state.store,
});


const mapActionsToProps = (dispatch) => ({
	store_toggle_edit_product: bindActionCreators(store_toggle_edit_product, dispatch),
	store_add_product: bindActionCreators(store_add_product, dispatch),
	store_edit_product: bindActionCreators(store_edit_product, dispatch),
	store_confirm_edit: bindActionCreators(store_confirm_edit, dispatch),
	store_increment_product: bindActionCreators(store_increment_product, dispatch),
	store_decrement_product: bindActionCreators(store_decrement_product, dispatch),
	store_delete_product: bindActionCreators(store_delete_product, dispatch),
	store_add_product_to_cart: bindActionCreators(store_add_product_to_cart, dispatch),
	store_remove_product_to_cart: bindActionCreators(store_remove_product_to_cart, dispatch),
	store_valid_cart: bindActionCreators(store_valid_cart, dispatch),
	store_remove_product_to_cart: bindActionCreators(store_remove_product_to_cart, dispatch),
});


export default connect(mapStateToProps, mapActionsToProps)( Store );