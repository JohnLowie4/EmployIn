import React, { useEffect, useState, useContext } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Button, ScrollView, TextComponent, LayoutAnimation, Platform, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import call from "react-native-phone-call";
import email from "react-native-email";
import { JobContext } from './JobProvider'
import styles from '../styles/ScreensStyle';

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Job Position 1',
    subcategory: [

    ]
  },
  {
    isExpanded: false,
    category_name: 'Job Position 2',
    subcategory: [

    ]
  },

]




const ScreenContainer = ({ children }) => (
  <View >{children}</View>
);


// //// SCREENADDING HTE NEW CANDIDATE

export const Individual = ({ route, navigation, item }) => (
  <ScreenContainer>

    <ScrollView style={styles.container}>
      <View style={styles.rightresume}>
        {console.log(route.params.img_url)}
        < Image source={{ uri: route.params.img_url }} style={styles.image} />

        <View style={styles.personalinfo}>
          <Text style={styles.name}>{route.params.name}</Text>
          <Text style={styles.phone}>{route.params.phone_number}</Text>
          <Text style={styles.email}>{route.params.email}</Text>
        </View>

      </View>

      {/* Other parts of resume like summary */}
      <View style={styles.bottomresume}>

        <View style={styles.skills}>
          <Text>Skills: {route.params.skills}</Text>
        </View>

        <View style={styles.summary}>
          <Text numberOfLines={4} ellipsizeMode='tail'>Summary:
            {route.params.summary}
          </Text>
        </View>

        <View style={styles.experience}>
          <Text >Experience:</Text>
          <Text numberOfLines={4} ellipsizeMode='tail'>
            {route.params.experience}
          </Text>
        </View>

        <View style={styles.links}>
          <Text>External Links</Text>
          <Text style={styles.linkedin}>
            {route.params.externallinks}
          </Text>
        </View>

      </View>

    </ScrollView>
  </ScreenContainer>
);



// expandable section

const ExpandableComponenet = ({ item, onClickFunction, navigation }) => {


  ///adding caling function from call button 
  const dummyNumber = {
    number: "1234567890", // Dummy phone number, we will pass props into here
    prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
  };

  function handlePhoneCall() {
    console.log('it got in here into handlephone call')
    call(dummyNumber).catch(console.error);
  }
  ///////////////////EMAIL BUTTON
  function handleEmail() {
    console.log('it got in here into EMAIL MESSAGING ')
    // This is a dummy variable, we will eventually pass props into here
    const to = ["jzlowie@gmail.com"]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      // cc: ["jzlowie@gmail.com", "jzlowie@yahoo.com"], // string or array of email addresses
      // bcc: "jzlowie@yahoo.com", // string or array of email addresses
      subject: "Show how to use",
      body: "Some body right here",
    }).catch(console.error);
  }

  ///////


  const [layout, setlayout] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setlayout(null)
    } else {
      setlayout(0);
    }
  }, [item.isExpanded])

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={onClickFunction}>
        <Text style={styles.itemText}>
          {item.category_name}
        </Text>
      </TouchableOpacity>

      <View style={{
        height: layout,
        overflow: 'hidden'
      }}>
        {
          item.subcategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              onPress={() =>
                navigation.navigate("Individual", item)
              }
            >
              <View style={styles.subsections}>
                <Image source={{ uri: item.img_url }} style={styles.subimage} />

                <View style={styles.callEmail}>
                  <Text style={styles.text}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    style={styles.customButton1}
                    onPress={() => handlePhoneCall()}  >
                    <Text style={styles.customBtnText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.customButton2}
                    onPress={() => handleEmail()}  >
                    <Text style={styles.customBtnText}>Email</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))
        }
      </View>
    </View >
  )
}



function Candidates({ navigation }) {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const job = useContext(JobContext);



  const [multiSelect, setmultiSelect] = useState(false);
  //const [listdata, setlistdata] = useState(CONTENT);



  ///////Maniulating data


  CONTENT[0].subcategory = []
  for (let i = 0; i < job.Applicant.length; i++) {
    CONTENT[0].subcategory.push(job.Applicant[i])
  }

  const [listdata, setlistdata] = useState(CONTENT);
  const updateLayout = (index) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...listdata];

    if (multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
          : (array[placeindex]['isExpanded']) = false
      );
    }
    setlistdata(array)
  }

  return (


    < SafeAreaView style={{ flex: 1 }
    }>

      <View>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            Job Candidates
          </Text>
        </View>

        <ScrollView>
          {
            listdata.map((item, key) => (
              <ExpandableComponenet
                key={item.category_name}
                item={item}
                onClickFunction={() => {
                  updateLayout(key)
                }}
                navigation={navigation}
              />
            ))
          }
        </ScrollView>

      </View>

    </SafeAreaView >

  );
}



// const styles = StyleSheet.create({
//   this file's styling is now being imported from ScrenStyles.js file

export default Candidates;
