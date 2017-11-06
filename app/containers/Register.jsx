import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IBAN from 'iban';

const propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	email: PropTypes.string
};

const defaultProps = {
	firstName: null,
	lastName: null,
	email: null
};

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: []
		};
	}

	onRegister(event) {
		event.preventDefault();
		event.stopPropagation();

		const form = event.target;
		const accounts = this.state.accounts;
		form.classList.add('was-validated');

		if (form.checkValidity() && accounts.length) {
			const refs = this.refs;
			const bankAccounts = accounts.map((account) => {
				return { iban: account.iban, bankName: account.bankName };
			});

			const userDetails = {
				firstName: refs.firstName.value,
				lastName: refs.lastName.value,
				email: refs.email.value,
				bankAccounts
			};

			alert(`Form data: \n ${JSON.stringify(userDetails, null,'\t')}`);
		}
		else {
			form.classList.add('was-validated');
			form.classList.add('invalid-bank-details');
		}
	};

	onAddBankAccount() {
		const accounts = this.state.accounts;
		accounts.push({ index: Date.now(), iban: '', bankName: '' });
		this.setState({ accounts });
	};

	onRemoveBankAccount(idx){
		const accounts = this.state.accounts;
		accounts.splice(idx, 1);

		this.setState({ accounts });
	};

	onChangeInput(event, account, fieldName){
		const inputField = event.target;

		account[fieldName] = inputField.value;
		this.forceUpdate();

		// check IBAN validation
		if(fieldName === 'IBAN'){
			inputField.setCustomValidity(IBAN.isValid(inputField.value) ? '' : 'invalid');
		}
	}

	render() {
		return (
			<section className="register-form-wrapper">
				<h2>Register account </h2>
				<form className="register-form" ref="registerForm" onSubmit={(event) => this.onRegister(event)} noValidate>
					<div className="form-group">
						<label htmlFor="first-name">First name</label>
						<input type="text" className="form-control" id="first-name" name="first-name" required ref="firstName" autoFocus />
						<div className="invalid-feedback">First name is required</div>
					</div>

					<div className="form-group">
						<label htmlFor="last-name">Last name</label>
						<input type="text" className="form-control" id="last-name" name="last-name" required ref="lastName" />
						<div className="invalid-feedback">Last name is required</div>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" className="form-control" id="email" name="email" required ref="email" />
						<div className="invalid-feedback">Value should be a valid email</div>
					</div>

					<fieldset>
						<legend>Bank accounts</legend>
						{ this.state.accounts.length === 0 ? <p className="error-message">You should provide at least one bank account</p> : null }
						{
							this.state.accounts.map((account, idx) => {
								return ([
									<div className="form-group" key={`account-IBAN-${account.index}`}>
										<label htmlFor={`iban-${account.index}`}>IBAN</label>
										<input type="text" className="form-control" id={`iban-${account.index}`} name={`iban-${account.index}`} value={account.iban} required onChange={ event => this.onChangeInput(event, account, 'iban') } />
										<i className="fa fa-trash fa-2" aria-hidden="true" onClick={() => this.onRemoveBankAccount(idx)}></i>
										<div className="invalid-feedback">Value should be a valid IBAN</div>
									</div>,
									<div className="form-group" key={`account-bank-name-${account.index}`}>
										<label htmlFor={`bank-name-${account.index}`}>Bank name</label>
										<input type="text" className="form-control" id={`bank-name-${account.index}`} name={`bank-name-${account.index}`} value={account.bankName} required onChange={ event => this.onChangeInput(event, account, 'bankName') } />
										<div className="invalid-feedback">Bank name is required</div>
									</div>
								]);
							})
						}
						<div className="btn-wrapper">
							<button type="button" className="btn btn-secondary" onClick={() => this.onAddBankAccount()}>+ Add bank account</button>
						</div>
					</fieldset>

					<div className="buttons">
						<button className="btn btn-warning" type="submit">Submit!</button>
					</div>
				</form>
			</section>
		);
	};
}

Register.defaultProps = defaultProps;
Register.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		...state,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({

		}, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
