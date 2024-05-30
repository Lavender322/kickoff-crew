import { StyleSheet, View, Image, Text } from 'react-native';

function GroupProfilePictures({ host, participants, isSeparate, currentUserUnReadMessage }) {
  if (!participants) {
    return (
      <Image source={{uri: host.userImage[3]}} style={styles.avatar} />
    )
  };

  if ((participants.length + 1) === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.twoImages}>
          <Image source={{uri: host.userImage[3]}} style={styles.smallAvatar} />
          {isSeparate ? (
            <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
          ) : (
            <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
          )}
        </View>
        {currentUserUnReadMessage && currentUserUnReadMessage !== 0 ? (
          <View style={styles.greenDot}></View>
        ) : null}
      </View>
    )
  };

  if ((participants.length + 1) === 3) {
    return (
      <View style={styles.container}>
        <View style={styles.threeImages}>
          <Image source={{uri: host.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap, styles.topAvatar]} />
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
            </>
          )}
        </View>
        {currentUserUnReadMessage && currentUserUnReadMessage !== 0 ? (
          <View style={styles.greenDot}></View>
        ) : null}
      </View>
    )
  };

  if ((participants.length + 1) === 4) {
    return (
      <View style={styles.container}>
        <View style={styles.fourImages}>
          <Image source={{uri: host.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[2].user.userImage[3]}} style={styles.smallAvatar} />
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
              <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[2].userImage[3]}} style={styles.smallAvatar} />
            </>
          )}
        </View>
        {currentUserUnReadMessage && currentUserUnReadMessage !== 0 ? (
          <View style={styles.greenDot}></View>
        ) : null}
      </View>
    )
  };

  if ((participants.length + 1) > 4) {
    return (
      <View style={styles.container}>
        <View style={styles.fourImages}>
          <Image source={{uri: host.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
              <View style={[styles.smallAvatar, styles.plusContainer]}>
                {/* <Text style={styles.plusText}>+4</Text> */}
                <Text style={styles.plusText}>+{participants.length - 2}</Text>
              </View>
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={[styles.smallAvatar, styles.verticalGap]} />
              <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
              <View style={[styles.smallAvatar, styles.plusContainer]}>
                {/* <Text style={styles.plusText}>+4</Text> */}
                <Text style={styles.plusText}>+{participants.length - 2}</Text>
              </View>
            </>
          )}
        </View>
        {currentUserUnReadMessage && currentUserUnReadMessage !== 0 ? (
          <View style={styles.greenDot}></View>
        ) : null}
      </View>
    )
  };
}

export default GroupProfilePictures;

const styles = StyleSheet.create({
  twoImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  threeImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  fourImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  plusContainer: {
    backgroundColor: '#CEF8D0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusText: {
    color: '#000000',
    fontFamily: 'roboto'
  },
  verticalGap: {
    marginBottom: 4
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  topAvatar: {
    marginHorizontal: 17
  },
  container: {
    position: 'relative'
  },  
  greenDot: {
    position: 'absolute',
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2CC069',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }
});