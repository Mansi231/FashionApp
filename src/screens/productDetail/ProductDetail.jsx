import { Image, ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState ,useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { BackArrow } from '../../components/CommonComp'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { FilledButton, OutLinedButton } from '../../components/InputComp/Button'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import noImage from '../../assets/home/noImage.webp'
import { IMAGE_URL } from '@env';
import { getShopDetail, sendReview } from '../../../services/redux/actions/HomeAction'
import Swiper from 'react-native-swiper'
import { Context } from '../../context/Mycontext'
import { Routes } from '../../../services/Routes'
import TextInput from '../../components/InputComp/TextInputCommon'
import AsyncStorageUtil, { KEYS } from '../../../services/AsyncStorageUtil'

const ProductDetail = ({ navigation, route }) => {
    let { params: { product } } = route
    const { isVerified,likedProducts,setLikedProducts } = useContext(Context)

    const MaxLines = 3;

    const [colors, setColors] = useState([
        { color: '#d4a88e', name: 'Tumbleweed' },
        { color: '#79665c', name: 'Pastel Brown' },
        { color: '#d99567', name: 'Persian Orange' },
        { color: '#b17552', name: 'Pecan Brown' },
        { color: '#b9773b', name: 'Copper' },
        { color: '#252525', name: 'Eerie Black' },
    ]);
    const [selectedColor, setSelectedColor] = useState(colors[1])
    const [lines, setLines] = useState(MaxLines);
    const [sellerDetail, setSellerDetail] = useState({})

    const [productSizes, setProductSizes] = useState([
        { size: 'S', selected: false },
        { size: 'M', selected: false },
        { size: 'L', selected: false },
        { size: 'XL', selected: false },
        { size: 'XXL', selected: false },
        { size: 'XXXL', selected: false },
    ])
    const [showMore, setShowMore] = useState(false);
    const [shopDetailModal, setShopDetailModal] = useState(false);
    const [unAuthenticateModal, setUnAuthenticateModal] = useState(false);

    const [rate, setRate] = useState()
    const [reviewModal, setReviewModal] = useState(false)
    const [message, setMessage] = useState('');

    

    const handleSize = (index) => {
        const updatedSizes = [...productSizes];

        // Toggle the selected state for the pressed item
        updatedSizes[index].selected = !updatedSizes[index].selected;

        // Deselect all other items
        for (let i = 0; i < updatedSizes.length; i++) { if (i !== index) { updatedSizes[i].selected = false; } }
        setProductSizes(updatedSizes);
    }

    const getSellerDetails = async () => {
        try {
            let response = await getShopDetail(product?.seller_id);
            setSellerDetail(response)
        } catch (error) {
            console.log(error, ': error getting seller detail .')
        }
    }

    useEffect(() => {
        getSellerDetails();
    }, [])

    const handleSendReview = () => {
        let params = {
            product_id: product?.id,
            user_id: sellerDetail?.user_id,
            review_details: message,
        }
        if (rate) {
            params.rating = rate + 1;
            params.review_details = message;

            sendReviewApi(params)

        }
    }

    const sendReviewApi = async (params) => {
        try {
            sendReview(params)
            let response = sendReview(params)
            if (response.data.status) {
                setReviewModal(false)
                setMessage('')
                setRate()
            }
        } catch (error) {
            console.log(error, ' : error while sending response')
        }
    }

        const handleProductLike = useCallback(async () => {

        const isLiked = likedProducts.some((p) => p.id === product.id);

        // Update the liked state in the local state.
        if (isLiked) {
            setLikedProducts(likedProducts.filter((p) => p.id !== product.id));
        } else {
            setLikedProducts([...likedProducts, product]);
        }

        // Save the liked state to AsyncStorage.
        saveLikedProducts();
    }, [likedProducts])

    const saveLikedProducts = async () => {
        try {
            
            await AsyncStorageUtil.setItem(KEYS.wishlist, JSON.stringify(likedProducts));
        } catch (error) {
            console.log(error, ' : error for wishlist');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={[styles?.container]}>
                <StatusBar
                    backgroundColor={Colors?.cream}
                />

                {/* Header  */}
                <View style={[styles?.header, styles?.paddingx]}>
                    <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white, borderWidth: 0 }} onPress={() => navigation.goBack()} />
                    <Text style={styles?.headerText}>Product Details</Text>
                    <TouchableOpacity style={[styles?.likeBtn]} onPress={()=>handleProductLike()}>
                        <FontAwesome name={likedProducts.some((i)=>i.id == product.id) ? 'heart' : 'heart-o'} size={hp(2.3)} color={Colors.primaryBrown} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
                    style={{ width: '100%' }}
                >

                    <View style={[styles?.productImage]}>
                        <Swiper
                            dotColor={Colors.borderGrey}
                            activeDotColor={Colors.primaryBrown}
                            style={styles.wrapper} showsButtons={false}
                            dotStyle={styles.paginationDot}
                            activeDotStyle={styles?.paginationDot}
                            paginationStyle={styles.paginationContainer}
                        >
                            {product?.product_image?.map((item, index) => (
                                <Image key={index} source={product?.product_image?.length == 0 ? noImage : { uri: `${IMAGE_URL}${item?.image}` }} style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />
                            ))}
                        </Swiper>
                    </View>

                    <View style={[styles.productStyleBox, styles?.paddingx]}>
                        <Text style={[styles?.productStyleText]}>Female's Style</Text>
                        <Text style={[styles?.productRating]}>
                            <Fontisto name='star' size={hp(1.9)} color={Colors?.yellow} /> {product?.rating || 4.5}
                        </Text>
                    </View>

                    <Text style={[styles?.productName, styles?.paddingx]}>{product?.name}</Text>
                    <Text style={[styles?.productName, styles?.paddingx]}>Product Details</Text>

                    <View style={[styles.paddingx]}>
                        <View style={[styles?.infoBox]}>
                            <Text
                                onTextLayout={(e) => setLines(e.nativeEvent.lines.length)}
                                numberOfLines={showMore ? undefined : MaxLines} style={[styles.info]}>
                                {product?.description}
                            </Text>

                            {lines > MaxLines && (
                                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                    <Text style={styles.readMore}>
                                        {showMore ? 'Read less' : 'Read more'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <Text style={[styles?.productName, styles?.paddingx]}>Select Size</Text>

                    <View style={[styles?.productStyleBox, styles?.paddingx, { flexWrap: 'wrap' }]}>
                        {
                            productSizes.map(({ size, selected }, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={.7}
                                        key={index}
                                        onPress={() => handleSize(index)}
                                        style={[styles?.sizeBox, { backgroundColor: selected ? Colors?.primaryBrown : Colors.white, }]}
                                    >
                                        <Text style={[styles.size, { color: selected ? Colors?.white : Colors?.black }]}>{size}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    <Text style={[styles?.productName, styles?.paddingx]}>
                        Select Color : <Text style={[styles?.selectedColor]}>{selectedColor?.name}</Text>
                    </Text>

                    <View style={styles?.paddingx}>
                        <View style={[styles?.productStyleBox, { flexWrap: 'wrap' }, styles?.infoBox]}>
                            {
                                colors.map(({ color, name }, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={.7}
                                            onPress={() => setSelectedColor({ color, name })}
                                            style={[styles?.colorBox, { backgroundColor: color, }]}
                                        >
                                            {selectedColor?.name == name && <View style={{ height: hp(2.5), width: hp(2.5), borderRadius: hp(8), backgroundColor: Colors.white }} />}
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>

                    <View style={[styles?.paddingx, styles?.productStyleBox, { gap: wp(4) }]}>
                        <OutLinedButton
                            onPress={() => isVerified == 1 ? setShopDetailModal(true) : navigation.navigate(Routes.Auth)}
                            text={'Shop detail'} textStyle={{ fontSize: hp(2) }} style={{ paddingVertical: hp(.2), width: '49%', height: hp(5.5) }} />
                        <OutLinedButton
                            onPress={() => isVerified == 1 ? setReviewModal(true) : navigation.navigate(Routes.Auth)}
                            text={'Give review'} textStyle={{ fontSize: hp(2) }} style={{ paddingVertical: hp(.2), width: '49%', height: hp(5.5) }} />
                    </View>
                </ScrollView>

                <View style={[styles?.cartBtnView, { marginVertical: 0 }]}>
                    <View style={[styles?.paddingx, styles?.productStyleBox, { gap: wp(4.5) }]}>
                        <View style={{ height: hp(6), width: hp(6), borderRadius: hp(8) }}>
                            <Image source={{ uri: `${IMAGE_URL}${sellerDetail?.profile_image}` }} style={{ height: '100%', width: '100%', borderRadius: hp(8) }} />
                        </View>
                        <FilledButton
                            onPress={() => { isVerified == 1 ? {} : navigation.navigate(Routes.Auth) }}
                            text={<Text>
                                <FontAwesome6 name='phone' size={hp(2)} />{'   '}
                                Contact to seller</Text>}
                            btnStyle={{ flex: 1, marginTop: 0, height: hp(5), paddingVertical: hp(.2) }} />

                    </View>
                </View>

                {/* ShopDetail Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={shopDetailModal}
                    onRequestClose={() => {
                        setShopDetailModal(false)
                    }}>
                    <SafeAreaView style={styles?.modalContainer}>
                        {sellerDetail && sellerDetail?.shop_image &&
                            <View style={[styles?.sellerDetailImage]}>
                                <Image source={{ uri: `${IMAGE_URL}${sellerDetail?.shop_image}` }} style={styles?.shopImage} />
                                <TouchableOpacity
                                    style={styles?.modalClose}
                                    onPress={() => {
                                        setShopDetailModal(false);
                                    }}>
                                    <FontAwesome name='remove' color={Colors.white} size={hp(2)} />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={styles?.shopDetailBox}>
                            <View style={styles?.paddingx}>
                                <View style={[styles.productStyleBox]}>
                                    <Text style={[styles?.productName, { marginVertical: 0, color: Colors?.primaryBrown, fontFamily: Fonts?.RobotoMedium }]}>{sellerDetail?.shop_name}</Text>
                                    <Text style={[styles?.productRating]}>
                                        <Fontisto name='star' size={hp(1.9)} color={Colors?.yellow} /> {product?.rating || 4.5}
                                    </Text>
                                </View>

                                <Text style={[styles.info]}>
                                    {sellerDetail?.shop_description}
                                </Text>

                                <Text style={[styles.info, { marginVertical: hp(.8), color: Colors.darkGrey }]}>
                                    {`${sellerDetail?.location?.address} , ${sellerDetail?.location?.location} , ${sellerDetail?.location?.city} , ${sellerDetail?.location?.state} - ${sellerDetail?.location?.county}`}
                                </Text>
                            </View>
                        </View>

                    </SafeAreaView>
                </Modal>

                {/* GiveReview Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={reviewModal}
                    onRequestClose={() => {
                        setReviewModal(!reviewModal);
                    }}>
                    <SafeAreaView style={styles?.modalContainer}>
                        <TouchableOpacity activeOpacity={1} style={styles.centeredView}>
                            <View style={[styles.modalView]}>
                                <ImageBackground
                                    borderTopRightRadius={hp(1)}
                                    borderTopLeftRadius={hp(1)}
                                    borderBottomLeftRadius={hp(1)}
                                    borderBottomRightRadius={hp(1)}
                                    style={styles.userImage2}
                                    source={product?.product_image?.length == 0 ? noImage : { uri: `${IMAGE_URL}${product?.product_image[0]?.image}` }}>

                                    <View style={styles.mainView3}>
                                        <Text style={[styles.productName, { marginVertical: 0 }]}>{product?.name}</Text>
                                    </View>
                                </ImageBackground>
                                <View style={styles.textBox}>
                                    <TextInput
                                        maxLength={50}
                                        multiline={true}
                                        value={message}
                                        onChangeText={value => {
                                            setMessage(value);
                                        }}
                                        placeholder={'Write a review'}
                                        placeholderTextColor={Colors.grey}
                                        style={{ borderRadius: hp(.8), height: hp(10), paddingVertical: hp(.8), borderWidth: 0 }}
                                    />
                                </View>

                                <View style={styles?.ratingBox}>
                                    {
                                        Array.from({ length: 5 }, (v, k) => k).map((i, index) => <AntDesign key={i} name={i <= rate ? 'star' : 'staro'} color={Colors.yellow} size={hp(3)} onPress={() => setRate(i)} />)
                                    }
                                </View>


                                <View style={styles.reviewFooter}>
                                    <FilledButton
                                        onPress={() => handleSendReview()}
                                        text={'send'} btnStyle={{ width: wp(50), height: hp(5), paddingVertical: hp(.12), marginTop: 0 }} />
                                    <Text
                                        onPress={() => {
                                            handleSendReview()
                                            setReviewModal(false), setMessage('');
                                        }}
                                        style={[styles.selectedColor, { color: Colors.white }]}>
                                        Cancel
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>

            </View>

        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors?.white },
    paddingx: { paddingHorizontal: wp(5.2) },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.cream
    },
    headerText: {
        color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
    },
    likeBtn: {
        alignSelf: 'flex-start', marginLeft: -hp(1.5), marginTop: hp(1.5),
        borderRadius: hp(8), height: hp(6), width: hp(6), alignItems: 'center',
        justifyContent: 'center', flexDirection: 'row', backgroundColor: Colors?.white
    },
    productImage: { height: hp(50), width: '100%' },

    productStyleBox: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1), width: '100%', alignItems: 'center' },

    productStyleText: { color: Colors?.lightGrey, fontSize: hp(2.1), fontFamily: Fonts.RobotoMedium },
    productRating: {
        fontFamily: Fonts?.RobotoRegular, color: Colors?.grey,
        fontSize: hp(1.9)
    },
    productName: { fontFamily: Fonts?.RobotoMedium, marginVertical: hp(1), fontSize: hp(2.1), color: Colors?.black, textAlign: 'left', alignSelf: "flex-start" },
    readMore: {
        color: Colors.primaryBrown, textDecorationLine: 'underline',
        fontFamily: Fonts.RobotoMedium, fontSize: hp(1.9)
    },
    infoBox: { borderBottomColor: Colors.borderGrey, borderBottomWidth: hp(.12), paddingBottom: hp(2) },
    info: { color: Colors.grey, fontFamily: Fonts?.RobotoRegular, fontSize: hp(1.9) },
    size: {
        fontFamily: Fonts.RobotoBold, fontSize: hp(2), color: Colors.white, textAlign: 'center',
        textAlignVertical: 'center'
    },
    sizeBox: {
        paddingVertical: hp(.6), paddingHorizontal: wp(3), backgroundColor: Colors?.primaryBrown, borderRadius: hp(1),
        borderColor: Colors?.borderGrey, borderWidth: hp(.12)
    },
    selectedColor: { color: Colors.grey, fontSize: hp(2), fontFamily: Fonts.RobotoMedium },
    colorBox: { height: hp(5), width: hp(5), borderRadius: hp(8), justifyContent: 'center', alignItems: 'center' },
    cartBtnView: {
        paddingVertical: hp(2), borderColor: Colors?.borderGrey, borderWidth: hp(.12),
        borderTopLeftRadius: hp(2), borderTopRightRadius: hp(2), borderBottomWidth: 0,
        bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: Colors?.white,
        marginTop: hp(2)
    },

    // ShopDetail Modal
    modalContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
        paddingHorizontal: hp(2.3)
    },
    userImage: {
        width: hp(6.2),
        height: hp(6.2),
        // marginHorizontal: wp(2),
        borderRadius: hp(6)
    },
    closeImage: {
        height: '100%', width: '100%',
        resizeMode: 'center',
        alignSelf: 'center',
        marginRight: wp(3),
        tintColor: Colors.white,
    },
    sellerDetailImage: {
        width: '100%',
        height: hp(45),
        borderRadius: hp(3),
        marginTop: hp(1),
        position: 'relative'
    },

    shopImage: { height: '100%', width: '100%', borderTopLeftRadius: hp(2.6), borderTopRightRadius: hp(2.6) },
    shopDetailBox: {
        backgroundColor: Colors.lightCream, width: '100%', borderRadius: hp(2.6), marginTop: -hp(6), paddingVertical: hp(2)
    },
    modalClose: { position: 'absolute', right: wp(2), top: hp(1), alignSelf: 'flex-end', backgroundColor: Colors?.grey, paddingHorizontal: wp(2.6), paddingVertical: hp(1), borderRadius: hp(8) },

    viewProfile: {
        justifyContent: 'center', alignItems: 'center', borderRadius: hp(2.2), backgroundColor: Colors.primaryBrown, marginTop: hp(7),
        paddingHorizontal: wp(4.5), paddingVertical: hp(1)
    },
    premiumText1: {
        fontSize: hp(3.1),
        fontFamily: Fonts?.RobotoMedium,
        color: Colors.black,
        textAlign: 'center',
        width: '70%',
        alignSelf: 'center',
        marginTop: hp(1.5),
    },

    // Give Review Modal

    centeredView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage2: {
        width: wp(81),
        height: hp(38.6),
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: hp(1),
        justifyContent: 'flex-end',
    },
    mainView3: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        position: 'absolute',
        bottom: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
    },

    textBox: {
        width: wp(81),
        borderRadius: hp(.8),
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: hp(2),
        backgroundColor: Colors?.lightCream, paddingVertical: hp(2)
    },

    reviewFooter: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp(2)
    },
    ratingBox: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
        gap: wp(2)
    },
})