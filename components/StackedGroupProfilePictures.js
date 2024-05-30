import { StyleSheet, View, Image, Text } from 'react-native';

function StackedGroupProfilePictures({ host, participants, isSeparate, alreadyParticipatedNumber, allowedParticipantsNumber }) {

  return (
    <View style={styles.avatarsContainer}>
      <Image source={{uri: host.userImage[3]}} style={styles.miniAvatar} />
      {participants && (participants.length + 1) === 2 && (
        <>
          {isSeparate ? (
            <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
          ) : (
            <Image source={{uri: participants[0].userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
          )}
        </>
      )}

      {participants && (participants.length + 1) === 3 && (
        <>
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
              <Image source={{uri: participants[1].userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
            </>
          )}
        </>
      )}
      {participants && (participants.length + 1) >= 4 && (
        <>
          {isSeparate ? (
            <>
              <Image source={{uri: participants[0].user.userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
              <Image source={{uri: participants[1].user.userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
              <Image source={{uri: participants[2].user.userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
            </>
          ) : (
            <>
              <Image source={{uri: participants[0].userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
              <Image source={{uri: participants[1].userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
              <Image source={{uri: participants[2].userImage[3]}} style={[styles.miniAvatar, styles.miniAvatarRight]} />
            </>
          )}
        </>
      )}
    
      <Text style={styles.numParticipants}>{alreadyParticipatedNumber}/{allowedParticipantsNumber === 10000 ? '∞' : allowedParticipantsNumber}</Text>
    </View>
  );
}

export default StackedGroupProfilePictures;

const styles = StyleSheet.create({
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },  
  miniAvatar: {
    width: 48,
    height: 48,
    borderRadius: 42,
    overflow: 'hidden'
  },
  miniAvatarRight: {
    zIndex: 9,
    marginLeft: -7
  },
  numParticipants: {
    fontFamily: 'roboto',
    fontSize: 15,
    color: '#4F4F4F',
    marginLeft: 8,
  }
});