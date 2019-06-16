import React from 'react';
import classList from './Select.scss';

const Select = props => {

    const htmlFor = (`${props.label}-${Math.round(Math.random() * 100000000)}`).toLowerCase().replace(/\s/g, '-');

    return (
        <div className={classList.select}>
            <div>
                <label
                    htmlFor={htmlFor}><b>{props.label}</b></label>
            </div>
            <div>
                <select id={htmlFor}
                        value={props.value}
                        onChange={props.onChange}>
                    { props.options.map((option, index) => {

                        //console.log(option, index)
                        return (
                            <option
                                value={option}
                                key={index}>
                                {option.replace(/_/g, ' ')}
                            </option>
                        )
                    }) }
                </select>
            </div>
        </div>
    )
};

export default Select;