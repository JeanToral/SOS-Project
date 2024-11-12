import React, { useState } from "react";
import "./Campos.scss";

interface Cargo {
    id: number;
    jobTitle: string;
    selections: Record<'fisicos' | 'biologicos' | 'quimicos' | 'mecanicos', Record<number, boolean>>;
}

interface Riscos {
    titulo: string[];
    subTitulo: string[];
}

export function getRiscosFisicos(): Riscos {
    return {
        titulo: ['Riscos físicos'],
        subTitulo: ['Ruídos', 'Vibrações', 'Calor', 'Umidade', 'Frio', 'Pressão', 'Radiação']
    };
}

export function getRiscosBiologicos(): Riscos {
    return {
        titulo: ['Riscos Biologicos'],
        subTitulo: ['Bactérias', 'Virus', 'Fungos', 'Protozoários']
    };
}

export function getRiscosQuimicos(): Riscos {
    return {
        titulo: ['Riscos Químicos'],
        subTitulo: ['Agentes asfixiantes', 'Agentes anestésicos', 'Agentes tóxicos', 'Agentes cancerígenos']
    };
}

export function getRiscosMecanicos(): Riscos {
    return {
        titulo: ['Riscos Mecânicos'],
        subTitulo: ['Mecânico', 'Mecânic', 'Mecâni', 'Mecân', 'Mecâ', 'Mec', 'Me', 'M']
    };
}

export const riscosData = {
    fisicos: getRiscosFisicos(),
    biologicos: getRiscosBiologicos(),
    quimicos: getRiscosQuimicos(),
    mecanicos: getRiscosMecanicos()
};

interface CargoProps {
    cargo: Cargo;
    onUpdate: (id: number, category: string, index: number, value: boolean | string) => void;
    riscosData: Record<string, Riscos>;
}

const Campos: React.FC<CargoProps> = ({ cargo, onUpdate, riscosData }) => {
    const [jobTitle, setJobTitle] = useState(cargo.jobTitle);

    const handleChange = (category: 'fisicos' | 'biologicos' | 'quimicos' | 'mecanicos', index: number, value: boolean) => {
        onUpdate(cargo.id, category, index, value);
    };

    const handleJobTitleChange = (value: string) => {
        setJobTitle(value);
        onUpdate(cargo.id, 'jobTitle', 0, value); // Update job title
    };

    return (
        <>
            <div className="formContainer">
                <div className="input-section">
                    <label htmlFor={`jobTitle-${cargo.id}`}>Nome do cargo</label>
                    <input
                        type="text"
                        id={`jobTitle-${cargo.id}`}
                        value={jobTitle || ''}
                        onChange={(e) => handleJobTitleChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="formResponses">
                {Object.entries(riscosData).map(([category, data]) => (
                    <React.Fragment key={category}>
                        {/* Display the title of the category */}
                        {data && data.titulo && data.titulo.length > 0 && (
                            <label className="tituloRisco">{data.titulo[0]}</label>
                        )}

                        <div className="subTituloRisco">
                            {/* Render each subtitle */}
                            {data?.subTitulo?.length > 0 && data.subTitulo.map((subTitulo, index) => (
                                <div key={`${index}-${subTitulo}`}>
                                    <input
                                        className="mr-1"
                                        type="checkbox"
                                        id={`${category}-${subTitulo}-${cargo.id}`}
                                        checked={cargo.selections[category]?.[index] || false}
                                        onChange={(e) => handleChange(category as 'fisicos' | 'biologicos' | 'quimicos' | 'mecanicos', index, e.target.checked)}
                                    />
                                    <label htmlFor={`${category}-${subTitulo}-${cargo.id}`}>{subTitulo}</label>
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default Campos;
