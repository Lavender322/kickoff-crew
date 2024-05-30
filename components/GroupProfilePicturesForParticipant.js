import { StyleSheet, View, Image, Text } from 'react-native';

function GroupProfilePicturesForParticipant({ participants, isSeparate }) {
  if (!participants) {
    return (
      <>
      </>
    )
  };

  if (participants.length === 1) {
    return (
      <View style={styles.container}>
        {isSeparate ? (
          <>
            <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
          </>
        ) : (
          <>
            <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
          </>
        )}
      </View>
    )
  };


  if (participants.length === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.twoImages}>
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
      </View>
    )
  };

  if (participants.length === 3) {
    return (
      <View style={styles.container}>
        <View style={styles.threeImages}>
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[2].user.userImage[3]}} style={styles.smallAvatar} />
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[2].userImage[3]}} style={styles.smallAvatar} />
            </>
          )}
        </View>
      </View>
    )
  };

  if (participants.length > 3) {
    return (
      <View style={styles.container}>
        <View style={styles.threeImages}>
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={styles.smallAvatar} />
              <View style={[styles.smallAvatar, styles.plusContainer]}>
                <Text style={styles.plusText}>+{participants.length - 2}</Text>
              </View>
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={styles.smallAvatar} />
              <Image source={{uri: participants[1].userImage[3]}} style={styles.smallAvatar} />
              <View style={[styles.smallAvatar, styles.plusContainer]}>
                <Text style={styles.plusText}>+{participants.length - 2}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    )
  };
}

export default GroupProfilePicturesForParticipant;

const styles = StyleSheet.create({
  twoImages: {
    width: 128,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  threeImages: {
    width: 196,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  fourImages: {
    width: 128,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  fiveImages: {
    width: 196,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  smallAvatar: {
    width: 60,
    height: 60,
    borderRadius: 42
  },
  plusContainer: {
    backgroundColor: '#CEF8D0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusText: {
    color: '#000000',
    fontFamily: 'roboto-bold',
    fontSize: 24
  },
  verticalGap: {
    marginBottom: 8
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  container: {
    position: 'relative'
  },
  bottomAvatarContainer: {
    flexDirection: 'row',
    marginHorizontal: 34,
  },
  bottomLeftAvatar: {
    marginRight: 8
  }
});