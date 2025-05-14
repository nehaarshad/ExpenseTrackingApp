import { useAuth } from '../hooks/useAuth'
import { apiUrl } from '../constants/apiUrl'
import axios from 'axios';

export default FindUser = async(user) => {

  console.log(user);

       try{

      const Users=await axios.get(`${apiUrl.baseUrl}/users.json`);
      const usersData=Users.data;
       console.log(usersData);
       
       
    for (const key of Object.keys(usersData)) {
      const usersArray= usersData[key];
        console.log('usersArray',usersArray);
        if(user.email === usersArray.Email){
         
        console.log('User found:', key);
        return key;
       }
      }
    
    }
       catch(error){
           console.log(error);
        }
}


