import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Broadcast } from "../broadcast/broadcast";
import { Category } from "../events/category";
import { Group } from "../groups/groups";

export const Tab = TabNavigator(
	{
		Broadcast: {screen: Broadcast},
		Category: {screen: Category},
		Group: {screen: Group},
	},
	{
		tabBarOptions: {
			inactiveTintColor: '#FFFFFF',
			activeTintColor: '#FFFF00',
			labelStyle: {
				fontSize: 14,
				fontWeight: '600'
			},
			style: {
				backgroundColor: '#5FAAFA',
			},
			showIcon: true,
			iconStyle: {
				width: 100
			}
		},
		tabBarPosition: 'bottom'
	}
);
