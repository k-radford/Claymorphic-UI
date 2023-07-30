import React, { useState, useEffect, useContext } from "react";
import { Alert, SafeAreaView, TouchableOpacity, Button, StyleSheet, View, ScrollView, Text, Modal } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const privacy_policy = `Kaitlin Radford built the Claymorphism-UI app as a Free app. This SERVICE is provided by Kaitlin Radford at no cost and is intended for use as is.
This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.

If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Claymorphism-UI unless otherwise defined in this Privacy Policy.`;

const information_collection = `For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Crash Data. The information that I request will be retained on your device and is not collected by me in any way.

The app does use third-party services that may collect information used to identify you.

Privacy policies of third-party service providers used by the app:
`;

const log_data = `I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.`;

const cookies = `Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`;

const service_providers = `I may employ third-party companies and individuals due to the following reasons:

- To facilitate our Service;
- To provide the Service on our behalf;
- To perform Service-related services; or
- To assist us in analyzing how our Service is used.

I want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`;

const security = `I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.`;

const childrens_privacy = `These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13 years of age. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do the necessary actions.`;

const changes = `I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.`;

const contact = `If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at`;

const open = async (link) => {
    let result = await WebBrowser.openBrowserAsync(link, { dismissButtonStyle: 'done', enableBarCollapsing: true });
};

const PrivacyPolicy = () => {
    return (
        <ScrollView>
        <Text style={{...styles.title, textAlign: 'center'}}>Privacy Policy</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.paragraph}>{privacy_policy}</Text>
        <Text></Text>
        <Text style={styles.heading}>Information Collection and Use</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{information_collection}</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.paragraph}>{`\u2022 `}</Text>
        <Text style={{...styles.paragraph, textDecorationLine: 'underline'}} onPress={() => open('https://expo.dev/privacy')}>Expo</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.paragraph}>{`\u2022 `}</Text>
        <Text style={{...styles.paragraph, textDecorationLine: 'underline'}} onPress={() => open('https://sentry.io/privacy/')}>Sentry</Text>
        </View>
        <Text></Text>
        <Text style={styles.heading}>Log Data</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{log_data}</Text>
        <Text></Text>
        <Text style={styles.heading}>Cookies</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{cookies}</Text>
        <Text></Text>
        <Text style={styles.heading}>Service Providers</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{service_providers}</Text>
        <Text></Text>
        <Text style={styles.heading}>Security</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{security}</Text>
        <Text></Text>
        <Text style={styles.heading}>Children's Privacy</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{childrens_privacy}</Text>
        <Text></Text>
        <Text style={styles.heading}>Changes to This Policy</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{changes}</Text>
        <Text></Text>
        <Text style={styles.heading}>Contact</Text>
        <Text></Text>
        <Text style={styles.paragraph}>{contact}</Text>
        <Text style={{...styles.paragraph, textDecorationLine: 'underline'}} onPress={() => Linking.openURL('mailto:claymorphism-ui@k-radford.com')}>claymorphism-ui@k-radford.com</Text>
        <Text></Text>
        <Text style={styles.paragraph}>Last Update: March 5, 2023</Text>
        </ScrollView>
    )
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    heading: {
        fontSize: 15
    },
    paragraph: {
        fontSize: 10
    },
    document: {
        
    }
});