import React from 'react';
import { Image, ScrollView, View} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { style } from "./style";
import firebase from 'react-native-firebase';
import { Header, Title, Left, Right, Body} from 'native-base';


export class Events extends React.Component {

	static navigationOptions = {
		header: null,
		tabBarLabel: 'Events',
		tabBarIcon: ({tintColor}) => (<MaterialIcons size={30} color="#ffffff" name='event'/>)
	};

	constructor(props) {
		super(props);
		this.state = {		
			eventsList:[/*{eventImage: 'https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg', eventName:'Hiking', eventDate:'20/11/2107', eventTime:'11:00-18:00',eventLocation:'HKUST1'},
						{eventImage: 'https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg', eventName:'Hiking2', eventDate:'20/11/2107', eventTime:'11:00-18:00',eventLocation:'HKUST2'},
						{eventImage: 'https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg', eventName:'Hiking3', eventDate:'20/11/2107', eventTime:'11:00-18:00',eventLocation:'HKUST3'},
						{eventImage: 'https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg', eventName:'Hiking4', eventDate:'20/11/2107', eventTime:'11:00-18:00',eventLocation:'HKUST4'},
						{eventImage: 'https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg', eventName:'Hiking5', eventDate:'20/11/2107', eventTime:'11:00-18:00',eventLocation:'HKUST5'},
						{eventImage: 'https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg', eventName:'Hiking6', eventDate:'20/11/2107', eventTime:'11:00-18:00',eventLocation:'HKUST6'},*/
			]
		};
	}

render() {
	let Arr = this.state.eventsList.map((a, i) => {
				return(
				<Card style={style.cards}>
					<CardItem>
						<Left>
							 <Image key={i} source={{uri: a.eventImage}} style={{height: 130, width: 130}}/>
						</Left>
						<Body>
							<Text key={i} style={style.title}>{a.eventName}</Text>
							<View style={{flexDirection:'row',marginTop:5}}>
								<View style={{margin:2}}>
								  <Text style={style.description}>Date:</Text>
								</View>
								<View style={{margin:2}}>
								  <Text key={i} style={style.description}>{a.eventDate}</Text>
								</View>
							</View>
							<View style={ {flexDirection:'row',marginTop:2}}>
								<View style={ {margin:2}}>
								  <Text style={style.description}>Time:</Text>
								</View>
								<View style={ {margin:2}}>
								  <Text key={i} style={style.description}>{a.eventTime}</Text>
								</View>
							</View>
							<View style={ {flexDirection:'row',marginTop:2}}>
								<View style={ {margin:2}}>
								  <Text style={style.description}>Location:</Text>
								</View>
								<View style={{margin:2}}>
								  <Text key={i} style={style.description}>{a.eventLocation}</Text>
								</View>
							</View>
						</Body>
					</CardItem>
				</Card>
				);
			}) 
	 
	
	return (
		<Container>
				<Header style={style.Header}>
					<Body>
						<Title>Events</Title>
					</Body>
			</Header>
      <ScrollView>
        <Content style={{margin:20}}>
			{ Arr }
        </Content>
      </ScrollView>
		</Container>
    );
  }
		
}
