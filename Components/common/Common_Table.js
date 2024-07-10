import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

const tableData = [    { headerName: "ID", width: 90 },
    { headerName: "DrugsBazar ID", width: 90 },    { headerName: "Company Name", width: 150 },
    { headerName: "Company Town", width: 100 }
]
const distributorsList = [{ COMPID: "123", DRGBZRID: "3453455323", COMPNAME: "jhdsfkjasgkd", COMPTOWN: "kjdshfkdh" }, { COMPID: "123", DRGBZRID: "3453455323", COMPNAME: "jhdsfkjasgkd", COMPTOWN: "kjdshfkdh" }, { COMPID: "123", DRGBZRID: "3453455323", COMPNAME: "jhdsfkjasgkd", COMPTOWN: "kjdshfkdh" }, { COMPID: "123", DRGBZRID: "3453455323", COMPNAME: "jhdsfkjasgkd", COMPTOWN: "kjdshfkdh" }, { COMPID: "123", DRGBZRID: "3453455323", COMPNAME: "jhdsfkjasgkd", COMPTOWN: "kjdshfkdh" }, { COMPID: "123", DRGBZRID: "3453455323", COMPNAME: "jhdsfkjasgkd", COMPTOWN: "kjdshfkdh" }]

export default class Common_Table extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <View>
                {distributorsList && distributorsList.length > 0 &&
                    <View style={styles.tableBody}>
                        <ScrollView horizontal={true}  >
                            <View style={{ borderRadius: 5 }}>
                                <View style={{ flexDirection: "row", borderBottomWidth: 0.2, borderBottomColor: "gray", backgroundColor: "#1b00ff", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                    {
                                        tableData.map((item, index) => {
                                            return (
                                                <View key={index} style={{ width: item.width, paddingVertical: 15, display: "flex", alignItems: "center" }}>
                                                    <Text style={{ fontWeight: "700", fontSize: 12, color: "#fff" }}>{item.headerName}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View>
                                    {
                                        distributorsList && distributorsList.length > 0 && distributorsList.map((item, index) => {
                                            return (
                                                <View key={index} style={{ flexDirection: "row", paddingVertical: 8, backgroundColor: index % 2 !== 0 ? "#e8e6ff" : "#fff", display: "flex", alignItems: "center" }}>
                                                    <View style={{ width: 90, display: "flex", alignItems: "center" }}>
                                                        <Text style={{ fontSize: 12 }}>{item.COMPID}</Text>
                                                    </View>
                                                    <View style={{ width: 90, display: "flex", alignItems: "center" }}>
                                                        <Text style={{ fontSize: 12 }}>{item.DRGBZRID}</Text>
                                                    </View>
                                                    <View style={{ width: 150, display: "flex", alignItems: "center", paddingHorizontal: 10 }}>
                                                        <Text style={{ fontSize: 12 }}>{item.COMPNAME}</Text>
                                                    </View>
                                                    <View style={{ width: 100, display: "flex", alignItems: "center" }}>
                                                        <Text style={{ fontSize: 12 }}>{item.COMPTOWN}</Text>
                                                    </View>
                                                    {/* <Tooltip
                                                        isVisible={this.state.currentIndex == index ? true : false}
                                                        content={<View style={{ width: 150, elevation: 5, backgroundColor: "#1b00ff", paddingVertical: 10 }}>
                                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("DistributorOrder") }}>
                                                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>Order</Text>
                                                            </TouchableOpacity>
                                                            <View style={{ height: 0.5, backgroundColor: "#fff", width: "100%", marginVertical: 10 }}></View>
                                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("DistributorStatement") }}>
                                                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>Statement</Text>
                                                            </TouchableOpacity>

                                                        </View>}
                                                        placement="bottom"
                                                        onClose={() => this.setState({ currentIndex: null })}
                                                        contentStyle={{ backgroundColor: "#1b00ff" }}
                                                        backgroundColor='transparent'
                                                    >
                                                        <TouchableOpacity style={{ width: 80, display: "flex", alignItems: "center" }} onPress={() => { this.setState({ currentIndex: index }) }}>
                                                            <Entypo name='dots-three-horizontal' size={18} color="#4433ff" />
                                                        </TouchableOpacity>
                                                    </Tooltip> */}

                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({    
    tableBody: { borderWidth: 0.5, borderColor: "#1b00ff", borderRadius: 7, width: "97%", alignSelf: "center", marginBottom: "3%", marginTop: 15 },
})
