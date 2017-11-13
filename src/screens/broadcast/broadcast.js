import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { style } from "./style";
import { HOST } from "../../lib/server/server";

let firebase = require('firebase');

export class Broadcast extends React.Component {

	static navigationOptions = {
		title: 'Broadcast',
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			user: {}
		};
	}

	componentWillMount() {
		AsyncStorage.getItem('@aloner:broadcasts').then((res) => {
			this.setState({
				messages: res ? res : []
			});
		}).catch((err) => {
			console.log(err);
		});
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				fetch(HOST + '/api/user', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						uid: user.uid
					})
				}).then((response) => {
					response.json().then((doc) => {
						this.setState({
							user: {
								_id: user.uid,
								name: doc['firstname'] + ' ' + doc['lastname']
							}
						})
					});
				});
				this.refresher();
			} else {
				this.props.navigation.navigate('Login');
			}
		});
	}

	render() {
		return (
			<View
				style={style.view}
			>
				<GiftedChat
					messages={this.state.messages}
					onSend={(messages) => this.onSend(messages)}
					user={this.state.user}
				/>
			</View>
		);
	}

	refresher() {
		firebase.auth().currentUser.getIdToken(true).then((token) => {
			fetch(HOST + '/api/broadcast', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					method: 'dump',
					createdAt: this.state.messages.length > 0 ? this.state.messages[0]['createdAt'] : 0,
					token: token
				})
			}).then((response) => {
				response.json().then((data_msg) => {
					data_msg.forEach((item) => {
						fetch(HOST + '/api/user', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								uid: item['user']['_id']
							})
						}).then((response) => {
							response.json().then((data_user) => {
								item['user']['name'] = data_user['firstname'] + ' ' + data_user['lastname'];
								this.setState({
									messages: this.state.messages.concat(item).sort((a, b) => {
										if (a['createdAt'] < b['createdAt']) {
											return 1;
										} else {
											return -1;
										}
									})
								});
							}).catch((err) => {
								console.log(err);
							});
						}).catch((err) => {
							console.log(err);
						});
					});
				}).catch((err) => {
					console.log(err);
				});
			}).catch((err) => {
				console.log(err);
			});
		});
	}

	onSend(messages) {
		firebase.auth().currentUser.getIdToken(true).then((token) => {
			messages.forEach((item) => {
				fetch(HOST + '/api/broadcast', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						method: 'send',
						token: token,
						text: item['text']
					})
				}).then((response) => {
					this.refresher();
				}).catch((err) => {
					console.log(err);
				});
			});
		});
	}

}
