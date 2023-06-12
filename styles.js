import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    whiteText: {
        color: 'white',
        marginBottom: 5,
    },
    translucentText: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    boldText: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    container: {
        marginTop: 10,
      },
      contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
      imageContainer: {
        paddingLeft: 15,
      },
      textContainer: {
        marginLeft: 10,
      },
      separator: {
        borderBottomWidth: 1,
        marginTop: 10,
        borderColor: 'white',
      },
});