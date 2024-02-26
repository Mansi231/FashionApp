import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { Colors } from '../../utils';

const Loader = ({ isLoading = false }) => {
    if (!isLoading) return null;

    return (
        <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <ActivityIndicator color={Colors.primaryBrown} size="large" />
        </View>
    );
}


export default Loader;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        ...StyleSheet.absoluteFill,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',

    },

});
