import React, { useState, useEffect, useContext } from "react";
import { Alert, SafeAreaView, TouchableOpacity, Button, StyleSheet, ScrollView, View, Text, Modal } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const terms1 = `By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app: 

- You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. 
- You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. 
- The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to Kaitlin Radford.

You agree that when using the App you will:

- Obey all traffic laws, including any laws that restrict the use of mobile devices while driving;
- Use the App only when it is safe to do so and when it will not distract from or interfere with your driving; and
- Not use the App for any illegal, hazardous, or unauthorized purposes, or in a manner that is not consistent with these Terms of Use.

Kaitlin Radford is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.

The Claymorphism-UI app stores and processes personal data that you have provided to us, to provide my Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Claymorphism-UI app won’t work properly or at all.

The app does use third-party services that declare their Terms and Conditions.

Link to Terms and Conditions of third-party service providers used by the app`;

const terms2 = `You should be aware that there are certain things that Kaitlin Radford will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but Kaitlin Radford cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.

If you’re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.

Along the same lines, Kaitlin Radford cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Kaitlin Radford cannot accept responsibility.

With respect to Kaitlin Radford’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Kaitlin Radford accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.

At some point, we may wish to update the app. The app is currently available on iOS – the requirements for the system(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Kaitlin Radford does not promise that it will always update the app so that it is relevant to you and/or works with the iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.`

const limited_liability = `UNDER NO CIRCUMSTANCES SHALL KAITLIN BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, SPECIAL OR EXEMPLARY DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS AND/OR USE OF OR INABILITY TO ACCESS AND/OR USE THE APP AND ANY THIRD-PARTY CONTENT AND SERVICES, INCLUDING, BUT NOT LIMITED TO, ANY ERRORS OR OMISSIONS IN ANY CONTENT, OR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT (OR PRODUCT) POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE APP, WHETHER OR NOT THE DAMAGES WERE FORESEEABLE AND WHETHER OR NOT KAITLIN WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED REMEDY FAILS OF ITS ESSENTIAL PURPOSE. BECAUSE SOME STATES OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR THE LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH STATES OR JURISDICTIONS, KAITLIN’S LIABILITY SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW.`;

const changes = `I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page.`;

const contact = `If you have any questions or suggestions about my Terms and Conditions, do not hesitate to contact me at`;

const open = async (link) => {
    let result = await WebBrowser.openBrowserAsync(link, { dismissButtonStyle: 'done', enableBarCollapsing: true });
};

const Terms = () => {
    return (
        <ScrollView>
        <Text style={{...styles.title, textAlign: 'center'}}>Terms & Conditions</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.paragraph}>{terms1}</Text>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.paragraph}>{`\u2022 `}</Text>
        <Text style={{...styles.paragraph, textDecorationLine: 'underline'}} onPress={() => open('https://expo.dev/privacy')}>Expo</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.paragraph}>{`\u2022 `}</Text>
        <Text style={{...styles.paragraph, textDecorationLine: 'underline'}} onPress={() => open('https://sentry.io/privacy/')}>Sentry</Text>
        </View>
        <Text></Text>
        <Text style={styles.paragraph}>{terms2}</Text>
        <Text></Text>
        <Text style={styles.heading}>Changes to This Policy</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{changes}</Text>
        <Text></Text>
        <Text style={styles.heading}>Limitation of Liability</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{limited_liability}</Text>
        <Text></Text>
        <Text style={styles.heading}>Contact</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{contact}</Text>
        <Text style={{...styles.paragraph, textDecorationLine: 'underline'}} onPress={() => Linking.openURL('mailto:claymorphism-ui@k-radford.com')}>claymorphism-ui@k-radford.com.</Text>
        <Text></Text>
        <Text style={styles.paragraph}>Last Update: March 5, 2023</Text>
        </ScrollView>
    )
};

export default Terms;

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    heading: {
        fontSize: 15
    },
    paragraph: {
        fontSize: 10
    }
});