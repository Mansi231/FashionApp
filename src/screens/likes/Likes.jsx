import { ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import { BackArrow } from '../../components/CommonComp'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Routes } from '../../../services/Routes'
import { IMAGE_URL } from '@env';
import { Context } from '../../context/Mycontext'
import { KEYS, setItemToStorage } from '../../../services/storage'

const Likes = ({ navigation, route }) => {

  const { likedProducts, setLikedProducts } = useContext(Context)

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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors?.white, paddingBottom: Platform?.OS == 'ios' ? hp(2) : hp(6) }}>
      <View style={[styles?.container]}>
        <StatusBar backgroundColor={Colors.white} />

        {/* header */}
        <View style={[styles?.header]}>
          <BackArrow style={{ marginLeft: 0, backgroundColor: Colors.white }} onPress={() => navigation.goBack()} />
          <Text style={styles?.headerText}>My Wishlist</Text>
          <View />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(15) }}
          style={{ width: '100%' }}
        >
          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[{ flex: 1, width: '100%', marginVertical: hp(1) }, styles?.paddingx]}
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
          /> */}
          <View style={{ marginVertical: hp(1) }}>
            <View style={[styles?.filterCardBox, styles?.paddingx]}>
              {
                likedProducts?.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} activeOpacity={.7}
                      style={[styles?.card]}
                      onPress={() => navigation.navigate(Routes?.ProductDetail, { product: item, liked: true })}
                    >
                      <ImageBackground
                        borderRadius={hp(1.5)}
                        source={{ uri: `${IMAGE_URL}${item?.product_image[0]?.image}` }}
                        style={{ height: hp(20), width: '100%' }}
                      >
                        <TouchableOpacity style={[styles?.likedBtn]} onPress={() => handleProductLike(item)}>
                          <FontAwesome name={'heart'} size={hp(2.3)} color={Colors.primaryBrown} />
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
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Likes

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
    paddingHorizontal: wp(5.2), backgroundColor: Colors.white
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', paddingVertical: hp(1), backgroundColor: Colors?.white
  },
  headerText: {
    color: Colors?.black, textAlignVertical: 'center', textAlign: 'center',
    fontFamily: Fonts.RobotoMedium, fontSize: hp(2.1), marginTop: hp(1.5)
  },
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
    alignSelf: 'flex-end', height: hp(4.5), width: hp(4.5), backgroundColor: Colors.Timberwolf,
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