import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts } from '../../../utils'
import { FilledButton, OutLinedButton } from '../../components/InputComp/Button'
import { Routes } from '../../../services/Routes'

const Location = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles?.container]}>
                <View style={[styles.locationView]}>
                    <Ionicons name='location-sharp' color={Colors.primaryBrown} size={hp(8)}/>
                </View>
                <Text style={[styles?.heading]}>What is Your Location?</Text>
                <Text style={[styles?.text]}>We need to know your location in order to suggest {'\n'} nearby services.</Text>
                <FilledButton text={'Allow Location Access'} btnStyle={{height:hp(6),paddingVertical:hp(.2)}}/>
                <OutLinedButton text={'Enter Location Manually'} style={{borderWidth:0,height:hp(6),paddingVertical:hp(.2)}}
                onPress={()=>navigation.navigate(Routes.ManualLocation)}
                />
            </View>
        </SafeAreaView>
    )
}

export default Location

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: wp(5.2) },
    locationView: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: hp(15),
        height:hp(16),width:hp(16),backgroundColor:Colors.borderGrey,marginBottom:hp(1),
    },
    heading:{color:Colors?.black,fontFamily:Fonts?.RobotoMedium,fontSize:hp(3.5),marginVertical:hp(2)},
    text:{color:Colors?.grey,fontFamily:Fonts.RobotoMedium,fontSize:hp(1.7),textAlign:'center'},
})