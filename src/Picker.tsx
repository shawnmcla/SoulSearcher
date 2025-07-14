import React from "react";

interface PickerProps<T> {
    value: T;
    options: T[];
    id?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    displayFn?: (value: T) => string;
}

function Picker<T extends string>({ options, value, onChange, className, id, displayFn }: PickerProps<T>) {
    return (
        <select className={className} id={id} name={id} required value={value} onChange={onChange}>
            {options.map((o) => (
                <option key={String(o)} value={o}>
                    {displayFn ? displayFn(o) : String(o)}
                </option>
            ))}
        </select>
    );
}

export default Picker;