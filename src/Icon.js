
import IconNames from './Icon.json';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, SafeAreaView, ScrollView, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';

class Icon extends React.Component {

    constructor(props) {
        super(props);

        this.handleShowIcon = this.handleShowIcon.bind(this);
        this.timeoutId = 0;

        this.state = {
            filter: '',
        };
    }

    handleShowIcon(name)
    {
        this.setState({selectedName: name});
    }

    render()
    {
        const styles = {
            fontSize: this.props.size,
            fontFamily: this.props.fontFamily,
            color: this.props.color,
            alignItems: "center"
        };

        if (this.props.name === '*')
        {
            const icons = [];
            const keys = Object.keys(IconNames);
            let count = 0;
            const iconStyle = {
                borderColor: "#ddd", 
                color: "black", 
                borderRadius: 8,
                borderWidth: 2, 
                width: 56,
                height: 48,
                alignItems: "center",
                textAlign: "center",
                alignContent: "center",
                justifyContent:'center',
                textAlignVertical: 'center',
                padding: 2,
                flex: 1,
                margin: 4,
            };

            const touchableStyle = { 
                flex: 1,
                alignItems: "center",
                textAlign: "center",
                alignContent: "center",
                justifyContent:'center',
                textAlignVertical: 'center',
                flexDirection: "column"
            };

            const list = [];
            for (let index = 0; index < keys.length; index++)
            {
                if (!this.state.filter || keys[index].includes(this.state.filter.toLowerCase()))
                {
                    list.push(keys[index]);
                }
            }

            const columnCount = 6;
            for (let index = 0; index < list.length; index = index + columnCount)
            {
                const column = [];
                for (let columnIndex = 0; columnIndex < columnCount; columnIndex++)
                {
                    if (list[index + columnIndex])
                    {
                        column.push(<TouchableOpacity 
                            style={touchableStyle} 
                            onPress={() => { this.handleShowIcon(list[index + columnIndex]); }}
                            key={'TouchableOpacity-' + list[index + columnIndex]}
                        >
                            <Icon name={list[index + columnIndex]} size={28} style={iconStyle} />
                        </TouchableOpacity>);
                        count++;
                    }
                }
                icons.push(<View style={{
                        flexDirection: "row",
                        backgroundColor: "transparent",
                    }}
                    key={'view-' + icons.length}>
                        {column}
                    </View>);

                if (count > this.props.size)
                {
                    break;
                }
            }

            return <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ height: 64 }}>
                    <TextInput style={{
                        borderColor: "grey",
                        color: "black",
                        borderRadius: 8, borderWidth: 2,
                        margin: 4,
                        fontSize: 24,
                        flex: 1,
                        paddingLeft: 12,
                        paddingRight: 12
                    }}
                    onChange={(text) => {
                        if (this.timeoutId)
                        {
                            clearTimeout(this.timeoutId);
                        }
                        const filter = text ? text.nativeEvent.text : '';
                        const func = () => {
                            this.setState({filter});
                        };
                        this.timeoutId = setTimeout(func, 1000);
                    }} />
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {icons}
                </ScrollView>
                <View style={{ height: 36 }}>
                    {this.state.selectedName ? <Text style={{ textAlign: "center", fontSize: 18, marginLeft: 16, marginRight: 16, color: "#926" }}>
                        {/*&lt;Icon name="{this.state.selectedName}" /&gt;*/}
                        {this.state.selectedName}
                    </Text> : null}
                </View>
            </SafeAreaView>;
        }

        const code = IconNames[this.props.name] || 63; // code for "?"
        return <Text key={this.props.name} style={[styles, this.props.style]}>{String.fromCharCode(code)}</Text>;
    }
}

Icon.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    fontFamily: PropTypes.string,
    style: PropTypes.object,
    key: PropTypes.string,
};

Icon.defaultProps = {
    name: '',
    size: 48,
    color: 'black',
    fontFamily: 'iconox',
    style: {},
    key: '',
};

export default Icon;
