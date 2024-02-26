import { StyleSheet, View, TextInput, Image, Animated, Text, Platform } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../pixel';
import { useEffect, useRef, useState } from 'react';
import { Colors, Fonts } from '../../../utils';
const TextInputCommon = ({
  value,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  placeholderTextColor,
  keyboardType,
  borderColor,
  icon,
  source,
  style,
  autoCapitalize, textContentType, secureTextEntry,textAlignVertical,
  editable, require, multiline, numberOfLines, placeholderContainerStyle, maxLength
}) => {

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => { startFloating(); setIsFocused(true) };

  const handleBlur = () => {

    setIsFocused(false)
  };


  return (

    <TextInput style={[styles?.phoneNumber, styles?.numberText, style]}
      secureTextEntry={secureTextEntry}
      editable={true}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => { }}
      onBlur={() => { }}
      keyboardType={keyboardType}
      // keyboardType={'decimal-pad'}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={textAlignVertical || 'center'}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || Colors?.lightGrey}
      maxLength={maxLength}
    />

  );
};

export default TextInputCommon;

const styles = StyleSheet.create({
  phoneNumber: {
    height: hp(6.4),
    borderRadius: hp(6),
    borderWidth: hp(.12),
    borderColor: Colors?.borderGrey, textAlign: 'left',
    width: '100%',
  },
  numberText: {
    fontSize: hp(2),
    color: Colors?.primaryBrown,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.1),
    letterSpacing: 1,
    fontFamily: Fonts.Roboto, textAlignVertical: 'center'
  },

});


