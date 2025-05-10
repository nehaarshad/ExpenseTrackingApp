import { StyleSheet, Text, TouchableOpacity, View,ActivityIndicator,ScrollView,Alert } from 'react-native'
import HeaderImage  from '../../components/shared/headerImage'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { appColors } from '../../constants/colors'
import { apiUrl } from '../../constants/apiUrl'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import { radius, spacingX, spacingY } from '../../constants/scaling'

const Wallets = ({navigation}) => {

  const [wallets,setWallets]=useState([]);
  const [loading, setLoading] = useState(false);


    const handleDeleteWallet = (walletId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this wallet?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteWallet(walletId) }
      ]
    );
  };

  const deleteWallet=async(walletId)=>{
    setLoading(true);
    try {
      await axios.delete(`${apiUrl.baseUrl}/wallets/${walletId}.json`);
      Alert.alert('Success', 'Wallet deleted successfully!');
      fetchWallets();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to delete wallet, try again later!');
    } finally {
      setLoading(false);
    }
  }

  const fetchWallets=async()=>{

    setLoading(true);
    try {
      const response=await axios.get(`${apiUrl.baseUrl}/wallets.json`);
      if(response.data){
        const walletsArray=[];

         Object.keys(response.data).forEach(key => {
          const wallet = response.data[key];

          let iconName;
          switch (wallet.walletType) {
            case 'Bank Account':
              iconName = 'bank';
              break;
            case 'Credit/Debit Card':
              iconName = 'cards';
              break;
            case 'Mobile Account':
              iconName = 'cellphone';
              break;
            case 'Cash':
              iconName = 'cash';
              break;
            default:
              iconName = 'wallet';
              break;
          }

          walletsArray.push({
            id: key,
            icon: iconName,
            name: wallet.walletName,
            type: wallet.walletType,
             totalAmount:wallet.totalAmount,
            Income:wallet.Income,
            Expense:wallet.Expense,
          });
        });

      setWallets(walletsArray);
      console.log(wallets);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchWallets();
  },[]);

  return (
    <View styles={styles.main}>

      {/* header */}
      <HeaderImage title="My Wallets" />
      
       {/* addButton */}
       <View style={styles.container}>
        <TouchableOpacity onPress={()=>{navigation.navigate('addWallets')}}>
          <View style={styles.button}>
        <Ionicons name='add' size={20} color={appColors.baseGreen}  />
        <Text style={styles.addButton}>Add Wallet</Text>
         </View>
        </TouchableOpacity>
        </View>

      {/* wallet list */}
      
       {loading ? (
        <ActivityIndicator size="large" color={appColors.baseGreen} />
      ) : wallets.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {wallets.map((wallit, index) => (
            <View key={index} style={styles.wishlistCard}>
 
              <View style={styles.topBar}>
              <View style={styles.cartTitle}>
              <MaterialCommunityIcons name={wallit.icon} size={30} color={appColors.baseGreen} />
              <Text style={styles.walletname}>{wallit.name}</Text>
              </View>
                <TouchableOpacity onPress={() => handleDeleteWallet(wallit.id)}>
                  <MaterialCommunityIcons name='delete' size={30} color={appColors.red} />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomBar}>
                <Text style={styles.text}>Total Amount:</Text>
                <Text style={styles.number}>{wallit.totalAmount}</Text>
                </View>
            
            
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}

    </View>
  )
}

export default Wallets

const styles = StyleSheet.create({
  main:{
    flex: 1,
  },
  container:{
     justifyContent:'flex-end',
     alignContent:'flex-end',
     alignItems:'flex-end',
      marginTop: spacingY._10,
      marginBottom: spacingY._10,
      marginRight: spacingX._10,
      
  },
  button:{
    flexDirection: 'row',
     alignItems:'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: spacingY._3,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._40,
    borderColor: appColors.baseGreen,
    borderWidth: 1.5,
    backgroundColor: appColors.background,
    width:spacingX._100,
  },
  addButton:{
    color: appColors.baseGreen,
    fontSize: spacingY._15,
    fontWeight: 'bold',
  },
    scrollView: {
    maxHeight: '50%'
  },
  cartTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._7,
    marginBottom: spacingY._5,
  },
  wishlistCard: {
    marginVertical: spacingY._7,
    marginHorizontal: spacingX._20,
    backgroundColor: appColors.white,
    borderRadius: radius._8,
    height: spacingY._70,
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: radius._5,
    elevation: 2
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletname: {
    fontSize: spacingY._20,
    fontWeight: '600',
    marginBottom: spacingY._5,
    color: appColors.black,
    fontFamily: 'inter',
  },
  bottomBar:{
    flexDirection: 'row',
    gap: spacingX._3,
  },
  text: {
    marginLeft: spacingX._50,
    fontSize: spacingY._15,
    color: appColors.buttonGradient.start,
    fontWeight:'600',
  },
  number: {
    fontSize: spacingY._15,
    color: appColors.buttonGradient.start
  },
  noDataText: {
    textAlign: 'center',
    marginTop: spacingY._20,
    fontSize: spacingY._18,
    color: appColors.black,
  },

})