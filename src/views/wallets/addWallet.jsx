import { StyleSheet, Text, View,ActivityIndicator ,Alert} from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import HeaderImage  from '../../components/shared/headerImage'
import React, { useState } from 'react'
import { apiUrl } from '../../constants/apiUrl'
import { appColors } from '../../constants/colors'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import Input from '../../components/shared/input'
import { Dropdown } from 'react-native-element-dropdown'
import GradientButton from '../../components/shared/gradientButton'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import FindUser from '../../utils/getUser'


const AddWallet = ({navigation}) => {

    const {user}=useAuth();
    const [loading, setLoading] = useState(false);
    const [walletName, setWalletName] = useState(null);
    const [walletType, setWalletType] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


   const dropdownData = [
  { label: 'Bank Account', value: 'Bank Account' },
  { label: 'Credit/Debit Card', value: 'Credit/Debit Card' },
  { label: 'Mobile Account', value: 'Mobile Account' },
   { label: 'Cash', value: 'Cash' },
];


    const handleSubmit=async()=>{
        setLoading(true);
       try{

        let userId;
        if(!walletName || !walletType){
            Alert.alert('Error', 'Please fill all the fields!');
            setLoading(false);
            return;
        }

        const data={
            walletName:walletName,
            walletType:walletType,
            totalAmount:0.0,
            Income:0.0,
            Expense:0.0,
        }

        console.log(data);
        if(user && user.email){
        
           userId= await  FindUser(user);
           console.log('UserId Passes:',userId);
              }
        await axios.post(`${apiUrl.baseUrl}/wallets/${userId}.json`, data);
         Alert.alert('Success', 'Wallet Added successfully!');
         navigation.navigate('myWallets');
      
       }
       catch(error){
        Alert.alert('Error', 'Unable to add wallet try later!');
           console.log(error);
        }
        setLoading(false);
        setWalletName("");
        setWalletType("");
    }

  return (
    <View styles={styles.main}>

      {/* header */}
      <HeaderImage title="Add Wallet" />
      
         {/* addComponent */}
        <View style={styles.container}>
          <Input placeholder="Enter Wallet Name" value={walletName} onChangeText={(v)=>setWalletName(v)}></Input>
          <Dropdown
             placeholderStyle={styles.placeholderStyle}
             selectedTextStyle={styles.selectedTextStyle}
            style={styles.dropdown}
            data={dropdownData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Select Wallet Type . . .'
            value={walletType}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setWalletType(item.value);
              setIsFocus(false);
            }}
          />
                     {/* Add Button */}
        <View style={styles.buttonContainer}>
        {loading ? (
            <ActivityIndicator size="large" color={appColors.baseGreen} />
          
        ) : (
          <GradientButton 
            title="Add Wallet" 
            onPress={handleSubmit} 
          />
        )}
        </View>
      
        </View>
    </View>

  )
}

export default AddWallet

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
    },
    container:{
        top:verticalScale(-100),
        backgroundColor:appColors.white,
        borderRadius:radius._30,
        borderColor:appColors.white,
        paddingVertical:spacingY._60,
        paddingHorizontal:spacingX._20,
        borderWidth:1,
        height:"100%",
        gap:spacingY._20,
        marginVertical:spacingX._20,
    },
  dropdown: {
    height: spacingY._45,
    borderColor: appColors.black,
    borderWidth: 1,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
   placeholderStyle: {
    fontSize: spacingY._15,
    color: '#696969'
  },
  selectedTextStyle: {
    fontSize:spacingY._15,
    color:appColors.black,
    fontWeight:'400',
  },
 input:{
    flex:1,
    height:spacingY._50,
    fontSize:spacingY._15,
    color:appColors.black,
    fontWeight:'400',
  },
  buttonContainer: {
    marginTop: spacingY._135,
  },
})