"use client";

import React, { useState, useEffect } from "react";
import { instituicaoService } from "@/client/services/Instituicao";
import { modalidadeDeIngressoService } from "@/client/services/ModalidadeDeIngresso";
import { provaService } from "@/client/services/Prova";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Instituicao() {
  const [instituicao, setInstituicao] = useState<Instituicao>();
  const [modalidadeDeIngresso, setModalidadeDeIngresso] =
    useState<ModalidadeDeIngresso[]>();
  const [prova, setProva] = useState<Prova[]>();

  const pathName = usePathname();
  const instituicaoNome = pathName.split("/")[2];

  useEffect(() => {
    instituicaoService
      .getInstituicaoByName(instituicaoNome)
      .then((value) => {
        setInstituicao(value);
        modalidadeDeIngressoService
          .getModalidadeDeIngressoByInstituicaoId(value.id)
          .then((modalidadeDeIngresso) => {
            setModalidadeDeIngresso(modalidadeDeIngresso);
            for (let i = 0; i < modalidadeDeIngresso.length; i++) {
              provaService
                .getProvaByModalidadeDeIngressoId(modalidadeDeIngresso[i].id)
                .then((prova) => {
                  setProva(prova);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Ordenação dos cursos em ordem alfabética
  // const cursosEmOrdemAlfabetica = instituicao?.cursos.sort();

  // Alteração no formato da data de yyyy-mm-dd para dd/mm/yyyy
  // const dataFormatoBrasileiro = (data: string) => {
  //   const dataFormatada = data.split("-");
  //   return `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`;
  // };

  const modalidadeDeIngressoReturn = modalidadeDeIngresso?.map(
    (modalidade, index) => {
      // const dataInicioFormatada = dataFormatoBrasileiro(
      //   modalidade.data_inscricao_inicio
      // );
      // const dataFinalFormatada = dataFormatoBrasileiro(
      //   modalidade.data_inscricao_final
      // );
      // const dataIsencaoFormatada = dataFormatoBrasileiro(
      //   modalidade.data_isencao
      // );
      return (
        <div key={index} className="flex-col text-center justify-center">
          <Typography variant="h6" gutterBottom>
            {modalidade.modalidade}
          </Typography>
          <div className="flex justify-around mt-5 mb-5">
            <div>
              <p>Data de inscrição início</p>
              <p>{modalidade.data_inscricao_inicio}</p>
            </div>
            <div>
              <p>Data de inscrição final</p>
              <p>{modalidade.data_inscricao_final}</p>
            </div>
          </div>
          <div className="flex justify-around mt-5 mb-5">
            <div>
              <p>Valor</p>
              <p>{modalidade.valor}</p>
            </div>
            <div>
              <p>Data de isenção</p>
              <p>{modalidade.data_isencao}</p>
            </div>
          </div>
          <h1>Site</h1>
          <Link href={modalidade.link}>
            <p>{modalidade.link}</p>
          </Link>
        </div>
      );
    }
  );

  const provasReturn = prova?.map((prova, index) => {
    // const dataInicioFormatada = dataFormatoBrasileiro(prova.data_prova);
    return (
      <div key={index} className="flex-col text-center justify-center">
        <div className="flex justify-around mb-5">
          <div>
            <p>{prova.nome}</p>
            <p>{prova.data_prova}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex max-w-screen justify-center items-center">
      {instituicao ? (
        <div className="flex-col max-w-2xl mt-10 justify-center">
          <div id="instituicao-nome" className="flex justify-center items-center mb-5">
            <Typography variant="h3" gutterBottom>
              {instituicao?.nome}
            </Typography>
          </div>
          <Divider />
          <div className="flex-col text-center justify-center items-center mb-5 mt-5">
            <Typography variant="h5" gutterBottom>
              Informações Gerais
            </Typography>
            <h1>{instituicao?.informacao_geral}</h1>
          </div>
          <Divider />
          {modalidadeDeIngressoReturn &&
          modalidadeDeIngressoReturn.length > 0 ? (
            <>
            <div className="flex-col text-center justify-center items-center mb-5 mt-5">
              <Typography variant="h5" gutterBottom>
                Modalidade de Ingresso
              </Typography>
              {modalidadeDeIngressoReturn}
            </div>
            <Divider />
            </>
          ) : (
            <></>
          )}
          {provasReturn ? (
            <>
              <div className="flex-col text-center mt-5">
                <Typography variant="h6" gutterBottom>
                  Provas
                </Typography>
                {provasReturn}
              </div>
              <Divider />
            </>
          ) : (
            <></>
          )}
          <div className="flex-col justify-center items-center text-center mb-5 mt-5">
            <Typography variant="h5" gutterBottom>
              Cursos
            </Typography>
            {/* {cursosEmOrdemAlfabetica?.map((curso, index) => (
              <h1 key={index}>{curso}, </h1>
            ))} */}
            {instituicao?.cursos}
          </div>
          <Divider />
          <div className="flex-col justify-center items-center text-center mb-5 mt-5">
            <Typography variant="h5" gutterBottom>
              Endereço e Contato
            </Typography>
            <h1>
              {instituicao?.cidade} - {instituicao?.uf}
            </h1>
            <Link href={instituicao?.website}>
              <h1>{instituicao?.website}</h1>
            </Link>
          </div>
        </div>
      ) : (
        <Typography variant="h5" gutterBottom>
          Carregando...
        </Typography>
      )}
    </div>
  );
}

export default Instituicao;
