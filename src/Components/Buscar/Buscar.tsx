import DownloadIcon from '@mui/icons-material/Download';
import React, { useState } from 'react';
import './Buscar.scss'; // Importe o CSS para estilizar
import { useNavigate } from 'react-router-dom';

const BuscarCNPJ = () => {
    const [cnpj, setCnpj] = useState('');
    const [showReports, setShowReports] = useState(false); // Estado para controlar a visibilidade dos relatórios

    const reports = [
        { id: 1, date: '01/01', fileName: 'relatório 01.pdf' },
        { id: 2, date: '02/02', fileName: 'relatório 02.pdf' },
        { id: 3, date: '03/03', fileName: 'relatório 03.pdf' }
    ];

    const handleSearch = () => {
        // Lógica de busca pelo CNPJ
        console.log('Buscando CNPJ:', cnpj);
        setShowReports(true); // Define `showReports` para `true` após buscar
    };

    const navigate = useNavigate();

    return (
        <div className="buscar-cnpj-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Digite o CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                />
                <button className='botaoBusca' onClick={handleSearch}>Buscar</button>
            </div>

            {showReports && ( // Exibe a lista de relatórios apenas se `showReports` for `true`
                <div className="report-list">
                    {reports.map((report) => (
                        <div key={report.id} className="report-item">
                            <span>exportado {report.date}</span>
                            <span>{report.fileName}</span>
                            <button className="download-button">
                                <DownloadIcon />
                                <span>Download</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button className='voltaHome' onClick={() => navigate('/home')}>Voltar para relatórios</button>
        </div>
    );
};

export default BuscarCNPJ;
