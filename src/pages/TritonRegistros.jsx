import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import {
  Download,
  RefreshCw,
  ArrowLeft,
  Users,
  ExternalLink,
  Bell
} from "lucide-react";

export const TRITON_NTFY_TOPIC = "triton_ufsc_downloads_igor_9f8a2b";

export default function TritonRegistros() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://ntfy.sh/${TRITON_NTFY_TOPIC}/json?poll=1&since=all`
      );
      const text = await res.text();
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const parsed = [];
      for (const line of lines) {
        try {
          const item = JSON.parse(line);
          if (item.event === "message" && item.message) {
            let payload = null;
            try {
              payload = JSON.parse(item.message);
            } catch {
              payload = {
                name: "-",
                email: "-",
                institution: "-",
                edition: "-",
                purpose: item.message,
              };
            }
            parsed.push({
              id: item.id,
              time: item.time
                ? new Date(item.time * 1000).toLocaleString("pt-BR")
                : "-",
              name: payload.name || "-",
              email: payload.email || "-",
              institution: payload.institution || "-",
              edition: payload.edition || "-",
              purpose: payload.purpose || "-",
            });
          }
        } catch {
          // ignore malformed line
        }
      }

      setRecords(parsed.reverse());
    } catch {
      setError("Não foi possível carregar os registros no momento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const exportCsv = () => {
    const header = [
      "Data_Hora",
      "Nome",
      "Email",
      "Instituicao_Empresa",
      "Edicao",
      "Finalidade",
    ];
    const rows = records.map((r) =>
      [r.time, r.name, r.email, r.institution, r.edition, r.purpose]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const csvContent = "\uFEFF" + [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `triton_downloads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Registros de Download do Triton
                </h1>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Painel de acompanhamento em tempo real (Plano B independente do FormSubmit)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={fetchRecords}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 text-xs font-bold cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Atualizar</span>
              </button>

              <button
                type="button"
                onClick={exportCsv}
                disabled={records.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>

              <Link
                to="/triton"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-zinc-200 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </Link>
            </div>
          </div>

          {/* Dica de inscrição no celular/navegador */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700 dark:text-zinc-300">
            <div className="flex items-start sm:items-center gap-2.5">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                Você também pode ver o feed ao vivo ou ativar notificações no celular/navegador pelo canal:{" "}
                <strong className="font-mono">{TRITON_NTFY_TOPIC}</strong>
              </span>
            </div>
            <a
              href={`https://ntfy.sh/${TRITON_NTFY_TOPIC}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-black text-blue-700 dark:text-blue-400 underline shrink-0"
            >
              <span>Abrir no ntfy.sh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold">
              {error}
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-zinc-300 font-black uppercase">
                <tr>
                  <th className="p-3">Data / Hora</th>
                  <th className="p-3">Nome</th>
                  <th className="p-3">E-mail</th>
                  <th className="p-3">Instituição / Empresa</th>
                  <th className="p-3">Edição</th>
                  <th className="p-3">Finalidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-zinc-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Carregando registros...
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Nenhum registro recente encontrado.
                    </td>
                  </tr>
                ) : (
                  records.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 whitespace-nowrap font-mono text-[11px]">{r.time}</td>
                      <td className="p-3 font-bold">{r.name}</td>
                      <td className="p-3">
                        {r.email !== "-" ? (
                          <a href={`mailto:${r.email}`} className="text-emerald-700 dark:text-emerald-400 underline">
                            {r.email}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-3">{r.institution}</td>
                      <td className="p-3">{r.edition}</td>
                      <td className="p-3">{r.purpose}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
