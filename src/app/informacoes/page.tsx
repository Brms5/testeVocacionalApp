import React from "react";

function Informacoes() {
    return (
        <div className="flex flex-col items-center justify-center w-full text-center p-4">
            <div className="mb-10 mt-10">
                <h1 className="text-2xl font-bold mb-4">Cardápio - Merenda</h1>
                <iframe
                    className="w-full h-40 md:h-60 border border-gray-300 rounded-lg shadow-md"
                    src="https://docs.google.com/spreadsheets/d/1YD-Poyx1kSAGCJCkzMTdvZtBv3Jgd6BNzOMRGxGEHSc/pubhtml?gid=0&single=false&widget=false&headers=false&chrome=false"
                    title="Cardápio - Merenda"
                ></iframe>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-4">Calendário</h1>
                <iframe
                    className="w-full h-96 md:h-[600px] border border-gray-300 rounded-lg shadow-md"
                    src="https://docs.google.com/spreadsheets/d/1sOX0mNJnJnmxORCKSBItoGoQfB9PZFqG/pubhtml?gid=1057522154&single=false&widget=false&headers=false&chrome=false"
                    title="Calendário"
                ></iframe>
            </div>
        </div>
    );
}

export default Informacoes;
