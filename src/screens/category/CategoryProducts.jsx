import { FlatList, ImageBackground, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { Header } from '../../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { IMAGE_URL } from '@env';
import { getFilterProducts } from '../../../services/redux/actions/HomeAction'
import noImage from '../../assets/home/noImage.webp'
import Loader from '../../loader/Loader'
import { Routes } from '../../../services/Routes'
import { Context } from '../../context/Mycontext'
import { KEYS, setItemToStorage } from '../../../services/storage'

const CategoryProducts = ({ navigation, route }) => {

    let { params: { category } } = route

    const { likedProducts, setLikedProducts } = useContext(Context)

    const [filterProducts, setFilterProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [filterObj, setFilterObj] = useState({ category_id: category?.id, subcategory_id: [null], page: currentPage })
    const [loading, setLoading] = useState(false)
    const [lastProductsPage, setLastProductsPage] = useState(1)

    const getProducts = async (obj) => {
        setLoading(true)
        try {
            let response = await getFilterProducts(obj)
            if (response?.data) {
                setCurrentPage(response?.current_page)
                if (currentPage < response?.current_page) {
                    setFilterProducts((filterProducts) => [...filterProducts, ...response?.data])
                } else if (response.current_page == 1) {
                    setFilterProducts(response?.data)
                }
                setLastProductsPage(response?.last_page)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error, '----err while getting products')
        }
    }

    useEffect(() => {
        getProducts(filterObj)
    }, [])

    const selectSubCategory = useCallback((item, index) => {
        let arr = filterObj.subcategory_id;
      
        if (item.name === 'All') {
          if (filterObj.subcategory_id.length === 1 && filterObj.subcategory_id[0] === null) {
            // "All" is already selected; no need to change anything
            return;
          } else {
            getProducts({ ...filterObj, subcategory_id: [null], page: 1 });
            setFilterObj({ ...filterObj, subcategory_id: [null], page: 1 });
          }
        } else {
          // Check if "All" is selected; if so, remove it from the selection
          const allIndex = filterObj.subcategory_id.indexOf(null);
          if (allIndex !== -1) {
            arr = arr.filter((id) => id !== null);
          }
      
          // Toggle the selection of the clicked subcategory
          if (arr.includes(item.id)) {
            arr = arr.filter((id) => id !== item.id);
          } else {
            arr.push(item.id);
          }
      
          getProducts({ ...filterObj, subcategory_id: arr.join(','), page: 1 });
          setFilterObj({ ...filterObj, subcategory_id: arr, page: 1 });
        }
      }, [filterObj, getProducts]);


    const onEndReached = () => {
        if (lastProductsPage > currentPage) {
            getProducts({ ...filterObj, subcategory_id: filterObj?.subcategory_id?.join(','), page: currentPage + 1 })
        }
    };

    const handleCardPress = useCallback((product) => {
        navigation.navigate(Routes.ProductDetail, { product });
    }, [navigation]);


    const handleProductLike = useCallback(async (product) => {

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
            await setItemToStorage(KEYS.wishlist,likedProducts)
        } catch (error) {
            console.log(error, ' : error for wishlist');
        }
    };

    return (
        <>
            <Loader isLoading={loading} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors?.white, paddingBottom: Platform?.OS == 'ios' ? hp(2) : hp(6) }}>
                <View style={[styles?.container]}>
                    <StatusBar backgroundColor={Colors.white} />
                    {/* header */}
                    <View style={[{ width: '100%' }]}>
                        <Header heading={category?.name} boxStyle={[{ paddingBottom: hp(2.7) }]} onPress={() => navigation.goBack()} />
                    </View>

                    {/*  subcategory  */}
                    <View style={{ height: hp(6), width: "100%" }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ height: hp(6), paddingVertical: hp(.5) }}
                            data={[{ name: 'All', id: null }, ...category?.subcategory]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => selectSubCategory(item, index)}
                                        activeOpacity={.7}
                                        style={[styles?.filterBox, styles?.closingInBox, {
                                            backgroundColor: filterObj?.subcategory_id.includes(item?.id) ? Colors?.primaryBrown : Colors?.white
                                        }]}>
                                        <Text style={[styles?.filterName, { color: filterObj?.subcategory_id.includes(item?.id) ? Colors?.white : Colors?.black }]}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    {/* products */}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={[{ flex: 1, marginVertical: hp(1), width: '100%' },]}
                        data={filterProducts}
                        // data={filterItem}
                        numColumns={2}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {

                            return (
                                <TouchableOpacity key={index} activeOpacity={.7}
                                    style={[styles?.card]}
                                    onPress={() => handleCardPress(item)}
                                >
                                    <View style={{ height: hp(20), width: '100%', }}>
                                        <ImageBackground
                                            borderRadius={hp(1.5)}
                                            source={item?.product_image?.length == 0 ? noImage : { uri: `${IMAGE_URL}${item?.product_image[0]?.image}` }}
                                            // source={item?.image}
                                            style={{ height: '100%', width: '100%', borderWidth: hp(.12), borderColor: Colors.AntiFlashWhite, borderRadius: hp(1.5) }}
                                            resizeMode='cover'
                                        >
                                            <TouchableOpacity style={[styles?.likedBtn]}
                                                onPress={() => handleProductLike(item)}
                                            >
                                                <FontAwesome name={likedProducts.some((p) => p.id === item.id) ? 'heart' : 'heart-o'} size={hp(2.3)} color={Colors.primaryBrown} />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                    <View style={[styles?.filterCardBox]}>
                                        <Text style={[styles?.cardItemName, { lineHeight: hp(3) }]}>{item?.name}</Text>
                                        <Text style={[styles?.cardItemRating]}>
                                            <Fontisto name='star' size={hp(1.9)} color={Colors?.yellow} /> 4.3
                                        </Text>
                                    </View>
                                    <Text style={[styles?.cardItemPrice, { marginTop: hp(.4) }]}>${item?.price}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                </View>
            </SafeAreaView>
        </>
    )
}

export default CategoryProducts

const styles = StyleSheet.create({
    paddingx: { paddingHorizontal: wp(5.2) },
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors?.white, paddingHorizontal: wp(5.2) },
    filterBox: {
        borderRadius: hp(2.3), borderColor: Colors?.borderGrey,
        borderWidth: hp(.12), paddingHorizontal: wp(4), height: hp(4.5),
        marginHorizontal: wp(1), paddingVertical: hp(1)
    },
    filterName: { color: Colors?.black, fontSize: hp(1.9), fontFamily: Fonts?.RobotoBold },
    filterCardBox: {
        width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center'
    },

    card: { width: '50%', marginVertical: hp(1.5), borderRadius: hp(2), paddingHorizontal: wp(1) },

    likedBtn: {
        alignSelf: 'flex-end', height: hp(4.5), width: hp(4.5), backgroundColor: Colors.lightBrown,
        borderRadius: hp(8), margin: hp(1), alignItems: 'center', justifyContent: 'center'
    },
    cardItemName: {
        fontFamily: Fonts?.RobotoRegular, color: Colors?.bgBlack,
        fontSize: hp(2.1)
    },
    cardItemRating: {
        fontFamily: Fonts?.RobotoRegular, color: Colors?.grey,
        fontSize: hp(1.9)
    },
    cardItemPrice: {
        fontFamily: Fonts?.RobotoMedium, color: Colors?.black, fontSize: hp(2.2)
    },
    closingInBox: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-start', gap: wp(1)
    },
})