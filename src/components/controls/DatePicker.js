import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker              
                inputVariant="outlined"
                label={label}
                format="MM/dd/yyyy hh:mma"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                allowKeyboardControl={true}

            />
        </MuiPickersUtilsProvider>
    )
}