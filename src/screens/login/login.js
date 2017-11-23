import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'nachos-ui';

import { style } from "./style";

let firebase = require('firebase');

export class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}

	render() {
		return (
			<View>
				<Input
					style={style.email}
					autoCapitalize='none'
					autoCorrect={false}
					autoFocus={true}
					keyboardType='email-address'
					placeholder='Email'
					value={this.state.email}
					onChangeText={(value) => {
						this.setState({
							email: value
						});
					}}
				/>
				<Input
					style={style.password}
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					placeholder='Password'
					value={this.state.password}
					onChangeText={(value) => {
						this.setState({
							password: value
						});
					}}
				/>
				<Button
					style={style.login}
					onPress={() => {
						firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
							console.log("login ok");
						}).catch((err) => {
							console.log(err);
						});
					}}
				>
					Login
				</Button>
			</View>
		);
	}

}
