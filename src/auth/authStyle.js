import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../pixel";

export const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: wp(5.2),backgroundColor:Colors.white },
    heading: { fontSize: hp(3), fontFamily: Fonts?.RobotoMedium, color: Colors?.black, marginTop: hp(0) },
    welcomeText: { fontFamily: Fonts?.RobotoRegular, fontSize: hp(2.2), color: Colors?.grey, marginVertical: hp(3) },
    inputContainer: { flexDirection: 'column', gap: hp(2.3), marginTop: hp(3) },
    inputBox: { flexDirection: 'column', gap: hp(1), justifyContent: 'flex-start', alignItems: 'center', width: '100%' },
    label: {
        fontSize: hp(2.1), fontFamily: Fonts?.RobotoRegular, color: Colors?.black, textAlign: 'left', width: '100%'
    },
    input: { width: '100%', flexDirection: 'row', justifyContent: 'flex-start' },
    secureIcon: {
        height: hp(6.4),
        borderRadius: hp(6),
        borderWidth: hp(.12),
        borderColor: Colors?.borderGrey,
        width: '100%',
        justifyContent: 'space-between', alignItems: 'center'
    },
    checkBoxContainer: { alignItems: 'center', gap: wp(2) },
    agreeWithText: {
        fontSize: hp(1.9), fontFamily: Fonts?.RobotoRegular, color: Colors?.black
    },
    forgotPassword: { color: Colors.primaryBrown, textAlign: 'right', width: '100%', textDecorationLine: 'underline' },
    lineContainer: { flexDirection: 'row', justifyContent: 'center', width: '80%', gap: hp(1.5), alignItems: 'center', alignSelf: 'center', marginTop: hp(2) },
    line: { height: hp(.1), backgroundColor: Colors?.grey, flex: 1 },
    signInWith: { color: Colors?.lightGrey, fontSize: hp(2.1), fontFamily: Fonts?.RobotoRegular },
    alreadyHaveBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    alreadyHaveText: {
        fontSize: hp(2.1), fontFamily: Fonts?.RobotoRegular, width: '100%',
        textAlign: 'center', color: Colors?.black,marginTop:hp(1)
    },
    tetxDecoration: { color: Colors.primaryBrown, textDecorationLine: 'underline' },
    socialBtn: {
        height: hp(8), width: hp(8), borderRadius: hp(8), borderColor: Colors?.borderGrey,
        borderWidth: hp(.1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    errorText: {
        color: Colors.errorColor,
        fontFamily: Fonts.Roboto,
        fontSize: hp(1.68), lineHeight: hp(2.3), width: '100%'
    },
})