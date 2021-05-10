/* eslint-disable no-unused-vars */
import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext();
export class AudioProvider extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            audioFiles: []
        }
    }

    permissionAlert = () => {
Alert.alert("Permission Required", "This app needs to read audio files!",
 [{
    text: 'I am ready',
    onPress: () => this.getPermission()
}, {
    text: 'canceled',
    onPress: () => this.permissionAlert()
},
] );
    };

// below code is retrieving and showcasing the files 
    getAudioFiles = async () => {
let media = await MediaLibrary.
getAssetsAsync({
    mediaType: 'audio',
  
});
media = await MediaLibrary.
getAssetsAsync({
    mediaType: 'audio',
  first: media.totalCount,
});
this.setState({...this.state, audioFiles: media.assets})
// this.setState({...this.state, audioFiles: this.media.assets })
    };

    getPermission = async () => {
         //  {
    //     "accessPrivileges": "none",
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    //   }
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted) {
            // we want to get all the audio files
            this.getAudioFiles();
        }

        if(!permission.granted && permission.canAskAgain){
            // request for permission again
           const {status, canAskAgain} = await MediaLibrary.
           requestPermissionsAsync();
           if(status === 'denied' && canAskAgain){
               this.permissionAlert()
            // display alert user must allow permission to work this app
           }
           if(status === 'granted'){
                // we want to get all the audio files
                this.getAudioFiles();
           }
           if(status === 'denied' && !canAskAgain){
            // we want to display some error to user
        }
        }
    }
   

    componentDidMount() {
        this.getPermission()
    }
    render() {
        return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider
