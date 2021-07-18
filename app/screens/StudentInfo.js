import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Item, Button, Image, TouchableOpacity, SectionList, StatusBar, SafeAreaView } from 'react-native';
import Header from '../components/Header'
import BackButton from '../components/BackButton';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { images } from '../constants';
import { Loading } from '../components/Loading';
import axios from "axios";
import { BASE_URL } from '../config/index';

const StudentInfo = ({ route,navigation }) => {
  const [loading, setLoading] = useState(false);
  const [studentInformation, updateStudentInformation] = React.useState([]);
    const [responseError, setResponseError] = useState('');
  const [feeStatus, setFeeStatus] = useState([]);

  const registration_no = route.params.reg_no
   useEffect(() => {
    setLoading(true)
     try {
      axios.post(`${BASE_URL}/student/get/` + registration_no)
        .then((res) => {
          setLoading(false)
          console.log('res', res)
          let response = res.data.id
          console.log(response)
           let studentInfo = [];
      studentInfo.push(<View style={styles.userInfoSection} key={1}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={images.person}
            size={80}
            style={{backgroundColor: 'white'}}
          />
          
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{response.st_name}</Title>
            <Caption style={styles.caption}>Student</Caption>
          </View>
        </View>
        <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="school" color="#777777" size={20}/>
          <Text style={styles.student_detail}>Department Name: {response.st_department}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="file" color="#777777" size={20}/>
          <Text style={styles.student_detail}>Registration Number: {response.st_reg_number}</Text>
        </View>
      </View>

      {/* fee history */}
      
              
        </View>
        )
           updateStudentInformation([...studentInformation,studentInfo])

// checking for fee history here
          if(response.fee_history.length == 0){
            console.log('No fee history available')
            setResponseError('No fee history available for this student')
          }
          else {

            console.log(response.fee_history)
            let fee_status = []
            for(let i = 0; i<response.fee_history.length; i++){
            fee_status.push(
                <View key={i+1}>
                  <Text>Month: {response.fee_history[i].paid_month}</Text>
                <Text>Fee Status: {response.fee_history[i].fee_status}</Text>
                <Text>Paid Date: {response.fee_history[i].paid_date}</Text>
            
              
              </View>
            )
       }
          //   fee_status.push (
          // <View style={styles.infoBoxWrapper} key={3}>
          //   <View style={[styles.infoBox, {
          //     borderRightColor: '#dddddd',
          //     borderRightWidth: 1
          //   }]}>
          //     <Title style={{color: "#0d47a1"}}>Month</Title>
          //     <Caption>January</Caption>
          //     <Caption>February</Caption>
          //     <Caption>March</Caption>
          //   </View>
          //   <View style={styles.infoBox}>
          //     <Title style={{color: "#0d47a1"}}>Fee Status</Title>
          //     <Caption>Paid</Caption>
          //     <Caption>Unpaid</Caption>
          //     <Caption>Paid</Caption>
          //   </View>
          // </View>
          //       )
          setFeeStatus([fee_status])

          }



        })
    }
    catch (err) { console.log(err)}
  }, [])
  console.log('in stddent infi', registration_no)
    return (
          <SafeAreaView style={styles.container}>
          <BackButton goBack={() => navigation.navigate('StudentHomeScreen')} />
        {studentInformation}
        <Text>{responseError}</Text>
        {feeStatus}
          <Loading loading={loading} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 35
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#0d47a1"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 200,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
student_detail: {
  color:"#777777", 
  marginLeft: 5
}


});

export default StudentInfo;