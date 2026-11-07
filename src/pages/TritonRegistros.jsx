import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import {
  Download,
  RefreshCw,
  ArrowLeft,
  Users,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut
} from "lucide-react";
import {
  TRITON_ENCRYPTED_TOPIC,
  unlockAdminPrivateKey,
  decryptRegistrationMessage,
} from "../utils/tritonCrypto";

export default function TritonRegistros() {
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState(null);
  const [authError, setAuthError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAndDecryptRecords = async (unlockedKey) => {
    const keyToUse = unlockedKey || privateKey;
    if (!keyToUse) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://ntfy.sh/${TRITON_ENCRYPTED_TOPIC}/json?poll=1&since=all`
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
            const payload = await decryptRegistrationMessage(
              keyToUse,
              item.message
            );
            parsed.push({
              id: item.id,
              time: item.time
                ? new Date(item.time * 1000).toLocaleString("pt-BR")
                : "-",
              name: payload?.name || "-",
              email: payload?.email || "-",
              institution: payload?.institution || "-",
              edition: payload?.edition || "-",
              purpose: payload?.purpose || "-",
            });
          }
        } catch {
          // ignora mensagens que não pertençam à chave
        }
      }

      setRecords(parsed.reverse());
    } catch {
      setError("Não foi possível carregar os registros criptografados no momento.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setAuthError("");
    setUnlocking(true);
    try {
      const key = await unlockAdminPrivateKey(password);
      setPrivateKey(key);
      setPassword("");
      await fetchAndDecryptRecords(key);
    } catch {
      setAuthError("Senha incorreta. Acesso negado.");
    } finally {
      setUnlocking(false);
    }
  };

  const handleLock = () => {
    setPrivateKey(null);
    setRecords([]);
    setPassword("");
  };

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

  if (!privateKey) {
    return (
      <PageLayout>
        <div className="max-w-md mx-auto py-12 px-4">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Ambiente Blindado • RSA-2048 + AES-GCM
              </span>
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Painel Restrito do Triton
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Os dados de quem baixa o Triton são criptografados ponta-a-ponta. Insira a senha administrativa para desbloquear a chave privada e visualizar os registros.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label
                  htmlFor="triton-admin-pwd"
                  className="block text-xs font-extrabold mb-1.5 text-slate-800 dark:text-zinc-200"
                >
                  Senha Administrativa
                </label>
                <div className="relative">
                  <input
                    id="triton-admin-pwd"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full p-3 pl-10 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold text-center">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={unlocking}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {unlocking ? "Descriptografando chave..." : "Desbloquear Registros"}
                </span>
              </button>
            </form>

            <div className="text-center pt-1">
              <Link
                to="/triton"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar à página do Triton</span>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

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
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  Chave privada desbloqueada • Registros descriptografados localmente
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fetchAndDecryptRecords()}
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

              <button
                type="button"
                onClick={handleLock}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Bloquear</span>
              </button>
            </div>
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
                      Descriptografando registros...
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Nenhum registro encontrado ainda.
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
