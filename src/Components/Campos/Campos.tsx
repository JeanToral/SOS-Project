import React from "react";
import "./Campos.scss";

interface Cargo {
    id: number;
    jobTitle?: string;
    selections: Record<'left' | 'right', Record<number, boolean>>;
}

/* interface riscos {
    titulo: String[];
    subTituloFis: ['Ruídos', 'Vibrações', 'Calor', 'Umidade', 'Frio', 'Pressão', 'Radiação'];
    subTituloQui: ['Agentes asfixiantes', 'Agentes anestésicos', 'Agentes tóxicos', 'Agentes cancerígenos'];
    subTituloBio: ['Bactérias', 'Virus', 'Fungos', 'Protozoários'];
    subTituloMec: ['Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico'];
} */

interface riscosFisicos {
    titulo: string[];
    subTitulo: string[];
}

interface riscosQuimicos {
    titulo: string[];
    subTitulo: string[];
}

interface riscosBiologicos {
    titulo: string[];
    subTitulo: string[];
}

interface riscosMecanicos {
    titulo: string[];
    subTitulo: string[];
}

function getRiscosFisicos(): riscosFisicos {
    return {
        titulo: ['Riscos físicos'],
        subTitulo: ['Ruídos', 'Vibrações', 'Calor', 'Umidade', 'Frio', 'Pressão', 'Radiação']
    };
}

function getRiscosBiologicos(): riscosBiologicos {
    return {
        titulo: ['Riscos Biologicos'],
        subTitulo: ['Bactérias', 'Virus', 'Fungos', 'Protozoários']
    };
}

function getRiscosQuimicos(): riscosQuimicos {
    return {
        titulo: ['Riscos Químicos'],
        subTitulo: ['Agentes asfixiantes', 'Agentes anestésicos', 'Agentes tóxicos', 'Agentes cancerígenos']
    };
}

function getRiscosMecanicos(): riscosMecanicos {
    return {
        titulo: ['Riscos Mecânicos'],
        subTitulo: ['Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico', 'Mecânico']
    };
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

            <label className="tituloRisco">{getRiscosFisicos().titulo[0]}</label>

            <div className="radioGrid" id="grid-left">
                {['left'].map(side => (
                    <div key={side} className="radioColumn" id="column-left">
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                            <div key={num} className="radioGroup" id="group-left">
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
                                <label htmlFor={`campo-${side}-${cargo.id}-${num}`}>{getRiscosFisicos().subTitulo[num - 1]}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>)
}


export default Campos;