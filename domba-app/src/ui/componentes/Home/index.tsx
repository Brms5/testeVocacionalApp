import Image from "next/image";

function Home() {
  const bg = "/bg.jpeg";

  return (
    <div className="flex-col w-screen">
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-center mb-10">
          Portal voltado aos alunos da Escola Estadual Dom Barreto.
        </h1>
        <div className="mb-10">
          <Image
            src="/dom_barreto.jpg"
            alt="Escola Estadual Dom Barreto"
            width={600}
            height={400}
            className="mx-auto"
          />
        </div>
        <p className="text-center">
          Desenvolvido pelas docentes da Escola Estadual Dom Barreto, a
          plataforma visa facilitar o acesso dos alunos às informações
          relacionadas a vestibulares, cursos técnicos, cursinhos populares,
          eventos, entre outros.
        </p>
      </div>
    </div>
  );
}

export default Home;
