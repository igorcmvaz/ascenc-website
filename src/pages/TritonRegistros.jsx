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
  LogOut,
  Heart,
  Eye,
  Send
} from "lucide-react";
import {
  TRITON_ENCRYPTED_TOPIC,
  unlockAdminPrivateKey,
  decryptRegistrationMessage,
  fetchTritonActivitySummary,
  sendRegistrationToServer,
} from "../utils/tritonCrypto";

export default function TritonRegistros() {
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState(null);
  const [authError, setAuthError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const [records, setRecords] = useState([]);
  const [activity, setActivity] = useState({
    likesCount: 0,
    viewsCount: 0,
    events: [],
  });
  const [loading, setLoading] = useState(false);
  const [testingSend, setTestingSend] = useState(false);
  const [error, setError] = useState("");

  const fetchAndDecryptRecords = async (unlockedKey) => {
    const keyToUse = unlockedKey || privateKey;
    if (!keyToUse) return;

    setLoading(true);
    setError("");
    try {
      const encryptedById = new Map();

      // 1. Carrega o histórico criptografado salvo localmente no dispositivo
      try {
        const localRaw = window.localStorage.getItem(
          "triton_encrypted_archive_v1"
        );
        if (localRaw) {
          const localArr = JSON.parse(localRaw);
          if (Array.isArray(localArr)) {
            for (const item of localArr) {
              if (item && item.id && item.message) {
                encryptedById.set(item.id, item);
              }
            }
          }
        }
      } catch {
        // ignore localStorage errors
      }

      // 2. Carrega o arquivo permanente criptografado do repositório (sincronizado a cada 4h via GitHub Actions)
      const archiveUrls = [
        `https://raw.githubusercontent.com/igorcmvaz/ascenc-website/main/public/data/triton_encrypted_records.json?t=${Date.now()}`,
        `./data/triton_encrypted_records.json?t=${Date.now()}`,
      ];
      for (const archiveUrl of archiveUrls) {
        try {
          const archRes = await fetch(archiveUrl, { cache: "no-store" });
          if (archRes.ok) {
            const archArr = await archRes.json();
            if (Array.isArray(archArr)) {
              for (const item of archArr) {
                if (item && item.id && item.message) {
                  encryptedById.set(item.id, item);
                }
              }
            }
          }
        } catch {
          // ignore archive fetch failure
        }
      }

      // 3. Carrega em tempo real os registros recentes do canal principal ntfy.sh
      try {
        const res = await fetch(
          `https://ntfy.sh/${TRITON_ENCRYPTED_TOPIC}/json?poll=1&since=all`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const text = await res.text();
          const lines = text
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);

          for (const line of lines) {
            try {
              const item = JSON.parse(line);
              if (item.event === "message" && item.id && item.message) {
                const msgObj = JSON.parse(item.message);
                if (
                  msgObj &&
                  ((msgObj.v === 1 && msgObj.k && msgObj.iv && msgObj.c) ||
                    (msgObj.v === 2 && msgObj.c))
                ) {
                  encryptedById.set(item.id, {
                    id: item.id,
                    time: item.time,
                    message: item.message,
                  });
                }
              }
            } catch {
              // ignora linhas inválidas
            }
          }
        }
      } catch {
        // ignore
      }

      // 4. Carrega curtidas, visualizações e espelhos de inscrição do canal de atividade
      const actSummary = await fetchTritonActivitySummary();
      setActivity(actSummary);

      for (const ev of actSummary.events) {
        if (ev.kind === "registration" && ev.envelope) {
          encryptedById.set(`mirror_${ev.id}`, {
            id: `mirror_${ev.id}`,
            time: ev.time,
            message: JSON.stringify(ev.envelope),
          });
        }
      }

      // Persiste a lista criptografada unificada no localStorage para nunca perder histórico
      const allEncrypted = Array.from(encryptedById.values()).sort(
        (a, b) => (a.time || 0) - (b.time || 0)
      );
      try {
        window.localStorage.setItem(
          "triton_encrypted_archive_v1",
          JSON.stringify(allEncrypted)
        );
      } catch {
        // ignore storage quota errors
      }

      const parsed = [];
      const seenKeys = new Set();
      for (const item of allEncrypted) {
        try {
          const payload = await decryptRegistrationMessage(
            keyToUse,
            item.message
          );
          const dedupKey = `${payload?.email || ""}|${payload?.name || ""}|${
            payload?.timestamp || item.time || item.id
          }`;
          if (seenKeys.has(dedupKey)) continue;
          seenKeys.add(dedupKey);

          parsed.push({
            id: item.id,
            time: item.time
              ? new Date(item.time * 1000).toLocaleString("pt-BR")
              : payload?.timestamp
              ? new Date(payload.timestamp).toLocaleString("pt-BR")
              : "-",
            name: payload?.name || "-",
            email: payload?.email || "-",
            institution: payload?.institution || "-",
            edition: payload?.edition || "-",
            purpose: payload?.purpose || "-",
          });
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

  const handleSendLiveTest = async () => {
    if (testingSend) return;
    setTestingSend(true);
    try {
      await sendRegistrationToServer({
        name: "Teste ao Vivo (Painel)",
        email: "igorcmvaz@gmail.com",
        institution: "UFSC (Verificação de Servidor)",
        edition: "Triton Brasil (BRL)",
        purpose: "Teste de Conexão em Tempo Real",
        timestamp: new Date().toISOString(),
      });
      await fetchAndDecryptRecords();
    } finally {
      setTestingSend(false);
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
                onClick={handleSendLiveTest}
                disabled={testingSend}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/70 text-amber-900 dark:text-amber-300 text-xs font-extrabold cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {testingSend ? "Enviando teste..." : "Testar Envio Agora"}
                </span>
              </button>

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

          {/* Cards de Resumo de Acesso e Engajamento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {records.length}
                </div>
                <div className="text-[11px] font-bold text-slate-600 dark:text-zinc-400">
                  Inscrições de Download
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {activity.likesCount}
                </div>
                <div className="text-[11px] font-bold text-slate-600 dark:text-zinc-400">
                  Curtidas no Botão "Curtir"
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  {activity.viewsCount}
                </div>
                <div className="text-[11px] font-bold text-slate-600 dark:text-zinc-400">
                  Aberturas da Página (#/triton)
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              1. Inscrições do Formulário de Download
            </h2>
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
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              2. Histórico de Curtidas e Aberturas da Página (#/triton)
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 max-h-80 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-zinc-300 font-black uppercase sticky top-0">
                  <tr>
                    <th className="p-3">Data / Hora</th>
                    <th className="p-3">Ação</th>
                    <th className="p-3">Dispositivo</th>
                    <th className="p-3">Idioma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-zinc-200">
                  {activity.events.filter((e) => e.kind === "like" || e.kind === "view").length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-500">
                        Nenhuma curtida ou abertura registrada ainda.
                      </td>
                    </tr>
                  ) : (
                    activity.events
                      .filter((e) => e.kind === "like" || e.kind === "view")
                      .map((ev) => (
                        <tr key={ev.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="p-3 whitespace-nowrap font-mono text-[11px]">
                            {ev.time ? new Date(ev.time * 1000).toLocaleString("pt-BR") : "-"}
                          </td>
                          <td className="p-3 font-bold">
                            {ev.kind === "like" ? (
                              <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                                ❤️ Curtiu o Triton
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                👀 Abriu a página #/triton
                              </span>
                            )}
                          </td>
                          <td className="p-3">{ev.device || "-"}</td>
                          <td className="p-3">{ev.lang || "-"}</td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
