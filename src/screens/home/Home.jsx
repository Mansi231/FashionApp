import { FlatList, Image, ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../utils'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import TextInput from '../../components/InputComp/TextInputCommon'
import Preference from '../../assets/home/preference.png'
import shopNow from '../../assets/home/shopNow.png'
import Swiper from 'react-native-swiper'
import item1 from '../../assets/home/item1.png'
import item2 from '../../assets/home/item2.png'
import item3 from '../../assets/home/item3.png'
import item4 from '../../assets/home/item4.png'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Routes } from '../../../services/Routes'
import { getCategories, getFilterProducts } from '../../../services/redux/actions/HomeAction'
import { IMAGE_URL } from '@env';
import CategoryProducts from '../category/CategoryProducts'
import Products from './Products'
import Loader from '../../loader/Loader'
import _ from 'lodash';

const Home = ({ navigation, route }) => {

  const [showLocations, setShowLocations] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState([]);

  // Filter Products States

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastProductsPage, setLastProductsPage] = useState(1)
  const [filterProductParams, setFilterProductParams] = useState({ page: currentPage })
  const [selectedFilterOptions, setSelectedFilterOptions] = useState([])

  const images = [shopNow, shopNow, shopNow, shopNow];

  const getCategoryList = async () => {
    try {
      let list = await getCategories();
      setCategory(list)
    } catch (error) {
      console.log(`error getting category list : ${error}`)
    }
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  const scrollViewRef = useRef(null);
  const isAtEndRef = useRef(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
    const isAtEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height;

    // Check if we're at the end and haven't called the API yet
    if (isAtEnd && !isAtEndRef.current) {
      isAtEndRef.current = true;
      if (lastProductsPage > currentPage) {
        getProducts({ ...filterProductParams, page: currentPage + 1 })
      }
    } else if (!isAtEnd) {
      isAtEndRef.current = false;
    }
  };

  const getProducts = async (obj) => {
    setLoading(true)
    try {
      let response = await getFilterProducts(obj)
      // console.log(response?.data?.length)
      if (response?.data) {
        setCurrentPage(response?.current_page)
        if (currentPage < response?.current_page) {
          setProducts((products) => [...products, ...response?.data])
        } else if (response.current_page == 1) {
          setProducts(response?.data)
        }
        setLastProductsPage(response?.last_page)
      }
    } catch (error) {
      console.log(error, '----err while getting products')
    }finally{
      setLoading(false)
    }
  }

  const performSearch = async (query) => {
    getProducts({ name:searchValue, page: 1 })
  };

  const debouncedSearch = useCallback(_.debounce(performSearch, 3000), []); // Adjust the delay as needed.

  const handleSearch = (text) => {
    setSearchValue(text)
    if(text){
      debouncedSearch(text);
    }
    else{
      getProducts({ page: currentPage });
    }
  }

  return (
    <>
      <Loader isLoading={loading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors?.white, paddingBottom: Platform?.OS == 'ios' ? hp(1) : hp(5) }}>
        <View style={[styles?.container]}>
          <StatusBar
            backgroundColor={Colors.white}
            barStyle="dark-content"
          />

          {/* Header Location */}
          <View style={[styles?.headerLocationBox, styles?.paddingx]}>
            <View style={[styles?.locationContainer]}>
              <View style={[styles?.location]}>
                <Ionicons name='location-sharp' color={Colors.primaryBrown} size={hp(2)} />
                <Text style={[styles.locationText]}>
                  Location
                </Text>
              </View>
              <View style={[styles?.location, { paddingLeft: wp(.5) }]}>
                <Text style={[styles?.text]}>New York, USA</Text>
                <TouchableOpacity activeOpacity={.7} onPress={() => setShowLocations(!showLocations)}>
                  <Entypo name={showLocations ? 'chevron-small-up' : 'chevron-small-down'} color={Colors.black} size={hp(2.5)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles?.searchBox}>
              <Feather name='search' color={Colors.black} size={hp(2.3)} />
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{ borderWidth: 0 }}
                  keyboardType={'default'}
                  onChangeText={(value) => handleSearch(value)}
                  value={searchValue}
                  placeholder={''}
                />
              </View>

            </View>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate(Routes?.Filter)}
              activeOpacity={.7} style={[styles?.preference]}>
              <Image source={Preference} style={{
                resizeMode: 'contain',
                width: wp(6),
                height: hp(3),
                tintColor: Colors.white
              }} />
            </TouchableOpacity> */}
          </View>

          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={.1}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
            style={{ width: '100%' }}
          >

            {/* Shop Now Swiper*/}
            <View style={{ height: hp(26) }}>
              <Swiper
                dotColor={Colors.borderGrey}
                activeDotColor={Colors.primaryBrown}
                style={styles.wrapper} showsButtons={false}
                dotStyle={styles.paginationDot}
                activeDotStyle={styles?.paginationDot}
                paginationStyle={styles.paginationContainer}
              >
                {images.map((image, index) => (
                  <View key={index} style={styles.slide}>
                    <Image style={styles.image} source={image} />
                  </View>
                ))}
              </Swiper>
            </View>

            {/* All Categories */}
            <View style={[styles?.paddingx, styles?.headerLocationBox]}>
              <Text style={[styles?.category]}>Category</Text>
              <Text style={[styles?.seeAll]} onPress={() => navigation.navigate(Routes.AllCategory, { category })}>See All</Text>
            </View>
            {category?.length > 0 && <View style={[
              {
                flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
                width: '100%', gap: wp(2), marginVertical: hp(1)
              }
              , styles?.paddingx,]}>
              {
                category?.slice(0, 4).map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={[styles?.categoryItem]} onPress={() => navigation.navigate(Routes.CategoryProducts, { category: item })}>
                      <Image source={{ uri: `${IMAGE_URL}${item?.image}` }} style={{ height: hp(6.5), width: '100%', borderRadius: hp(8) }} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>}

            {/* Flash Sale */}
            <View style={[styles?.paddingx, styles?.headerLocationBox]}>
              <Text style={[styles?.category]}>Flash Sale</Text>
              <View style={[styles?.closingInBox]}>
                <Text style={[styles?.closeIn]}>Closing In : </Text>
                <View style={[styles?.timerBox]}>
                  <Text style={styles?.dot}>02</Text>
                </View>
                <Text style={styles?.dot}>:</Text>
                <View style={[styles?.timerBox]}>
                  <Text style={styles?.dot}>12</Text>
                </View>
                <Text style={styles?.dot}>:</Text>
                <View style={[styles?.timerBox]}>
                  <Text style={styles?.dot}>56</Text>
                </View>
              </View>
            </View>

            {/* Products */}
            <Products navigation={navigation} route={route} products={products} setProducts={setProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} lastProductsPage={lastProductsPage} setLastProductsPage={setLastProductsPage} loading={loading} setLoading={setLoading} getProducts={getProducts} filterProductParams={filterProductParams} setFilterProductParams={setFilterProductParams} selectedFilterOptions={selectedFilterOptions} setSelectedFilterOptions={setSelectedFilterOptions} />

          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  paddingx: { paddingHorizontal: wp(5.2) },
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors?.white },
  headerLocationBox: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginVertical: hp(1.3), width: '100%', gap: wp(3)
  },
  locationContainer: { flexDirection: 'column', gap: hp(.5) },
  location: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: wp(.5), width: '100%' },
  locationText: { color: Colors.grey, fontSize: hp(1.7) },
  text: { color: Colors.black, fontSize: hp(1.6) },
  notification: {
    height: hp(6), width: hp(6), borderRadius: hp(8),
    backgroundColor: Colors.borderGrey, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center'
  },
  searchBox: {
    height: hp(4.4), borderRadius: hp(6),
    borderWidth: hp(.12),
    borderColor: Colors?.borderGrey, textAlign: 'left',
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: wp(2.5), flex: 1
  },
  preference: {
    height: hp(4.2), width: hp(4.2), backgroundColor: Colors.primaryBrown,
    borderRadius: hp(8), justifyContent: 'center', alignItems: 'center',
  },
  wrapper: { height: hp(26), },
  slide: {
    height: hp(25),
    borderRadius: hp(2),
    padding: hp(3),
  },
  image: { borderRadius: hp(1), width: '100%', height: '100%' },
  paginationContainer: {
    position: 'absolute',
    bottom: hp(.5),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  paginationDot: { height: hp(1.3), width: hp(1.3), borderRadius: hp(8) },
  category: { color: Colors.black, fontSize: hp(2.5), fontFamily: Fonts.RobotoBold },
  categoryItem: {
    height: hp(9.5), width: hp(9.5), borderRadius: hp(8), padding: hp(1),
    backgroundColor: Colors?.lightCream, alignItems: 'center', justifyContent: 'center'
  },
  seeAll: { color: Colors.primaryBrown, fontFamily: Fonts.RobotoMedium, fontSize: hp(1.7) },
  closeIn: {
    color: Colors.grey, fontFamily: Fonts.RobotoRegular, fontSize: hp(1.8),

  },
  timerBox: {
    borderRadius: hp(.8), backgroundColor: Colors?.cream,
    textAlign: 'center', paddingHorizontal: wp(1.5), paddingVertical: hp(.4)
  },
  closingInBox: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'flex-start', gap: wp(1)
  },
  dot: { color: Colors.primaryBrown, fontSize: hp(1.8), fontFamily: Fonts?.RobotoMedium },
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