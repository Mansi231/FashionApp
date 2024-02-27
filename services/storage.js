import AsyncStorage from '@react-native-async-storage/async-storage'

const KEYS = {
    user:'user',
    is_verified:'is_verified',
    access_token:'access_token',
    wishlist:"wishlist",
  }
  

const setItemToStorage= async(key,value) =>{
    await AsyncStorage.setItem(key,JSON.stringify(value))
}

const getItemFromStorage = async(key) =>{
   let val = await AsyncStorage.getItem(key)
   return JSON.parse(val)
}

const clearStorage = async() =>{
    await AsyncStorage.clear()
}

const removeItemFromStorage = async (key) =>{
    await AsyncStorage.removeItem(key)
}

export {getItemFromStorage,setItemToStorage,clearStorage,removeItemFromStorage,KEYS}