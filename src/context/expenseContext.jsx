import { useEffect, useState, createContext } from "react";
import React from "react";
import { useAuth } from '../hooks/useAuth';
import axios from "axios";
import { Alert } from 'react-native';
import { apiUrl } from "../constants/apiUrl";
import FindUser from '../utils/getUser'

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  console.log('User:', user);
 
  // forDasboard
  const [totalAmount, setTotalAmount] = useState(0); //totalBalance
  const [totalExpense, setTotalExpense] = useState(0); //totalExpense
  const [totalIncome, setTotalIncome] = useState(0);  //totalIncome
  const [userTransactions, setUserTransactions] = useState([]); //transactionHistory
  const [loading, setLoading] = useState(false);
  
  // for addExpense view
  const [walletId, setWalletId] = useState(null); //to edit selected Wallet amount
  const [expenseType, setExpenseType] = useState(null); // "Expense" or "Income"
  const [expenseTitle, setExpenseTitle] = useState(null); //food,hospital etc
  const [expenseDescription, setExpenseDescription] = useState(null);  //short desx
  const [expenseIcon, setExpenseIcon] = useState(null); //titleIcon
  const [amount, setAmount] = useState(null); //expenseAmount
  const [dateTime, setDateTime] = useState(null);

  const getUserCardInfo = async () => {
    setLoading(true);
    try {
      let userId;

      if (user) {
        userId = await FindUser(user);
        console.log('UserId Passes:', userId);
      }
      
      const response = await axios.get(`${apiUrl.baseUrl}/userCard/${userId}.json`);
      const data = response.data;
        console.log('userCard', data);
        setTotalAmount(data.totalAmount);
        setTotalExpense(data.expenses);
        setTotalIncome(data.income);
        setLoading(false);
      

    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  }

  const getUserTransaction = async () => {
    setLoading(true);
    try {
      let userId;

      if (user) {
        userId = await FindUser(user);
      }
    
      let transactionArray = [];
      const response = await axios.get(`${apiUrl.baseUrl}/transactions/${userId}.json`);
      const data = response.data;
      console.log('transacations', data);
      
      if (data === null) {
        setUserTransactions([]);
        setLoading(false);
        return;
      }
      else{
        Object.keys(data).forEach(key => {
        const transaction = data[key];
      
        transactionArray.push({
          id: key,
          icon: transaction.icon, //leftIcon
          title: transaction.title, 
          description: transaction.description,
          date: transaction.date,
          amount: transaction.amount,
          type: transaction.type
        });
      });
}
      setUserTransactions(transactionArray);
      console.log('userTransactions', userTransactions);
      setLoading(false);

    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  }

  const getData = () => {
    getUserCardInfo();
    getUserTransaction();
  }

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  // addExpense
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let userId = null;
      if (user && user.email) {
        userId = await FindUser(user);
        console.log('UserId Passes:', userId);
      }
      

      if (!walletId ||!expenseTitle ||!expenseDescription ||!expenseIcon || !expenseType || !amount || !dateTime) {
        Alert.alert('Error', 'Please fill all the fields!');
        setLoading(false);
        return;
      }

      const transactionAmount = parseFloat(amount);
      if (isNaN(transactionAmount) || transactionAmount <= 0) {
        Alert.alert('Error', 'Please enter a valid amount!');
        setLoading(false);
        return;
      }

      // Add User Transaction for home screen Cards
      let HomeViewCardData = null;
      const cardDetail = await axios.get(`${apiUrl.baseUrl}/userCard/${userId}.json`);
      const cardData = cardDetail.data;
      console.log('cardData',cardData);

      if (cardData == null) {
        if (expenseType === "Expense") {
          HomeViewCardData = {
            expenses: transactionAmount,
            totalAmount: transactionAmount,
            income: 0,
          };
        } else { // Income
          HomeViewCardData = {
            expenses: 0,
            totalAmount: transactionAmount,
            income: transactionAmount,
          };
        }

        await axios.post(`${apiUrl.baseUrl}/userCard/${userId}.json`, HomeViewCardData);
      } 
      else {
        // Object.keys(cardData).forEach(key => {
        //   const card = cardData[key];
        //   console.log(card);
          if (expenseType === "Expense") {
            cardData.totalAmount = cardData.totalAmount - transactionAmount;
            cardData.expenses = cardData.expenses + transactionAmount;
          } else {
            cardData.totalAmount = cardData.totalAmount + transactionAmount;
            cardData.income = cardData.income + transactionAmount;
          }
        // });
        
        await axios.put(`${apiUrl.baseUrl}/userCard/${userId}.json`, cardData);
      }

      // Add User Transaction for home screen Tiles
      const transactionData = {
        icon: expenseIcon,
        title: expenseTitle,
        description: expenseDescription,
        amount: transactionAmount,
        date: dateTime,
        walletID:walletId,
        type: expenseType,
      };

      await axios.post(`${apiUrl.baseUrl}/transactions/${userId}.json`, transactionData);
      
      // Fetching selected wallet data
      const selectedWallet = await axios.get(`${apiUrl.baseUrl}/wallets/${userId}/${walletId}.json`);
      const walletData = selectedWallet.data;
      console.log(walletData);
      
      if (expenseType === "Expense") {
        // Check wallet balance
        if (walletData.totalAmount - transactionAmount < 0) {
          Alert.alert('Error', 'Insufficient balance in wallet!');
          setLoading(false);
          return;
        }
        walletData.totalAmount = walletData.totalAmount - transactionAmount;
        walletData.Expense = walletData.Expense + transactionAmount;
      } else {
        walletData.totalAmount = walletData.totalAmount + transactionAmount;
        walletData.Income = walletData.Income + transactionAmount;
      }
      
      const data = {
        walletName: walletData.walletName,
        walletType: walletData.walletType,
        totalAmount: walletData.totalAmount,
        Income: walletData.Income,
        Expense: walletData.Expense,
      };

      console.log(data);

      // Update the wallet data
      await axios.put(`${apiUrl.baseUrl}/wallets/${userId}/${walletId}.json`, data);
      Alert.alert('Success', 'Transaction Added successfully!');
      
      // Reset form fields
      setExpenseTitle(null);
      setExpenseDescription(null);
      setExpenseType(null);
      setExpenseIcon(null);
      setAmount(null);
      setDateTime(null);
      setWalletId(null);
      
      // Refresh homeView Data after add Expense
      getData();
      
    } catch (error) {
      Alert.alert('Error', 'Unable to add Expense try later!');
      console.log(error);
    }

    setLoading(false);
  };

  const value = {
    
    totalAmount,
    totalExpense,
    totalIncome,
    userTransactions,
    loading,
    getData,
    // Expose new state and functions
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
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};