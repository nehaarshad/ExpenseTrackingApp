import { StyleSheet, Text,Button, TouchableOpacity, View,ActivityIndicator,ScrollView,Alert } from 'react-native'
import HeaderImage  from '../../components/shared/headerImage'
import React, { useEffect, useState } from 'react'
import { verticalScale } from '../../utils/scalingUtils'
import { Dropdown } from 'react-native-element-dropdown'
import { appColors } from '../../constants/colors'
import GradientButton from '../../components/shared/gradientButton'
import { apiUrl } from '../../constants/apiUrl'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import Input from '../../components/shared/input'
import { useAuth } from '../../hooks/useAuth'
import { useExpense } from '../../hooks/useExpenses'
import FindUser from '../../utils/getUser'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const AddExpenseView = () => {
 
  const {
    walletId,
    setWalletId,
    expenseType,
    setExpenseType,
    expenseTitle,
    setExpenseTitle,
    expenseDescription,
    setExpenseDescription,
    expenseIcon,
    setExpenseIcon,
    amount,
    setAmount,
    dateTime,
    setDateTime,
    handleSubmit
  } = useExpense();

  const { user } = useAuth();
  
 
  const [name, setName] = useState(null);     // name to display
  const [icon, setIcon] = useState(null);
  const [isIcon, setIsIcon] = useState(false); 
  const [titleIcon, setTitleIcon] = useState(false);  // icon for menu 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Dropdown states
  const [dropdownData, setDropdownData] = useState([]);
  
  const type = [
    { label: 'Expense', value: 'Expense', icon: 'arrow-up-thin' },
    { label: 'Income', value: 'Income', icon: 'arrow-down-thin' },
  ];

  const title = [
    { label: 'Food', value: 'Food', icon: 'food' },
    { label: 'Grocery', value: 'Grocery', icon: 'cart' },
    { label: 'Medical', value: 'Medical', icon: 'hospital' },
    { label: 'Transportation', value: 'Transportation', icon: 'bus' },
    { label: 'Utilities', value: 'Utilities', icon: 'flash' },
    { label: 'Salary', value: 'Salary', icon: 'briefcase' },
    { label: 'Business', value: 'Business', icon: 'domain' },
    { label: 'Investments', value: 'Investments', icon: 'chart-line' },
    { label: 'Gifts', value: 'Gifts', icon: 'gift' },
    { label: 'Entertainment', value: 'Entertainment', icon: 'movie' },
    { label: 'Education', value: 'Education', icon: 'school' },
    { label: 'Shopping', value: 'Shopping', icon: 'shopping' },
    { label: 'Others', value: 'Others', icon: 'dots-horizontal' },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const formattedDate = formatDateTime(date);
    setDateTime(formattedDate);
    console.log(dateTime);
    hideDatePicker();
  };

  const fetchWallets = async () => {
    setLoading(true);
    try {
      let userId = null;
      if (user && user.email) {
        userId = await FindUser(user);
        console.log('UserId Passes:', userId);
      }
      
      const response = await axios.get(`${apiUrl.baseUrl}/wallets/${userId}.json`);
      if (response.data) {
        const walletsArray = [];
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
            label: wallet.walletName, 
            value: key, 
            icon: iconName,
          });
        });

        setDropdownData(walletsArray);
        console.log(walletsArray);
        console.log("dropdownData");
        console.log(dropdownData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const renderWalletItem = (item) => {
    return (
      <View style={styles.dropdownItem}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={spacingY._25} 
          color={appColors.lightBaseGreen} 
          style={styles.dropdownIcon} 
        />
        <View style={styles.labelContainer}>
          <Text style={styles.dropdownLabel}>{item.label}</Text>
        </View>
      </View>
    );
  };

  const renderExpenseTitle = (item) => {
    return (
      <View style={styles.dropdownItem}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={spacingY._25} 
          color={appColors.lightBaseGreen} 
          style={styles.dropdownIcon} 
        />
        <View style={styles.labelContainer}>
          <Text style={styles.dropdownLabel}>{item.label}</Text>
        </View>
      </View>
    );
  };

  const renderExpenseItem = (item) => {
    return (
      <View style={styles.dropdownItem}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={spacingY._25} 
          color={appColors.lightBaseGreen} 
          style={styles.dropdownIcon} 
        />
        <View style={styles.labelContainer}>
          <Text style={styles.dropdownLabel}>{item.label}</Text>
        </View>
      </View>
    );
  };

  const onSubmit = () => {
    handleSubmit();
  };

  return (
    <View style={styles.main}>
      {/* header */}
      <HeaderImage title="Add Transaction" />
      
      <View style={styles.container}>
        {/* Wallet Dropdown */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Select Wallet"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={walletId}
          onChange={item => {
            setWalletId(item.value);
            setName(item.value);
            setIcon(item.icon);
            setIsIcon(true);
            console.log(item, name, walletId);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons
              style={{ marginRight: spacingX._10 }}
              color={appColors.lightBaseGreen}
              name={isIcon ? icon : 'wallet'}
              size={spacingY._25}
            />
          )}  
          renderItem={renderWalletItem}
        />
      
        {/* expenseType */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={type}
          labelField="label"
          valueField="value"
          placeholder="Select Type"
          value={expenseType}
          onChange={item => {
            setExpenseType(item.value);
            console.log(item);
          }}
          renderItem={renderExpenseItem}
        />

        {/* expenseTitle */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={title}
          labelField="label"
          valueField="value"
          placeholder="Select Title"
          value={expenseTitle}
          onChange={item => {
            setExpenseTitle(item.value);
            setExpenseIcon(item.icon);
            console.log('aaaded',item, expenseIcon,expenseTitle);
          }}
          renderItem={renderExpenseTitle}
        />

        <View style={styles.inputFields}>
          {/* Description input */}
          <Input 
            placeholder="Write short Description" 
            value={expenseDescription} 
            onChangeText={(v) => setExpenseDescription(v)}
          />

          {/* Amount input */}
          <Input 
            placeholder="Enter Amount" 
            value={amount} 
            onChangeText={(v) => setAmount(v)}
            keyboardType="numeric"
          />
        </View>
    
        {/* datePicker */}
        <View style={styles.datetime}>
          <Input 
            placeholder="Date & Time" 
            value={dateTime} 
            onChangeText={(v) => setDateTime(v)} 
            editable={false} 
            rightIcon={
              <MaterialCommunityIcons 
                name="calendar" 
                size={spacingY._20} 
                color={appColors.baseGreen} 
                onPress={showDatePicker}
              />
            }
          />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      {/* AddButton */}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={appColors.baseGreen} />
        ) : (
          <GradientButton 
            title="Add Transaction" 
            onPress={onSubmit} 
          />
        )}
      </View>
    </View>
  );
};

export default AddExpenseView;

const styles = StyleSheet.create({
  main:{
    flex: 1,
  },
  container:{
    top: verticalScale(-120),
    paddingHorizontal: spacingX._20,
     paddingVertical: spacingY._20,
     height:'65%',
     backgroundColor: appColors.white,
     marginHorizontal: spacingX._25,
     borderRadius: radius._12,
      
  },
  buttonContainer: {
    top: verticalScale(-180),
     marginHorizontal:spacingX._35,
  },
  dropdown: {
    height: spacingY._45,
    borderColor: appColors.black,
    borderWidth: 1,
    borderRadius: radius._15,
    paddingHorizontal: spacingX._10,
    marginBottom: spacingY._20,
  },
  placeholderStyle: {
    fontSize: spacingY._15,
    color: '#696969'
  },
  inputFields:{
gap:spacingY._20
  },
  selectedTextStyle: {
    fontSize:spacingY._15,
    color:appColors.black,
    fontWeight:'400',
  },
  dropdownItem: {
    flexDirection: 'row',
    padding: spacingY._10,
    alignItems: 'center',
  },
  dropdownIcon: {
    marginRight: spacingX._10,
    
  },
   labelContainer: {
    flex: 1,
    
  },
  dropdownLabel: {
    fontSize: spacingY._15,
  },
  datetime:{
    marginTop:spacingY._20,
  },
})