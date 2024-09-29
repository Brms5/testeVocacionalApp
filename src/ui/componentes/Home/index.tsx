import React from "react";
import Image from "next/image";

function Home() {
    const bg = "/bg.jpeg";

    return (
        <div className="container flex-col bg-blue-700 text-white text-justify mx-auto">
            <section className="flex flex-col lg:flex-row bg-blue-950">
                <div>
                    <Image
                        id="domba-image"
                        src="/dom_barreto.jpg"
                        alt="Foto da Escola Estadual Dom Barreto"
                        width={900}
                        height={700}
                        className=""
                    />
                </div>
                <div className="w-full lg:max-w-96 p-8">
                    <div className="pb-4">
                        <h1 className="text-3xl text-center lg:text-left pb-4">
                            Portal para Estudantes da Escola Estadual Dom
                            Barreto
                        </h1>
                        <p>
                            Desenvolvido pelos professores da Escola Estadual
                            Dom Barreto, este portal foi criado para facilitar o
                            acesso dos alunos a informações sobre vestibulares,
                            cursos técnicos, cursinhos, eventos e muito mais.
                            Nossa plataforma visa apoiar o desenvolvimento
                            acadêmico e auxiliar na trajetória educacional dos
                            estudantes, reunindo recursos valiosos em um só
                            lugar.
                        </p>
                    </div>
                </div>
            </section>
            <section className="p-8">
                <div className="w-full bg-blue-950 text-center text-xl p-4 h-96 rounded-lg">
                    <h1>Calendário Acadêmico Anual</h1>
                    <iframe
                        className="w-full mx-auto p-4 h-full mb-4"
                        src="https://docs.google.com/spreadsheets/d/1sOX0mNJnJnmxORCKSBItoGoQfB9PZFqG/pubhtml?gid=1057522154&amp;single=false&amp;widget=false&amp;headers=false&amp;chrome=false"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
export default Home;
