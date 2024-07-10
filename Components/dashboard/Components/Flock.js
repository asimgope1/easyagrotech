import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import ColorChangingBox from '../../common/ColorChangingBox'

const DataTable = [
  { headerName: "Balance", width: "15%" }, { headerName: "cumm_mortality", width: "25%" }, { headerName: "Live_bird_weight", width: "30%" }, { headerName: "Mortality_percentage", width: "30%" }
]

export default class Flock extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  render() {
    let item1 = Object.keys(this.props.thing_details).length > 0 && this.props.thing_details
    deviceList3 = [{
      image1:
        <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", marginRight: "55%" }}>{item1.curr_state && item1.curr_state[64]}</Text>,
    
      button1: <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", marginRight: "80%" }}>{item1.curr_state && item1.curr_state[65]}</Text>,
      ontime: <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", marginRight: "70%" }}>{item1.curr_state && item1.curr_state[66]}</Text>,
      offtime: <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", }}>{item1.curr_state && item1.curr_state[67]}</Text>,
    },
    ]
    return (
      <View>
        <View style={styles.tableBody}>

          <View style={{ borderRadius: 5 }}>
            <View style={{ flexDirection: "row", borderBottomWidth: 0.2, borderBottomColor: "gray", backgroundColor: "green", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
              {
                DataTable.map((item, index) => {
                  return (
                    <View key={index} style={{ width: item.width, paddingVertical: 5, display: "flex", alignItems: "center", }}>
                      <Text style={{ fontWeight: "700", fontSize: 12, color: "#fff", textAlign: "center" }}>{item.headerName}</Text>
                    </View>
                  )
                })
              }
            </View>

            <View>
              {
                deviceList3 && deviceList3.length > 0 && deviceList3.map((item, index) => {
                  return (
                    <View key={index} style={{ flexDirection: "row", backgroundColor: index % 2 !== 0 ? "#f4fdf4" : "#fff", display: "flex", alignItems: "center" }}>
                      <View style={{ width: "30%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                        {item.image1}
                      </View>
                      <View style={{ width: "30%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                        {item.button1}
                      </View>
                      <View style={{ width: "20%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                        {item.ontime}
                      </View>
                      <View style={{ width: "20%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                        {item.offtime}
                      </View>


                    </View>
                  )
                })
              }
            </View>

          </View>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tableBody: { borderWidth: 0.5, borderColor: "green", borderRadius: 7, width: "100%", alignSelf: "center", marginBottom: "10%" },
})