import React, { Component } from 'react';


function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

const ProductRender = (props) => (


	<ol className="inventaire">
		<br/>
		<img src={props.image} alt={props.name} />
		<div className="blockinfo">
		<h3 className="nom-voiture">
			{
				props.name
			}
			<br/><span className="price">Prix: {formatPrice(props.price)}</span>
			<br/><span className="price">Stock: {props.quantity}</span>
		</h3>
		<p>{props.desc}</p>
		</div>
		{
			props.quantity > 0 && !props.editable ?
				<button onClick={props.onAdd} className="ajoute-au-panier">Ajouter</button>
			:
				null
		}
		
		{
			props.editable ?
				<button onClick={props.onEdit} className="ajoute-au-panier">Modifier</button>
			:
				null
		}
		{
			props.editable ?
				<div>
				<div>
					<button
						onClick={props.onDecrement}
						className="ajoute-au-panier"
					>
						Retirer
					</button>
				</div>
				<div>
					<button
						onClick={props.onIncrement}
						className="ajoute-au-panier"
					>
						Rajouter
					</button>
				</div>
				</div>
			:
				null
		}
		{
			props.editable ?
				<button onClick={props.onDelete} className="ajoute-au-panier">Supprimer</button>
			:
				null
		}
	</ol>)

const styleEditableInput = {
	width: "95%",
	backgroundColor: "transparent",
	borderRadius:20,
	borderRadiusInputTopLeft:20,
    borderRadiusInputTopRight:20,
    borderRadiusInputBottomLeft:20,
    borderRadiusInputBottomRight:20
}

const ProductEditable = (props) => (
	<div
		className="inventaire"
		style={styleEditableInput}
	>
		<br/><input placeholder="Nom" style={styleEditableInput} type="text" value={props.name} onChange={(e) => props.onChangeName(e.target.value)}/><br/><br/>
		<input placeholder="Prix" style={styleEditableInput} type="text" value={props.price} onChange={(e) => props.onChangePrice(e.target.value)}/><br/><br/>
		<input placeholder="Qualité/Défauts" style={styleEditableInput} type="text" value={props.desc} onChange={(e) => props.onChangeDescription(e.target.value)}/><br/><br/>
		<input placeholder="URL de l'image" style={styleEditableInput} type="text" value={props.image} onChange={(e) => props.onChangeImage(e.target.value)}/><br/>
		{
			!props.add ?
				<button onClick={props.onCancel}>Annuler</button>
			:
				null
		}
		<br />
		<button onClick={props.onAdd} className="ajoute-au-panier">{ props.add ? "Ajouter" : "Confirmer" }</button>
	<div>
		<br/>
	</div>
	</div>)


const Product = (props) => {
	if (props.edit) {
		return <ProductEditable {...props} />;
	}
	return <ProductRender {...props}/>
}

export default Product