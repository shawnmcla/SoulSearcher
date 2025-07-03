import React from "react";

interface PickerProps<T> {
    value: T;
    options: T[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Picker<T extends string>({ options, value, onChange }: PickerProps<T>) {
    return (
        <select id="deck" required value={value} onChange={onChange}>
            {options.map((o) => (
                <option key={String(o)} value={o}>
                    {String(o)}
                </option>
            ))}
        </select>
    );
}

export default Picker;