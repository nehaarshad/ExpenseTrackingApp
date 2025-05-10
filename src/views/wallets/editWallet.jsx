import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import HeaderImage  from '../../components/shared/headerImage'

const EditWallet = ({navigation}) => {
  
  return (
    <View styles={styles.main}>

      {/* header */}
      <HeaderImage title="My Wallets" />
      
       {/* addButton */}
       <View style={styles.container}>
        <TouchableOpacity onPress={()=>{navigation.navigate('addWallets')}}>
          <View style={styles.button}>
        <Ionicons name='add' size={20} color={appColors.lightBaseGreen} />
        <Text style={styles.addButton}>Add Wallet</Text>
         </View>
        </TouchableOpacity>
        </View>

      {/* wallet list */}
      
      
    </View>
  )
}

export default EditWallet

const styles = StyleSheet.create({})