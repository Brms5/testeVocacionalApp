import Image from "next/image";

function Home() {
  const bg = "/bg.jpeg";

  return (
    <div className="flex-col w-screen">
      <div className="mt-10">
        <h1 id="domba-title" className="text-2xl font-bold text-center mb-10">
          Portal voltado aos estudantes da Escola Estadual Dom Barreto.
        </h1>
        <div className="mb-10">
          <Image
            id="domba-image"
            src="/dom_barreto.jpg"
            alt="Escola Estadual Dom Barreto"
            width={600}
            height={400}
            className="mx-auto"
          />
        </div>
        <p id="domba-description" className="text-center">
          Desenvolvido pelos docentes da Escola Estadual Dom Barreto, a
          plataforma visa facilitar o acesso dos estudantes às informações
          relacionadas a vestibulares, cursos técnicos, cursinhos populares,
          eventos, entre outros.
        </p>
      </div>
    </div>
  );
}

export default Home;
