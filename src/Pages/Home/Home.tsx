import { jsPDF } from 'jspdf';
import React, { useState } from 'react';
import Cadastros from '../../Components/Cadastros/Cadastros.tsx';
import Campos, { getRiscosBiologicos, getRiscosFisicos, getRiscosMecanicos, getRiscosQuimicos } from '../../Components/Campos/Campos.tsx';
import './Home.scss';
import { Navigate, redirect, Route, useNavigate } from 'react-router-dom';

interface Cargo {
    id: number;
    jobTitle: string;
    selections: {
        fisicos: object;
    };
}

interface CadastroData {
    nome: string;
    cnpj: string;
    empresa: string;
}

const Home: React.FC = () => {
    const [cargosList, setCargosList] = useState<Cargo[]>([]);
    const [cadastroData, setCadastroData] = useState<CadastroData>({
        nome: '',
        cnpj: '',
        empresa: ''
    });

    const riscosData = {
        fisicos: getRiscosFisicos(),
        biologicos: getRiscosBiologicos(),
        quimicos: getRiscosQuimicos(),
        mecanicos: getRiscosMecanicos()
    };

    const addCargo = () => {
        setCargosList((prev) => [
            ...prev,
            {
                id: Date.now(),
                jobTitle: '',
                selections: {
                    fisicos: {},
                    biologicos: {},
                    quimicos: {},
                    mecanicos: {},
                },
            },
        ]);
    };

    const updateCargo = (
        id: number,
        category: 'fisicos' | 'biologicos' | 'quimicos' | 'mecanicos' | 'jobTitle',
        index: number,
        value: boolean | string
    ) => {
        setCargosList((prev) =>
            prev.map((cargo) =>
                cargo.id === id
                    ? {
                        ...cargo,
                        jobTitle: category === 'jobTitle' ? value : cargo.jobTitle,
                        selections: category !== 'jobTitle'
                            ? {
                                ...cargo.selections,
                                [category]: {
                                    ...cargo.selections[category],
                                    [index]: typeof value === 'boolean' ? value : cargo.selections[category][index],
                                },
                            }
                            : cargo.selections,
                    }
                    : cargo
            )
        );
    };

    const exportToPdf = () => {
        const doc = new jsPDF();
        let yPos = 20;

        Object.entries(cadastroData).forEach(([field, value]) => {
            doc.setFontSize(15).text(`${field.toUpperCase()}: ${value}`, 20, yPos);
            yPos += 10;
        });

        cargosList.forEach((cargo, index) => {
            doc.setFontSize(15).text(`Nome do cargo: ${cargo.jobTitle || 'Não informado'}`, 20, yPos);
            yPos += 10;

            Object.entries(riscosData).forEach(([key, { titulo, subTitulo }]) => {
                if (titulo.length > 0) {
                    const anySelected = cargo.selections[key as keyof Cargo['selections']] &&
                        subTitulo.some((_, index) => cargo.selections[key as keyof Cargo['selections']][index]);

                    if (anySelected) {
                        doc.setFontSize(12).text(titulo[0], 20, yPos);

                        subTitulo.forEach((subTitle, index) => {
                            if (cargo.selections[key as keyof Cargo['selections']][index]) {
                                doc.text(`- ${subTitle}`, 40, (yPos += 7));
                            }
                        });

                        yPos += 10;
                    }
                }
            });

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });

        doc.save('riscos.pdf');
    };

    const navigate = useNavigate();

    return (
        <div className="homeContainer">
            <Cadastros
                onAddCargo={addCargo}
                cadastroData={cadastroData}
                setCadastroData={setCadastroData}
            />
            {cargosList.map((cargo) => (
                <Campos
                    key={cargo.id}
                    cargo={cargo}
                    onUpdate={updateCargo}
                    riscosData={riscosData}
                />
            ))}
            {cargosList.length > 0 && <button className='pdfButton' onClick={exportToPdf}>Gerar PDF</button>}
            <button className='buscaCNPJ' onClick={() => navigate('/buscar')}>Buscar CNPJ</button>
        </div>
    );
};

export default Home;
