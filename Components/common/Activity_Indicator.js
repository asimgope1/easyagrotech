import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HEIGHT } from '../lib/Constant';

class Activity_Indicator extends Component {
    render() {
        console.log("loading",this.props.loading)
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.loading}
            
        >
            <View style={styles.centeredView}>
                <View style={styles.indicator}>
                    <ActivityIndicator size={'large'} />
                </View>
            </View>
        </Modal>
    }
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    indicator: {
        padding: 20, borderRadius: 8, backgroundColor: "#fff", elevation: 3, paddingHorizontal: 30
    }
});

const mapStateToProps = store => {
    return {
        loading: store.authenticationReducer.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity_Indicator);