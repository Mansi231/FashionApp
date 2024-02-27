import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts } from '../../../utils'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from '../../../pixel'

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'center',
        backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
    },
    paddingX: { paddingHorizontal: wp(5.2), },
    header: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white,
        position: 'relative'
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
    },
    heading: {
        color: Colors.black, fontSize: hp(2.4), fontFamily: Fonts?.RobotoMedium,
        textAlign: 'left', width: '100%',
    },
    addressBox: {
        flexDirection: 'row', justifyContent: "flex-start",
        alignItems: 'flex-start', marginTop: hp(1), width: '100%',
        gap: wp(3), borderBottomColor: Colors.borderGrey, borderBottomWidth: hp(.12),
        paddingBottom: hp(2)
    },
    greyText: { marginVertical: hp(.4), color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, textAlign: 'left', },
    itemView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderBottomColor: Colors?.borderGrey, borderBottomWidth: hp(.12),
        paddingVertical: hp(1)
    },
    itemImage: { width: hp(13), height: hp(13), borderRadius: hp(1) },
    itemInfo: {
        flex: 1
    },
    itemName: {
        color: Colors?.black, fontSize: hp(2), fontFamily: Fonts?.RobotoMedium, textAlign: 'left', width: '100%'
    },
    size: { color: Colors.grey, fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, textAlign: 'left', width: '100%' },
    cartBtnView: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        marginTop: hp(2), paddingHorizontal: wp(5.2)
    }
})

export default styles