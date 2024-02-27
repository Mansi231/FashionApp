import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '../../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/CommonComp'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../pixel'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInput from '../../components/InputComp/TextInputCommon'
import item1 from '../../assets/home/item1.png'
import item2 from '../../assets/home/item2.png'
import item3 from '../../assets/home/item3.png'
import item4 from '../../assets/home/item4.png'
import { Routes } from '../../../services/Routes'

const Search = ({ navigation, route }) => {

  const [serachValue, setSearchValue] = useState('');
  const [recentSearch, setRecentSearch] = useState([
    'Blue Shirt',
    'CosmicChic Jacket',
    'EnchantedElegance Dress',
    'WhismyWhirl Top',
    'Fluffernova Coat',
    'Miragemelody Cape',
    'BlossomBreeze Overalls',
    'EnchantedElegance Dress',
    'CosmicChic Jacket',
    'BlossomBreeze Overalls',
    'Fluffernova Coat',
    'CosmicChic Jacket',
    'EnchantedElegance Dress',
    'WhismyWhirl Top',
    'Blue Shirt',
    'Miragemelody Cape',
  ])
  const [filterItem, setFilterItems] = useState([
    { image: item1, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9' },
    { image: item1, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9' },
    { image: item2, liked: false, price: 120.00, name: 'Brown Suit', rating: '5.0' },
    { image: item2, liked: false, price: 120.00, name: 'Brown Suit', rating: '5.0' },
    { image: item3, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9' },
    { image: item3, liked: false, price: 83.97, name: 'Brown Jacket', rating: '4.9' },
    { image: item4, liked: false, price: 120.00, name: 'Yellow Shirt', rating: '5.0' },
    { image: item4, liked: false, price: 120.00, name: 'Yellow Shirt', rating: '4.0' },
  ])

  const handleRemoveResult = (ind) => {
    let arr = [...recentSearch];
    arr.splice(ind, 1);
    setRecentSearch(arr);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={[styles?.container]}>
        <StatusBar backgroundColor={Colors.white} />

        {/* header */}
        <Header heading={'Search'} onPress={() => navigation.goBack()} />

        {/* Search Input */}
        <View style={[styles?.rowBox]}>
          <View style={styles?.searchBox}>
            <Feather name='search' color={Colors.primaryBrown} size={hp(3.3)} />
            <View style={{ flex: 1 }}>
              <TextInput
                style={{ borderWidth: 0 }}
                keyboardType={'default'}
                onChangeText={(value) => setSearchValue(value)}
                value={serachValue}
                placeholder={'Search'}
                placeholderTextColor={Colors.grey}
              />
            </View>

          </View>
        </View>

        {/* Clear All / Recent */}
        <View style={[styles?.rowBox, { borderBottomWidth: hp(.12), borderBottomColor: Colors.borderGrey, paddingBottom: hp(2) }]}>
          <Text style={[styles?.recent]}>Recent</Text>
          <Text style={[styles?.clearAll]}>Clear All</Text>
        </View>

        {/* Search result */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5) }}
          style={{ width: '100%' }}
        >
          {
            serachValue == '' ?
              recentSearch?.map((item, index) => {
                return (
                  <View style={[styles?.rowBox, { marginVertical: hp(1.5) }]} key={index}>
                    <Text style={[styles?.recent, { fontSize: hp(1.9), color: Colors.grey, fontFamily: Fonts?.Roboto }]}>{item}</Text>
                    <TouchableOpacity activeOpacity={.9} onPress={() => handleRemoveResult(item)}>
                      <MaterialIcons name='highlight-remove' color={Colors.primaryBrown} size={hp(2.8)} />
                    </TouchableOpacity>
                  </View>
                )
              }) :
              <View style={{marginVertical:hp(1)}}>
                <View style={[styles?.rowBox,{marginTop:0}]}>
                  <Text style={styles?.foundText}>{`Results for "${serachValue}"`}</Text>
                  <Text style={styles?.foundText}>6,245 founds</Text>
                </View>
                <View style={[styles?.filterCardBox]}>
                  {filterItem?.map(({ image, liked, name, price, rating }, index) => {
                    return (
                      <TouchableOpacity key={index} activeOpacity={.7}
                        style={[styles?.card]}
                        onPress={() => navigation.navigate(Routes?.ProductDetail, {
                          item: { image, liked, name, price, rating }
                        })}
                      >
                        <ImageBackground
                          borderRadius={hp(1.5)}
                          source={image}
                          style={{ height: hp(20), width: '100%' }}
                        >
                          <TouchableOpacity style={[styles?.likedBtn]}>
                            <Ionicons name='heart-sharp' size={hp(2.7)} color={Colors.primaryBrown} />
                          </TouchableOpacity>
                        </ImageBackground>
                        <View style={[styles?.filterCardBox, { marginVertical: hp(.8) }]}>
                          <Text style={[styles?.cardItemName]}>{name}</Text>
                          <Text style={[styles?.cardItemRating]}>
                            <Fontisto name='star' size={hp(1.9)} color={Colors?.yellow} /> {rating}
                          </Text>
                        </View>
                        <Text style={[styles?.cardItemPrice]}>${price}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
    backgroundColor: Colors.white, paddingBottom: hp(3.3), paddingHorizontal: wp(5.2),
  },
  paddingX: { paddingHorizontal: wp(5.2), },
  rowBox: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginVertical: hp(1), width: '100%'
  },
  searchBox: {
    height: hp(6.4), borderRadius: hp(6),
    borderWidth: hp(.12),
    borderColor: Colors?.borderGrey, textAlign: 'left',
    marginVertical: hp(2), flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: wp(2.5), flex: 1
  },
  recent: { color: Colors.black, fontSize: hp(2.6), fontFamily: Fonts.RobotoMedium },

  clearAll: { color: Colors.primaryBrown, fontFamily: Fonts.Roboto, fontSize: hp(2.3) },


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

  foundText:{color:Colors.black,fontSize:hp(2.1),fontFamily:Fonts.RobotoMedium}
})