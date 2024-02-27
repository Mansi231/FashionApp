import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../pixel";
import { Colors, Fonts } from "../../utils";

const styles = StyleSheet.create({
    tabBarStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: hp(10),

        height: hp(9),
        paddingBottom: hp(.4),
        bottom: hp(3), backgroundColor: Colors?.bgBlack,
        borderRadius: hp(8), 
        
        // marginHorizontal: wp(7),
        marginHorizontal: wp(14),
        // paddingHorizontal:wp(2.3)
    },
    bottomIconBtn: {
        // height: hp(8), width: hp(8), 
        height: hp(7), width: hp(7), 
        
        borderRadius: hp(8), flexDirection: 'row', justifyContent: 'center', alignItems: 'center',color:Colors.white  
    },
    bgWhite:{backgroundColor:Colors.white},
})

export default styles