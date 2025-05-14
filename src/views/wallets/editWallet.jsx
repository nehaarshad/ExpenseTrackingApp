import { StyleSheet, Text, View,ActivityIndicator ,Alert} from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import HeaderImage  from '../../components/shared/headerImage'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../constants/apiUrl'
import { appColors } from '../../constants/colors'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import Input from '../../components/shared/input'
import { Dropdown } from 'react-native-element-dropdown'
import GradientButton from '../../components/shared/gradientButton'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import FindUser from '../../utils/getUser'


const EditWallet = ({navigation,route}) => {
  
  
  const {user}=useAuth();

    const [loading, setLoading] = useState(false);
    const [walletName, setWalletName] = useState(null);
    const [walletType, setWalletType] = useState(null);
    const [totalAmount, setTotal] = useState(null);
    const [Income, setIncome] = useState(null);
    const [Expense, setExpense] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    let walletData;


    const getWallet = async(walletId) =>  {

       let userId;
        if(user && user.email){
                
                   userId= await  FindUser(user);
                   console.log('UserId Passes:',userId);
                      }
                      
      const selectedWallet=await axios.get(`${apiUrl.baseUrl}/wallets/${userId}/${walletId}.json`);
      walletData=selectedWallet.data;
      setWalletName(walletData.walletName);
      setWalletType(walletData.walletType);
      setTotal(walletData.totalAmount);
      setIncome(walletData.Income);
      setExpense(walletData.Expense);
       console.log(walletData);
    }

    useEffect(()=>{
      getWallet(route.params.id);
    },[]);

   const dropdownData = [
  { label: 'Bank Account', value: 'Bank Account' },
  { label: 'Credit/Debit Card', value: 'Credit/Debit Card' },
  { label: 'Mobile Account', value: 'Mobile Account' },
   { label: 'Cash', value: 'Cash' },
];


    const handleSubmit=async()=>{
        setLoading(true);
       try{


        if(!walletName || !walletType){
            Alert.alert('Error', 'Please fill all the fields!');
            setLoading(false);
            return;
        }

         const data={
            walletName:walletName,
            walletType:walletType,
            totalAmount:totalAmount,
            Income:Income,
            Expense:Expense,
        }

        let userId;
        if(user && user.email){
                
                   userId= await  FindUser(user);
                   console.log('UserId Passes:',userId);
                      }
        console.log(data);
        await axios.put(`${apiUrl.baseUrl}/wallets/${userId}/${route.params.id}.json`, data);
         Alert.alert('Success', 'Wallet Edit successfully!');
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
      <HeaderImage title="Edit Wallet" />
      
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
            title="Edit Wallet" 
            onPress={handleSubmit} 
          />
        )}
        </View>
      
        </View>
    </View>

  )

}

export default EditWallet

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