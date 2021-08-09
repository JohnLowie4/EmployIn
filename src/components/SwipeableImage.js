import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'


export function SearchScreen({ user, route, navigation }) {

  console.log('after i press the job posts, it i sover here')

  return (
    <View style={styles.container}>
      <View style={styles.rightresume}>

        <Image source={{ uri: user.img_url }} style={styles.image} />

        <View style={styles.personalinfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone_number}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

      </View>

      {/* Other parts of resume like summary */}
      <View style={styles.bottomresume}>

        <View style={styles.skills}>
          <Text>Skills: {user.skills}</Text>
        </View>

        <View style={styles.summary}>
          <Text numberOfLines={4} ellipsizeMode='tail'>Summary:
            {user.summary}
          </Text>
        </View>

        <View style={styles.experience}>
          <Text >Experience:</Text>
          <Text numberOfLines={4} ellipsizeMode='tail'>
            {user.experience}
          </Text>
        </View>

        <View style={styles.links}>
          <Text>External Links</Text>
          <Text style={styles.linkedin}>
            {user.externallinks}
          </Text>
        </View>

      </View>

    </View>
  );
}

export default function SwipeableImage({ user, willLike, willPass }) {

  return (
    <View >

      {willLike && (
        <View style={styles.likeBox}>
          <Text style={{ ...styles.textPrimary, color: '#64EDCC' }}>SAVE</Text>
        </View>
      )}
      {willPass && (
        <View style={styles.passBox}>
          <Text style={{ ...styles.textPrimary, color: '#F06795' }}>PASS</Text>
        </View>
      )}

      <SearchScreen user={user} />

    </View>

  )
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderWidth: 3,
  borderRadius: 10,
}

const styles = StyleSheet.create({
  likeBox: {
    ...boxStyle,
    left: 40,
    borderColor: 'green',
    backgroundColor: '#9BC1BC',
    zIndex: 999,
  },
  passBox: {
    ...boxStyle,
    right: 40,
    borderColor: '#F06795',
    borderColor: '#690500',
    backgroundColor: '#ED6A5A',
    zIndex: 999,
  },

  image: {
    width: (90),
    height: (90),
    borderRadius: 50,
    marginLeft: (10),
  },

  rightresume: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: (5),
    marginBottom: (15),
    marginTop: (15),
    borderRadius: 10,
  },

  container: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 60,
    borderWidth: 5,
  },

  personalinfo: {
    alignItems: 'flex-start',

  },

  name: {
    fontSize: (30),
    fontWeight: 'bold',
    marginBottom: (4),
    flexWrap: 'wrap'
  },

  phone: {
    fontSize: (18),
    marginBottom: (10),
  },

  bottomresume: {
    marginLeft: (10),
    marginRight: (10),
  },

  skills: {
    borderWidth: 5,
    padding: (10),
    borderRadius: 15,
    marginBottom: (20),
  },

  summary: {
    borderWidth: 5,
    padding: (10),
    borderRadius: 15,
    marginBottom: (20),
  },
  experience: {
    borderWidth: 5,
    padding: (10),
    borderRadius: 15,
    marginBottom: (20),
  },

  links: {
    borderWidth: 5,
    padding: (15),
    borderRadius: 15,
    marginBottom: (20),
  },

})
