"use client";

import { useMemo, useState } from "react";
import { generateStructuredScript } from "../lib/generator";

type ScriptResult = ReturnType<typeof generateStructuredScript>;

const DEFAULT_IDEA =
  "Uma boa estrutura narrativa mantém a atenção do público e facilita a compreensão";

const SAMPLE_TOPICS = [
  "Lançamento de curso online",
  "Apresentação de pitch para investidores",
  "Storytelling para documentário educacional",
  "Narrativa de marca para campanha de impacto social"
];

export default function Home() {
  const [theme, setTheme] = useState<string>(DEFAULT_IDEA);
  const [result, setResult] = useState<ScriptResult>(() =>
    generateStructuredScript(DEFAULT_IDEA)
  );

  const renderedResult = useMemo(() => result, [result]);

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <header className="w-full max-w-6xl space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Crie Roteiros Automáticos
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-slate-50 md:text-5xl">
          Estruture histórias, vídeos e apresentações com começo, meio e fim
        </h1>
        <p className="text-base text-slate-300 md:text-lg">
          Insira um tema ou ideia central e gere instantaneamente um roteiro em 10
          partes com blocos, ganchos narrativos, transições e chamadas para ação.
          Cada parte entrega cerca de 7.000 caracteres de descrição detalhada para
          facilitar a visualização e produção de cenas.
        </p>
      </header>

      <section className="mt-10 w-full max-w-5xl rounded-3xl bg-slate-900/60 p-8 shadow-xl shadow-slate-950/30">
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setResult(generateStructuredScript(theme));
          }}
        >
          <div className="space-y-2">
            <label htmlFor="tema" className="text-sm font-medium text-slate-200">
              Tema ou ideia central
            </label>
            <textarea
              id="tema"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-base text-slate-100 shadow-inner shadow-slate-950/20 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/60"
              placeholder="Descreva a ideia principal que deseja transformar em roteiro..."
            />
            <p className="text-xs text-slate-400">
              Sugestões: {SAMPLE_TOPICS.join(" · ")}
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/40"
          >
            Gerar roteiro completo
          </button>
        </form>
      </section>

      <section className="mt-12 w-full max-w-6xl space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-100">
            Estrutura narrativa em 10 partes
          </h2>
          <p className="text-sm text-slate-400">
            Cada parte combina descrição imersiva (~7.000 caracteres), tópicos
            estratégicos, ganchos, transições e chamada para ação.
          </p>
        </div>

        <div className="space-y-6">
          {renderedResult.sections.map((section) => (
            <article
              key={section.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg shadow-slate-950/20"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-sky-400/80">
                    Parte {section.id} · {section.arc === "introducao" && "Introdução"}
                    {section.arc === "desenvolvimento" && "Desenvolvimento"}
                    {section.arc === "conclusao" && "Encerramento"}
                  </span>
                  <h3 className="text-2xl font-semibold text-slate-50">
                    {section.title}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-500">
                  {section.estimatedCharacters.toLocaleString("pt-BR")} caracteres
                </p>
              </div>

              <p className="mt-4 text-sm text-slate-300">
                Foco da parte: {section.focus}
              </p>

              <details className="group mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <summary className="cursor-pointer text-sm font-semibold text-slate-200 transition group-open:text-primary">
                  Texto completo da parte
                </summary>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-200">
                  {section.summary.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </details>

              <div className="mt-6 grid gap-4 text-sm text-slate-200 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-sky-300">Tópicos estratégicos</h4>
                  <ul className="space-y-1 text-slate-300">
                    {section.bulletPoints.map((point, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1 h-1 w-1 rounded-full bg-sky-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-sky-300">Gancho narrativo</h4>
                    <p className="text-slate-300">{section.hook}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-sky-300">Transição</h4>
                    <p className="text-slate-300">{section.transition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-sky-300">Chamada</h4>
                    <p className="text-slate-300">{section.callToAction}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 w-full max-w-6xl space-y-6">
        <header>
          <h2 className="text-2xl font-semibold text-slate-100">Detalhes de personagens</h2>
          <p className="text-sm text-slate-400">
            Use estes perfis para criar imagens consistentes ou orientar a
            produção visual do roteiro.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {renderedResult.characters.map((character) => (
            <article
              key={character.role}
              className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-sky-400/80">
                  {character.role}
                </p>
                <h3 className="text-xl font-semibold text-slate-50">
                  {character.name}
                </h3>
              </div>
              <p className="text-sm text-slate-300">{character.biography}</p>
              <div>
                <h4 className="text-sm font-semibold text-sky-300">Motivações</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  {character.motivations.map((motivation) => (
                    <li key={motivation} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-sky-300" />
                      <span>{motivation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  <strong className="font-semibold text-sky-300">Identidade visual:</strong>{" "}
                  {character.visualIdentity}
                </p>
                <p>
                  <strong className="font-semibold text-sky-300">Paleta de figurino:</strong>{" "}
                  {character.wardrobePalette}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-sky-300">Elementos assinatura</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  {character.signatureElements.map((element) => (
                    <li key={element} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-sky-300" />
                      <span>{element}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 mb-16 w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-2xl font-semibold text-slate-100">Prompt pronto para uso</h2>
        <p className="mt-2 text-sm text-slate-400">
          Utilize este prompt para solicitar roteiros em outras ferramentas de IA.
        </p>
        <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-slate-950/60 p-6 text-sm text-slate-200">
          {renderedResult.promptTemplate}
        </pre>
      </section>
    </main>
  );
}
