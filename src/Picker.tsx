import React from "react";

interface PickerProps<T> {
    value: T;
    options: T[];
    id?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

function Picker<T extends string>({ options, value, onChange, className, id }: PickerProps<T>) {
    return (
        <select className={className} id={id} required value={value} onChange={onChange}>
            {options.map((o) => (
                <option key={String(o)} value={o}>
                    {String(o)}
                </option>
            ))}
        </select>
    );
}

export default Picker;