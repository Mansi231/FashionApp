import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { Colors, Fonts } from '../../../utils'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Routes } from '../../../services/Routes'
import { IMAGE_URL } from '@env';
import { Context } from '../../context/Mycontext'
import { KEYS, setItemToStorage } from '../../../services/storage'

const Products = ({ navigation, products,currentPage, getProducts, setFilterProductParams}) => {

    const { likedProducts, setLikedProducts } = useContext(Context)

    useEffect(() => {
        getProducts({ page: currentPage });
    }, []);

    const handleCardPress = useCallback((product) => {
        navigation.navigate(Routes.ProductDetail, { product });
    }, [navigation]);

    const [filterOptions, setFilterOptions] = useState([
        { name: 'All', selected: true, key: "all" },
        { name: 'Newest', selected: false, key: 'newest' },
        { name: 'Popular', selected: false, key: 'popular' },
        { name: 'Man', selected: false, key: 'gender' },
        { name: 'Woman', selected: false, key: 'gender' },
        { name: 'Kids', selected: false, key: 'gender' },
    ]);

    const handleFilterPress = useCallback((option, index) => {

        const newFilterOptions = [...filterOptions];
        const allOption = newFilterOptions.find(opt => opt.name === 'All');

        if (option.name === 'All') {
            allOption.selected = true;
            newFilterOptions.forEach(opt => {
                if (opt.name !== 'All') {
                    opt.selected = false;
                }
            });
        } else {
            allOption.selected = false;

            if (option.name === 'Man' || option.name === 'Kids') {
                newFilterOptions.find(opt => opt.name === 'Woman').selected = false;
            }

            if (option.name === 'Woman' || option.name === 'Kids') {
                newFilterOptions.find(opt => opt.name === 'Man').selected = false;
            }
            if (option.name === 'Woman' || option.name === 'Man') {
                newFilterOptions.find(opt => opt.name === 'Kids').selected = false;
            }

            if (option.name === 'Popular') {
                newFilterOptions.find(opt => opt.name === 'Newest').selected = false;
            }
            if (option.name === 'Newest') {
                newFilterOptions.find(opt => opt.name === 'Popular').selected = false;
            }

            option.selected = true;
        }

        const params = {
            page: 1,
            gender: '',
            popular: '',
            newest: '',
        };

        newFilterOptions.forEach(({ name, key, selected }) => {
            if (selected) {
                if (key === 'gender') params.gender = name;
                if (key === 'popular') params.popular = 1;
                if (key === 'newest') params.newest = 1;
            }
        });
        setFilterOptions(newFilterOptions);

        getProducts(params)
        setFilterProductParams(params)
    }, [filterOptions]);

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
            <View style={[styles?.paddingx, { flex: 1 }]}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={[{ flex: 1, width: '100%', marginVertical: hp(1) }]}
                    data={filterOptions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => handleFilterPress(item, index)}
                                activeOpacity={.7}
                                style={[styles?.filterBox, styles?.closingInBox, {
                                    backgroundColor: item?.selected ? Colors?.primaryBrown : Colors?.white
                                }]}>
                                <Text style={[styles?.filterName, { color: item?.selected ? Colors?.white : Colors?.black }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            {/* Products */}
            <View style={{ marginVertical: hp(1) }}>
                <View style={[styles?.filterCardBox, styles?.paddingx]}>
                    {
                        products?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} activeOpacity={.7}
                                    style={[styles?.card]}
                                    onPress={() => handleCardPress(item)}
                                >
                                    <ImageBackground
                                        borderRadius={hp(1.5)}
                                        source={item?.product_image?.length == 0 ? noImage : { uri: `${IMAGE_URL}${item?.product_image[0]?.image}` }}
                                        style={{ height: hp(20), width: '100%' }}
                                    >
                                        <TouchableOpacity style={[styles?.likedBtn]} onPress={() => handleProductLike(item)}>
                                            <FontAwesome name={likedProducts.some((p) => p.id === item.id) ? 'heart' : 'heart-o'} size={hp(2.3)} color={Colors.primaryBrown} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    <View style={[styles?.filterCardBox, { marginVertical: hp(.8) }]}>
                                        <Text style={[styles?.cardItemName]}>{item?.name}</Text>
                                        <Text style={[styles?.cardItemRating]}>
                                            <Fontisto name='star' size={hp(1.9)} color={Colors?.yellow} /> {item?.rating || 4.5}
                                        </Text>
                                    </View>
                                    <Text style={[styles?.cardItemPrice]}>${item?.price}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </>
    )
}

export default React.memo(Products)

const styles = StyleSheet.create({
    paddingx: { paddingHorizontal: wp(5.2) },
    filterBox: {
        borderRadius: hp(2.3), borderColor: Colors?.borderGrey,
        borderWidth: hp(.12), paddingHorizontal: wp(4), height: hp(4.5),
        marginHorizontal: wp(1), paddingVertical: hp(1)
    },
    filterName: { color: Colors?.black, fontSize: hp(1.9), fontFamily: Fonts?.RobotoBold },
    filterCardBox: {
        width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap',
    },
    card: { width: '47.8%', marginVertical: hp(1), borderRadius: hp(2) },
    likedBtnView: {
        flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center'
    },
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
})