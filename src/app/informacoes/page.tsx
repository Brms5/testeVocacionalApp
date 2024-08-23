import React from "react";

function Informacoes() {
    return (
        <div className="fullwidth justify-center text-center">
            <div className="fullwidth w-screen justify-center text-center mb-10 mt-10">
                <h1>Cardápio - Merenda</h1>
                <iframe
                    className="w-full h-40 mx-auto md:w-1/2"
                    src="https://docs.google.com/spreadsheets/d/1YD-Poyx1kSAGCJCkzMTdvZtBv3Jgd6BNzOMRGxGEHSc/pubhtml?gid=0&amp;single=false&amp;widget=false&amp;headers=false&amp;chrome=false"
                ></iframe>
            </div>
            <div>
                <h1>Calendário</h1>
                <iframe
                    className="w-full h-96 mx-auto md:w-1/2"
                    src="https://docs.google.com/spreadsheets/d/1sOX0mNJnJnmxORCKSBItoGoQfB9PZFqG/pubhtml?gid=1057522154&amp;single=false&amp;widget=false&amp;headers=false&amp;chrome=false"
                ></iframe>
            </div>
        </div>
    );
}

export default Informacoes;
