import React, { useState } from 'react';
import './Home.scss';
import Cadastros from './../Components/Cadastros/Cadastros.tsx';
import Campos from '../Components/Campos/Campos.tsx';
import { jsPDF } from 'jspdf';

interface Cargo {
    id: number;
    jobTitle?: string;
    selections: Record<'left' | 'right', Record<number, boolean>>;
}

interface cadastroData {
    nome: string;
    cnpj: string;
    empresa: string;
}

const Home = () => {
    const [cargosList, setCargosList] = useState<Cargo[]>([]);
    const [cadastroData, setCadastroData] = useState<cadastroData>({
        nome: '',
        cnpj: '',
        empresa: ''
    });

    const addCargo = () => {
        setCargosList(prev => [...prev, { id: Date.now(), jobTitle: '', selections: { left: {}, right: {} } }]);
    };

    const updateCargo = (id: number, data: Partial<Cargo>) => {
        setCargosList(prev => prev.map(cargo => cargo.id === id ? { ...cargo, ...data } : cargo));
    };

    const exportToPdf = () => {
        const doc = new jsPDF();
        let yPos = 20;

        doc.setFontSize(20).text('Dados da empresa', 20, yPos);
        yPos += 10;
        Object.entries(cadastroData).forEach(([key, value]) => {
            doc.setFontSize(15).text(`${key[0].toUpperCase() + key.slice(1)}: ${value}`, 20, yPos);
            yPos += 10;
        });

        cargosList.forEach((cargo, index) => {
            yPos += 10;
            doc.setFontSize(15).text(`Cargo ${index + 1}`, 20, yPos);
            yPos += 10;
            doc.setFontSize(10).text(`Nome do cargo: ${cargo.jobTitle || 'Não informado'}`, 20, yPos);
            yPos += 10;

            ['left', 'right'].forEach(side => {
                Object.entries(cargo.selections[side]).forEach(([key, value]) => {
                    if (value) doc.text(`- Campo ${key}`, 30, yPos += 7);
                });
            });

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });

        doc.save('sos-dados.pdf');
    };

    return (
        <div className="homeContainer">
            <Cadastros onAddCargo={addCargo} cadastroData={cadastroData} setCadastroData={setCadastroData} />
            {cargosList.map(cargo => (
                <Campos key={cargo.id} cargo={cargo} onUpdate={data => updateCargo(cargo.id, data)} />
            ))}
            {cargosList.length > 0 && (
                <button
                    onClick={exportToPdf}
                    className="exportButton"
                >
                    Exportar para PDF
                </button>
            )}
        </div>
    );
}

export default Home;