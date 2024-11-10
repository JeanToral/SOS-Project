import React from "react";
import "./Campos.scss";

interface Cargo {
    id: number;
    jobTitle?: string;
    selections: Record<'left' | 'right', Record<number, boolean>>;
}

interface CargoProps {
    cargo: Cargo;
    onUpdate: (data: Partial<Cargo>) => void;
}

const Campos: React.FC<CargoProps> = ({ cargo, onUpdate }) => {
    const handleChange = (field: string, value: any) => {
        onUpdate({ [field]: value });
    }

    return (
        <div className="formContainer">
            <label htmlFor={`jobTitle-${cargo.id}`}>Nome do cargo</label>
            <input
                type="text"
                id={`jobTitle-${cargo.id}`}
                value={cargo.jobTitle || ''}
                onChange={e => handleChange('jobTitle', e.target.value)}
            />

            <div className="radioGrid">
                {['left', 'right'].map(side => (
                    <div key={side} className="radioColumn">
                        {[1, 2, 3, 4].map(num => (
                            <div key={num} className="radioGroup">
                                <input
                                    type="radio"
                                    id={`campo-${side}-${cargo.id}-${num}`}
                                    name={`group-${side}-${cargo.id}-${num}`}
                                    checked={cargo.selections?.[side]?.[num] || false}
                                    onChange={e => handleChange('selections', {
                                        ...cargo.selections,
                                        [side]: { ...cargo.selections?.[side], [num]: e.target.checked }
                                    })}
                                />
                                <label htmlFor={`campo-${side}-${cargo.id}-${num}`}>Campo {num.toString().padStart(2, '0')}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Campos;