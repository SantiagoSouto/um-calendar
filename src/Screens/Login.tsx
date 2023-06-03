import React from 'react';
import { View } from 'react-native';
import { TamaguiProvider, YStack, Text, H1 } from 'tamagui'

import config from '../../tamagui.config';
import { Input } from '../components/Input'
import { ImageBackground } from 'react-native';

export default function LoginScreen() {
    const backgroundImage = require('./assets/fachada-grande.jpeg');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={{ flex: 1 }}
                >
                    <YStack f={1} padding="$2" paddingTop="$20" alignItems="center" >
                        <H1 color="$blue1" alignItems='center'>
                            Bienvenido!
                        </H1>
                    </YStack>

                    <YStack f={1} mt="$-2">
                        <Input />
                    </YStack>

                </ImageBackground>
            </TamaguiProvider>
        </View>
    );
}