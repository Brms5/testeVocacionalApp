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
                        <h1 className="text-2xl text-center lg:text-left pb-4">
                            Portal voltado aos estudantes da Escola Estadual Dom
                            Barreto.
                        </h1>
                        <p>
                            Desenvolvido pelos docentes da Escola Estadual Dom
                            Barreto, a plataforma visa facilitar o acesso dos
                            estudantes às informações relacionadas a
                            vestibulares, cursos técnicos, cursinhos populares,
                            eventos, entre outros.
                        </p>
                    </div>
                </div>
            </section>
            <section className="p-8">
                <div className="w-full bg-blue-950 text-center text-xl p-4 h-96 rounded-lg">
                    <h1>Calendário Acadêmico Anual 2024</h1>
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
