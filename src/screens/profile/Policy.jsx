import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import InviteFriends from './InviteFriends'
import PrivacyPolicy from './PrivacyPolicy'
import HelpCenter from './HelpCenter'
import MyOrders from '../orders/MyOrders'
import Settings from './Settings'
import PaymentMethods from '../payment/PaymentMethods'

const Policy = ({ navigation, route }) => {

    let { params: { from ,prevStack} } = route;

    let fromRoutes = { InviteFriends: 'InviteFriends', PrivacyPolicy: "PrivacyPolicy", HelpCenter: 'HelpCenter', MyOrders: 'MyOrders', Settings: 'Settings',PaymentMethods:'PaymentMethods' }

    return (
        from == fromRoutes?.PrivacyPolicy ? <PrivacyPolicy navigation={navigation} /> :
            from == fromRoutes?.HelpCenter ? <HelpCenter navigation={navigation} /> :
                from == fromRoutes?.InviteFriends ?
                    <InviteFriends navigation={navigation} /> :
                    from == fromRoutes?.MyOrders ? <MyOrders navigation={navigation} /> :
                        from == fromRoutes?.Settings ? <Settings navigation={navigation} /> : from == fromRoutes?.PaymentMethods ? <PaymentMethods navigation={navigation} from={prevStack}/>:null
    )
}

export default React.memo(Policy)

export const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    brownText: { color: Colors.primaryBrown, fontSize: hp(2.1), fontFamily: Fonts.PoppinsMedium },
    greyText: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts.PoppinsMedium, marginVertical: hp(1) },
    listBox: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: "center",
        paddingVertical: hp(2), borderBottomWidth: hp(.12), borderBottomColor: Colors.borderGrey
    },
    box: {
        flexDirection: 'row', justifyContent: 'flex-start', gap: wp(2), alignItems: "center",
    },
    userImage: {
        height: hp(7), width: hp(7), borderRadius: hp(8)
    },
    userName: {
        color: Colors.black, fontFamily: Fonts.PoppinsMedium, fontSize: hp(2.1)
    },
    searchBox: {
        height: hp(6.4), borderRadius: hp(2),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey, textAlign: 'left',
        marginVertical: hp(2), flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: wp(2.5), width: '100%'
    },
    typeContainer: {
        width: '100%', borderBottomColor: Colors.borderGrey,
        borderBottomWidth: hp(.12), paddingHorizontal: wp(2)
    },
    types: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        width: '100%',
    },
    typeBox: {
        flexDirection: 'column', justifyContent: 'space-between',
        alignItems: 'center', height: hp(5.6), width: '50%'
    },
    selectedTypeBorder: {
        height: hp(.6), backgroundColor: Colors.primaryBrown,
        borderTopLeftRadius: hp(1), borderTopRightRadius: hp(1), width: '50%'
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.PoppinsMedium, fontSize: hp(2.2), marginTop: hp(1.5),
    },

    // Collapse
    collapseBtn: {
        height: hp(9), width: '100%', borderColor: Colors.borderGrey, borderWidth: hp(.12),
        borderRadius: hp(1.5), flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp(2.5)
    },
    collapseBreak: {
        borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0,
        width: '100%', height: '100%', paddingHorizontal: 0
    },
    contentBox: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: wp(4) },
    collapse: {
        height: hp(8), width: '100%', borderWidth: hp(.12), borderColor: Colors.borderGrey,
        borderTopWidth: 0, borderBottomLeftRadius: hp(1.5), borderBottomRightRadius: hp(1.5),
        justifyContent: 'center',
    },

    // horizontal scroll flatlist
    tag: {
        backgroundColor: Colors.primaryBrown, paddingHorizontal: wp(4), height: hp(4.5),
        borderRadius: hp(8), marginHorizontal: wp(1), justifyContent: 'center', alignItems: 'center'
    },
    tagText: { color: Colors.white, fontFamily: Fonts.RobotoMedium, fontSize: hp(1.8) },

    //settings optins
    optionBtn: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: "center", gap: wp(2), width: '100%',
        borderBottomColor: Colors.borderGrey, borderBottomWidth: hp(.12), paddingVertical: hp(2.5)
    },
})