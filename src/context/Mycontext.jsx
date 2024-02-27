import { StyleSheet } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { KEYS, getItemFromStorage } from '../../services/storage';

export const Context = createContext();

const Mycontext = ({ children }) => {

    const [likedProducts, setLikedProducts] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [isVerified, setIsVerified] = useState(0);
    const [user,setUser] = useState(null)

    const [selectedFilter, setSelectedFilter] = useState({
        gender: 'All', brand: 'All', pricingRange: '', sortBy: 'Popular', rating: '4.5 and above'
    })
    useEffect(() => {
        getLikedProducts(); // Load liked products from AsyncStorage on component mount.
    }, []);

    const getLikedProducts = async () => {
        try {
            let wishlist = await getItemFromStorage(KEYS.wishlist)
            let loggedInUser = await getItemFromStorage(KEYS.user)
            if(loggedInUser) setUser(loggedInUser)
            if (wishlist) {
                setLikedProducts(wishlist);
            }
        } catch (error) {
            console.log(error, ' : error getting wishlist - async storage');
        }
    };

    return (
        <Context.Provider value={{ likedProducts, setLikedProducts, cartList, setCartList, selectedFilter, setSelectedFilter, isVerified, setIsVerified ,user,setUser}}>{children}</Context.Provider>
    )
}

export default Mycontext

const styles = StyleSheet.create({

})