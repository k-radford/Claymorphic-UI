import Constants from 'expo-constants';
import { colorKit } from "reanimated-color-picker";
import { Dimensions, useWindowDimensions } from 'react-native';

Dimensions.addEventListener('change', (window) => {
    let { height, width } = window;
});

let { height, width } = Dimensions.get('window');


const defaultColors = {
    grey: '#a6a6a6',
    lightGrey: '#e5e5e5',
}

const screenContainer = {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
}

const popShadow = {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 30,
    borderColor: defaultColors.grey,
    borderLeftColor: '#f1f1f1',
    borderTopColor: '#f1f1f1',
    borderBottomColor: '#e1e1e1',
    borderRightColor: '#e1e1e1',
    shadowColor: defaultColors.grey,
    shadowRadius: 5,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 2
    }
}

const sinkShadow = {
    borderWidth: 6,
    borderColor: '#ffffff',
    borderRadius: 30,
    shadowColor: defaultColors.grey,
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {
    width: 0,
    height: -2
    }
}

const textInput = {
    height: 40,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    margin: 1,
    borderRadius: 10,
    borderColor: defaultColors.grey
}

const button = {
    height: 50,
    //width: 300,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    margin: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: defaultColors.grey
}

const customSwatches = [
    // row 1
    '#F5BDBB', 
    '#F8D3AA', 
    '#FFFBBE', 
    '#F0FEC1', 
    '#A4D4AF', 
    // row 2
    '#EFA6CB', 
    '#FBE8BF', 
    '#FBFEE0', 
    '#E8FECE', 
    '#D4EBDB', 
    // row 3
    '#F7CDE7',
    '#FFF3F3',
    '#FFFFFF',
    '#EBFEE9',
    '#E1FCF8',
    // row 4
    '#F7CEF8',
    '#F4EFFE',
    '#ECF1FE',
    '#E9FAFE',
    '#DEF1FC',
    // row 5
    '#E1C7FB', 
    '#D8CDED', 
    '#CCCBFB', 
    '#CED9FA', 
    '#C0E7FF', 
];

export { button, defaultColors as colors, customSwatches, popShadow, screenContainer, height as screenHeight, width as screenWidth, sinkShadow, textInput };